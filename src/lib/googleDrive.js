// Google Drive API integration for client-side operations

export class GoogleDriveService {
  constructor() {
    this.isInitialized = false;
    this.accessToken = null;
  }

  // Initialize Google API
  async initialize() {
    if (this.isInitialized) return;

    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined') {
        reject(new Error('Google Drive API can only be used in browser'));
        return;
      }

      // Load Google API script
      if (!window.gapi) {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = () => this.loadGoogleAPI().then(resolve).catch(reject);
        script.onerror = () => reject(new Error('Failed to load Google API'));
        document.head.appendChild(script);
      } else {
        this.loadGoogleAPI().then(resolve).catch(reject);
      }
    });
  }

  async loadGoogleAPI() {
    return new Promise((resolve, reject) => {
      window.gapi.load('client:auth2', async () => {
        try {
          await window.gapi.client.init({
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
            scope: 'https://www.googleapis.com/auth/drive.file'
          });
          
          this.isInitialized = true;
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  // Sign in to Google
  async signIn() {
    if (!this.isInitialized) {
      await this.initialize();
    }

    const authInstance = window.gapi.auth2.getAuthInstance();
    const user = await authInstance.signIn();
    this.accessToken = user.getAuthResponse().access_token;
    
    return user;
  }

  // Sign out from Google
  async signOut() {
    // Remove stored access token
    localStorage.removeItem('googleDriveAccessToken');
    this.accessToken = null;
    
    // Also try to sign out from Google API if initialized
    if (this.isInitialized && window.gapi && window.gapi.auth2) {
      try {
        const authInstance = window.gapi.auth2.getAuthInstance();
        await authInstance.signOut();
      } catch (error) {
        console.warn('Could not sign out from Google API:', error);
      }
    }
  }

  // Check if user is signed in
  isSignedIn() {
    const storedToken = localStorage.getItem('googleDriveAccessToken');
    if (!storedToken) return false;
    
    try {
      const tokenData = JSON.parse(storedToken);
      const currentTime = Date.now();
      const tokenAge = (currentTime - tokenData.timestamp) / 1000; // seconds
      
      // Check if token is still valid
      if (tokenAge < tokenData.expiresIn) {
        this.accessToken = tokenData.accessToken;
        return true;
      } else {
        // Token expired, remove it
        localStorage.removeItem('googleDriveAccessToken');
        this.accessToken = null;
        return false;
      }
    } catch (error) {
      // Invalid token format, remove it
      localStorage.removeItem('googleDriveAccessToken');
      this.accessToken = null;
      return false;
    }
  }

  // Upload file to Google Drive
  async uploadFile(file, fileName, folderId = null) {
    if (!this.isSignedIn()) {
      throw new Error('Please sign in to Google Drive first');
    }

    const metadata = {
      name: fileName,
      parents: folderId ? [folderId] : undefined,
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      },
      body: form
    });

    if (!response.ok) {
      throw new Error('Failed to upload file to Google Drive');
    }

    return await response.json();
  }

  // Download file from Google Drive
  async downloadFile(fileId) {
    if (!this.isSignedIn()) {
      throw new Error('Please sign in to Google Drive first');
    }

    const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      }
    });

    if (!response.ok) {
      throw new Error('Failed to download file from Google Drive');
    }

    return await response.blob();
  }

  // List files in Google Drive
  async listFiles(query = '', pageSize = 10) {
    if (!this.isSignedIn()) {
      throw new Error('Please sign in to Google Drive first');
    }

    let searchQuery = "name contains '.cipherit'"; // Only show encrypted files
    if (query) {
      searchQuery += ` and name contains '${query}'`;
    }

    const response = await window.gapi.client.drive.files.list({
      q: searchQuery,
      pageSize,
      fields: 'files(id,name,size,modifiedTime,createdTime)'
    });

    return response.result.files || [];
  }

  // Delete file from Google Drive
  async deleteFile(fileId) {
    if (!this.isSignedIn()) {
      throw new Error('Please sign in to Google Drive first');
    }

    const response = await window.gapi.client.drive.files.delete({
      fileId
    });

    return response;
  }

  // Create a folder for encrypted files
  async createCipherFolder() {
    if (!this.isSignedIn()) {
      throw new Error('Please sign in to Google Drive first');
    }

    const metadata = {
      name: 'CipherIt Encrypted Files',
      mimeType: 'application/vnd.google-apps.folder',
    };

    const response = await window.gapi.client.drive.files.create({
      resource: metadata,
      fields: 'id,name'
    });

    return response.result;
  }

  // Get file metadata
  async getFileMetadata(fileId) {
    if (!this.isSignedIn()) {
      throw new Error('Please sign in to Google Drive first');
    }

    const response = await window.gapi.client.drive.files.get({
      fileId,
      fields: 'id,name,size,modifiedTime,createdTime,description'
    });

    return response.result;
  }

  // Get Google Drive storage quota
  async getStorageQuota() {
    if (!this.isSignedIn()) {
      throw new Error('Please sign in to Google Drive first');
    }

    try {
      const response = await window.gapi.client.drive.about.get({
        fields: 'storageQuota'
      });

      const quota = response.result.storageQuota;
      return {
        used: Math.round((parseInt(quota.usage) || 0) / (1024 * 1024)), // Convert to MB
        total: Math.round((parseInt(quota.limit) || 15000000000) / (1024 * 1024)), // Convert to MB, default 15GB
        trashUsed: Math.round((parseInt(quota.usageInDriveTrash) || 0) / (1024 * 1024)) // Convert to MB
      };
    } catch (error) {
      console.error('Error getting storage quota:', error);
      // Return default values if quota is not available
      return {
        used: 0,
        total: 15000, // 15GB default
        trashUsed: 0
      };
    }
  }
}

// Export singleton instance
export const googleDriveService = new GoogleDriveService();
