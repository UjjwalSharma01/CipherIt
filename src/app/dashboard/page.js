'use client';

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Download, 
  Shield, 
  FileText, 
  Image, 
  Video, 
  Music, 
  Archive,
  Search,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Eye,
  Lock,
  Unlock,
  Cloud,
  CloudOff,
  HardDrive,
  User,
  Bell,
  Filter,
  Grid,
  List,
  ChevronDown,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import FileUpload from '../../components/FileUpload';
import FileList from '../../components/FileList';
import EncryptionSettings from '../../components/EncryptionSettings';
import UserProfile from '../../components/UserProfile';
import AIChat from '../../components/AIChat';
import { googleDriveService } from '../../lib/googleDrive';

export default function Dashboard() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('files');
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [filterType, setFilterType] = useState('all');
  const [showUpload, setShowUpload] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [driveConnected, setDriveConnected] = useState(false);
  const [isConnectingDrive, setIsConnectingDrive] = useState(false);
  const [storageStats, setStorageStats] = useState({
    used: 0,
    total: 15000, // 15GB in MB
    files: 0
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  // Load files from localStorage
  useEffect(() => {
    if (user) {
      const savedFiles = localStorage.getItem(`cipherit_files_${user.uid}`);
      if (savedFiles) {
        const parsedFiles = JSON.parse(savedFiles);
        setFiles(parsedFiles);
        updateStorageStats(parsedFiles);
      }
    }
  }, [user]);

  // Check Google Drive connection status and fetch storage stats
  useEffect(() => {
    const checkDriveConnection = async () => {
      try {
        const hasAccess = localStorage.getItem('googleDriveAccessToken');
        const isConnected = !!hasAccess;
        setDriveConnected(isConnected);
        
        if (isConnected) {
          // Fetch Google Drive storage stats
          await fetchGoogleDriveStorageStats();
        }
      } catch (error) {
        console.error('Error checking drive connection:', error);
      }
    };
    
    checkDriveConnection();
  }, []);

  const fetchGoogleDriveStorageStats = async () => {
    try {
      if (googleDriveService.isSignedIn()) {
        const storageQuota = await googleDriveService.getStorageQuota();
        setStorageStats({
          used: storageQuota.used,
          total: storageQuota.total,
          files: files.length // Keep local file count
        });
      }
    } catch (error) {
      console.error('Error fetching Google Drive storage stats:', error);
      // Fall back to local storage stats
      updateLocalStorageStats(files);
    }
  };

  const updateLocalStorageStats = (fileList) => {
    const totalSize = fileList.reduce((sum, file) => sum + (file.size || 0), 0);
    setStorageStats({
      used: Math.round(totalSize / (1024 * 1024)), // Convert to MB
      total: 15000,
      files: fileList.length
    });
  };

  const updateStorageStats = (fileList) => {
    if (driveConnected) {
      // If Google Drive is connected, fetch real storage stats
      fetchGoogleDriveStorageStats();
    } else {
      // Otherwise use local stats
      updateLocalStorageStats(fileList);
    }
  };

  const handleConnectDrive = async () => {
    setIsConnectingDrive(true);
    try {
      // Use proper OAuth callback endpoint
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '283150504346-nkb3frufcgtk5vaafs4fe6hr1ejl74eu.apps.googleusercontent.com';
      // Dynamically construct redirect URI based on current location
      const redirectUri = `${window.location.origin}/auth/callback`;
      const scope = 'https://www.googleapis.com/auth/drive.file';
      
      // Debug logging
      console.log('OAuth Config:', {
        clientId,
        redirectUri,
        origin: window.location.origin
      });
      
      // Store current page to return to after OAuth
      localStorage.setItem('oauthReturnUrl', '/dashboard');
      
      const authUrl = `https://accounts.google.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=token`;
      console.log('OAuth URL:', authUrl);
      
      // Open OAuth in new tab for debugging
      window.open(authUrl, '_blank');
    } catch (error) {
      console.error('Error connecting to Google Drive:', error);
      setIsConnectingDrive(false);
    }
  };

  const handleDisconnectDrive = async () => {
    try {
      // Use the Google Drive service to properly sign out
      await googleDriveService.signOut();
      setDriveConnected(false);
      // Update storage stats to show local stats
      updateLocalStorageStats(files);
    } catch (error) {
      console.error('Error disconnecting from Google Drive:', error);
      // Fallback: just remove the token
      localStorage.removeItem('googleDriveAccessToken');
      setDriveConnected(false);
      updateLocalStorageStats(files);
    }
  };

  // Check for stored Google Drive access token and OAuth errors
  useEffect(() => {
    // Check for stored access token
    const storedToken = localStorage.getItem('googleDriveAccessToken');
    if (storedToken) {
      try {
        const tokenData = JSON.parse(storedToken);
        const currentTime = Date.now();
        const tokenAge = (currentTime - tokenData.timestamp) / 1000; // seconds
        
        // Check if token is still valid (expires_in is in seconds)
        if (tokenAge < tokenData.expiresIn) {
          setDriveConnected(true);
          // Fetch storage stats when token is detected
          fetchGoogleDriveStorageStats();
        } else {
          // Token expired, remove it
          localStorage.removeItem('googleDriveAccessToken');
          setDriveConnected(false);
        }
      } catch (error) {
        // Invalid token format, remove it
        localStorage.removeItem('googleDriveAccessToken');
        setDriveConnected(false);
      }
    }
    
    // Check for OAuth errors in URL
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    if (error === 'oauth_failed') {
      console.error('OAuth failed: No access token received');
      // You could show a toast notification here
    } else if (error === 'oauth_denied') {
      console.error('OAuth denied: User denied access');
      // You could show a toast notification here
    }
    
    // Clean up URL if there are error params
    if (error) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    setIsConnectingDrive(false);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getFileIcon = (type) => {
    if (type?.startsWith('image/')) return <Image className="w-5 h-5" />;
    if (type?.startsWith('video/')) return <Video className="w-5 h-5" />;
    if (type?.startsWith('audio/')) return <Music className="w-5 h-5" />;
    if (type?.includes('zip') || type?.includes('rar')) return <Archive className="w-5 h-5" />;
    return <FileText className="w-5 h-5" />;
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || 
      (filterType === 'encrypted' && file.encrypted) ||
      (filterType === 'unencrypted' && !file.encrypted) ||
      (filterType === 'images' && file.type?.startsWith('image/')) ||
      (filterType === 'documents' && (file.type?.includes('pdf') || file.type?.includes('doc') || file.type?.includes('text'))) ||
      (filterType === 'videos' && file.type?.startsWith('video/')) ||
      (filterType === 'audio' && file.type?.startsWith('audio/'));
    
    return matchesSearch && matchesFilter;
  });

  const storagePercentage = (storageStats.used / storageStats.total) * 100;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center">
                <Shield className="w-8 h-8 text-blue-400 mr-3" />
                <h1 className="text-xl font-bold text-white">CipherIt</h1>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setActiveTab('files')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'files' 
                    ? 'text-blue-400 border-b-2 border-blue-400' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Files
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'settings' 
                    ? 'text-blue-400 border-b-2 border-blue-400' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Settings
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'profile' 
                    ? 'text-blue-400 border-b-2 border-blue-400' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Profile
              </button>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowChat(!showChat)}
                className="p-2 text-white/70 hover:text-white transition-colors relative"
              >
                <MessageCircle className="w-6 h-6" />
                {showChat && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
                )}
              </button>
              
              <button className="p-2 text-white/70 hover:text-white transition-colors">
                <Bell className="w-6 h-6" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="text-white text-sm hidden sm:block">
                  {user?.displayName || user?.email?.split('@')[0] || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 text-white/70 hover:text-white transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Storage Stats & Drive Connection */}
        <div className="mb-8 space-y-6">
          {/* Google Drive Connection Status */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${driveConnected ? 'bg-green-500/20' : 'bg-gray-500/20'}`}>
                  {driveConnected ? (
                    <Cloud className="w-6 h-6 text-green-400" />
                  ) : (
                    <CloudOff className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Google Drive {driveConnected ? 'Connected' : 'Not Connected'}
                  </h3>
                  <p className="text-white/70 text-sm">
                    {driveConnected 
                      ? 'Your files can be backed up to Google Drive'
                      : 'Connect Google Drive to backup your encrypted files'}
                  </p>
                </div>
              </div>
              <div>
                {driveConnected ? (
                  <button
                    onClick={handleDisconnectDrive}
                    className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                  >
                    Disconnect
                  </button>
                ) : (
                  <motion.button
                    onClick={handleConnectDrive}
                    disabled={isConnectingDrive}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isConnectingDrive ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Connecting...
                      </>
                    ) : (
                      <>
                        <Cloud className="w-4 h-4" />
                        Connect Drive
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Storage Stats */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            {driveConnected ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {storageStats.files}
                  </div>
                  <div className="text-white/70 text-sm">Files Stored</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">
                    {storageStats.used} MB
                  </div>
                  <div className="text-white/70 text-sm">Storage Used</div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/70 text-sm">Storage</span>
                    <span className="text-white text-sm">
                      {storageStats.used}MB / {storageStats.total}MB
                    </span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                      style={{ width: `${Math.min(storagePercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cloud className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Connect to Google Drive</h3>
                <p className="text-white/70 mb-6">
                  Connect your Google Drive to see actual storage usage and backup your encrypted files
                </p>
                <motion.button
                  onClick={handleConnectDrive}
                  disabled={isConnectingDrive}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                >
                  {isConnectingDrive ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Cloud className="w-5 h-5" />
                      Connect Google Drive
                    </>
                  )}
                </motion.button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        {activeTab === 'files' && (
          <div className="space-y-6">
            {/* Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search files..."
                    className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Files</option>
                  <option value="encrypted">Encrypted</option>
                  <option value="unencrypted">Unencrypted</option>
                  <option value="images">Images</option>
                  <option value="documents">Documents</option>
                  <option value="videos">Videos</option>
                  <option value="audio">Audio</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-white/10 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-white/70'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-white/70'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
                
                <motion.button
                  onClick={() => setShowUpload(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Upload Files
                </motion.button>
              </div>
            </div>

            {/* File List */}
            <FileList 
              files={filteredFiles}
              viewMode={viewMode}
              onFilesChange={(newFiles) => {
                setFiles(newFiles);
                updateStorageStats(newFiles);
                localStorage.setItem(`cipherit_files_${user.uid}`, JSON.stringify(newFiles));
              }}
            />
          </div>
        )}

        {activeTab === 'settings' && (
          <EncryptionSettings />
        )}

        {activeTab === 'profile' && (
          <UserProfile 
            user={user} 
            driveConnected={driveConnected}
            storageStats={storageStats}
            onConnectDrive={handleConnectDrive}
            onDisconnectDrive={handleDisconnectDrive}
            isConnectingDrive={isConnectingDrive}
          />
        )}
      </div>

      {/* File Upload Modal */}
      {showUpload && (
        <FileUpload
          onClose={() => setShowUpload(false)}
          onFilesUploaded={(newFiles) => {
            const updatedFiles = [...files, ...newFiles];
            setFiles(updatedFiles);
            updateStorageStats(updatedFiles);
            localStorage.setItem(`cipherit_files_${user.uid}`, JSON.stringify(updatedFiles));
            setShowUpload(false);
          }}
          userId={user?.uid}
        />
      )}

      {/* AI Chat */}
      {showChat && (
        <AIChat onClose={() => setShowChat(false)} />
      )}
    </div>
  );
}
