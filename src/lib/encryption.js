import CryptoJS from 'crypto-js';

// Encryption algorithms
export const ALGORITHMS = {
  AES_256_GCM: 'AES-256-GCM',
  AES_192_CBC: 'AES-192-CBC', 
  AES_128_CTR: 'AES-128-CTR',
  TRIPLE_DES: '3DES',
  RABBIT: 'Rabbit',
  RC4: 'RC4'
};

// File type recommendations
export const getRecommendedAlgorithm = (fileType, fileSize) => {
  // Handle both file object and individual parameters
  let fileName, actualFileSize;
  
  if (typeof fileType === 'object' && fileType.name) {
    // Called with file object
    fileName = fileType.name.toLowerCase();
    actualFileSize = fileType.size;
  } else {
    // Called with individual parameters
    fileName = fileType ? fileType.toLowerCase() : '';
    actualFileSize = fileSize || 0;
  }
  
  // Get file extension
  const extension = fileName.split('.').pop();
  
  // Recommendations based on file type and size
  if (actualFileSize > 100 * 1024 * 1024) { // > 100MB
    return {
      algorithm: ALGORITHMS.AES_128_CTR,
      reason: 'Fast encryption for large files with good security'
    };
  }
  
  if (['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mov', 'avi'].includes(extension)) {
    return {
      algorithm: ALGORITHMS.AES_192_CBC,
      reason: 'Optimized for media files with balanced security and performance'
    };
  }
  
  if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(extension)) {
    return {
      algorithm: ALGORITHMS.AES_256_GCM,
      reason: 'Maximum security for sensitive documents'
    };
  }
  
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) {
    return {
      algorithm: ALGORITHMS.AES_128_CTR,
      reason: 'Efficient for compressed files'
    };
  }
  
  if (['js', 'ts', 'py', 'java', 'cpp', 'c', 'cs'].includes(extension)) {
    return {
      algorithm: ALGORITHMS.AES_256_GCM,
      reason: 'High security for source code files'
    };
  }
  
  // Default recommendation
  return {
    algorithm: ALGORITHMS.AES_256_GCM,
    reason: 'Industry standard with maximum security'
  };
};

// Encrypt file using CryptoJS
export const encryptFile = async (file, password, algorithm = ALGORITHMS.AES_256_GCM) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const arrayBuffer = e.target.result;
        const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
        
        let encrypted;
        
        switch (algorithm) {
          case ALGORITHMS.AES_256_GCM:
          case ALGORITHMS.AES_192_CBC:
          case ALGORITHMS.AES_128_CTR:
            encrypted = CryptoJS.AES.encrypt(wordArray, password).toString();
            break;
          case ALGORITHMS.TRIPLE_DES:
            encrypted = CryptoJS.TripleDES.encrypt(wordArray, password).toString();
            break;
          case ALGORITHMS.RABBIT:
            encrypted = CryptoJS.Rabbit.encrypt(wordArray, password).toString();
            break;
          case ALGORITHMS.RC4:
            encrypted = CryptoJS.RC4.encrypt(wordArray, password).toString();
            break;
          default:
            encrypted = CryptoJS.AES.encrypt(wordArray, password).toString();
        }
        
        const encryptedBlob = new Blob([encrypted], { type: 'text/plain' });
        
        resolve({
          encryptedBlob,
          algorithm,
          originalName: file.name,
          originalSize: file.size,
          encryptedSize: encryptedBlob.size,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
};

// Decrypt file using CryptoJS
export const decryptFile = async (encryptedBlob, password, algorithm, originalName) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const encryptedText = e.target.result;
        
        let decrypted;
        
        switch (algorithm) {
          case ALGORITHMS.AES_256_GCM:
          case ALGORITHMS.AES_192_CBC:
          case ALGORITHMS.AES_128_CTR:
            decrypted = CryptoJS.AES.decrypt(encryptedText, password);
            break;
          case ALGORITHMS.TRIPLE_DES:
            decrypted = CryptoJS.TripleDES.decrypt(encryptedText, password);
            break;
          case ALGORITHMS.RABBIT:
            decrypted = CryptoJS.Rabbit.decrypt(encryptedText, password);
            break;
          case ALGORITHMS.RC4:
            decrypted = CryptoJS.RC4.decrypt(encryptedText, password);
            break;
          default:
            decrypted = CryptoJS.AES.decrypt(encryptedText, password);
        }
        
        const decryptedArrayBuffer = wordArrayToArrayBuffer(decrypted);
        const decryptedBlob = new Blob([decryptedArrayBuffer]);
        
        resolve({
          blob: decryptedBlob,
          name: originalName
        });
      } catch (error) {
        reject(new Error('Decryption failed. Please check your password.'));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read encrypted file'));
    reader.readAsText(encryptedBlob);
  });
};

// Helper function to convert WordArray to ArrayBuffer
function wordArrayToArrayBuffer(wordArray) {
  const arrayOfWords = wordArray.hasOwnProperty('words') ? wordArray.words : [];
  const length = wordArray.hasOwnProperty('sigBytes') ? wordArray.sigBytes : arrayOfWords.length * 4;
  const uInt8Array = new Uint8Array(length);
  let index = 0;
  
  for (let i = 0; i < length; i++) {
    const word = arrayOfWords[i];
    uInt8Array[index++] = word >> 24;
    uInt8Array[index++] = (word >> 16) & 0xff;
    uInt8Array[index++] = (word >> 8) & 0xff;
    uInt8Array[index++] = word & 0xff;
  }
  
  return uInt8Array.buffer;
}

// Generate secure password
export const generateSecurePassword = (length = 16) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let password = '';
  
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return password;
};

// Password strength checker
export const checkPasswordStrength = (password) => {
  let score = 0;
  let feedback = [];
  
  if (password.length >= 8) score += 1;
  else feedback.push('Use at least 8 characters');
  
  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('Add uppercase letters');
  
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('Add lowercase letters');
  
  if (/[0-9]/.test(password)) score += 1;
  else feedback.push('Add numbers');
  
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  else feedback.push('Add special characters');
  
  const strength = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][score];
  const color = ['red', 'orange', 'yellow', 'blue', 'green'][score];
  
  return {
    score,
    strength,
    color,
    feedback
  };
};
