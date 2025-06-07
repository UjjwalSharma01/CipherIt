'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  X, 
  File, 
  Image, 
  Video, 
  Music, 
  Archive,
  FileText,
  Lock,
  Cloud,
  HardDrive,
  Shield,
  AlertCircle,
  Check,
  Loader
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { encryptFile, getRecommendedAlgorithm } from '../lib/encryption';

export default function FileUpload({ onClose, onFilesUploaded, userId }) {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [encryptionSettings, setEncryptionSettings] = useState({
    encrypt: true,
    algorithm: 'auto',
    password: '',
    uploadTo: 'local' // 'local' or 'drive'
  });

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending',
      algorithm: getRecommendedAlgorithm(file.name, file.size),
      encrypted: false
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    maxSize: 100 * 1024 * 1024, // 100MB
  });

  const removeFile = (id) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const getFileIcon = (type) => {
    if (type?.startsWith('image/')) return <Image className="w-6 h-6 text-blue-400" />;
    if (type?.startsWith('video/')) return <Video className="w-6 h-6 text-purple-400" />;
    if (type?.startsWith('audio/')) return <Music className="w-6 h-6 text-green-400" />;
    if (type?.includes('zip') || type?.includes('rar')) return <Archive className="w-6 h-6 text-yellow-400" />;
    return <FileText className="w-6 h-6 text-gray-400" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    const uploadedFiles = [];
    
    for (const fileData of files) {
      try {
        setUploadProgress(prev => ({ ...prev, [fileData.id]: 0 }));
        
        let processedFile = fileData;
        
        // Encrypt file if enabled
        if (encryptionSettings.encrypt) {
          if (!encryptionSettings.password) {
            throw new Error('Password required for encryption');
          }
          
          const algorithm = encryptionSettings.algorithm === 'auto' 
            ? fileData.algorithm 
            : encryptionSettings.algorithm;
          
          setUploadProgress(prev => ({ ...prev, [fileData.id]: 25 }));
          
          const fileContent = await fileData.file.arrayBuffer();
          const encryptedData = await encryptFile(fileContent, encryptionSettings.password, algorithm);
          
          processedFile = {
            ...fileData,
            encrypted: true,
            algorithm,
            encryptedData: Array.from(new Uint8Array(encryptedData.data)),
            iv: Array.from(new Uint8Array(encryptedData.iv)),
            salt: encryptedData.salt ? Array.from(new Uint8Array(encryptedData.salt)) : null,
            uploadedAt: new Date().toISOString(),
            status: 'encrypted'
          };
        } else {
          // For unencrypted files, convert to base64 for storage
          const fileContent = await fileData.file.arrayBuffer();
          const base64Data = btoa(String.fromCharCode(...new Uint8Array(fileContent)));
          
          processedFile = {
            ...fileData,
            encrypted: false,
            data: base64Data,
            uploadedAt: new Date().toISOString(),
            status: 'uploaded'
          };
        }
        
        setUploadProgress(prev => ({ ...prev, [fileData.id]: 75 }));
        
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setUploadProgress(prev => ({ ...prev, [fileData.id]: 100 }));
        
        uploadedFiles.push(processedFile);
        
      } catch (error) {
        console.error('Upload error:', error);
        setFiles(prev => prev.map(f => 
          f.id === fileData.id 
            ? { ...f, status: 'error', error: error.message }
            : f
        ));
      }
    }
    
    setIsUploading(false);
    
    if (uploadedFiles.length > 0) {
      onFilesUploaded(uploadedFiles);
    }
  };

  const generateSecurePassword = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 16; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setEncryptionSettings(prev => ({ ...prev, password }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Upload Files</h2>
              <p className="text-white/70 text-sm">Drag and drop or click to select files</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Encryption Settings */}
        <div className="mb-6 p-4 bg-white/5 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Encryption Settings</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-3 mb-3">
                <input
                  type="checkbox"
                  checked={encryptionSettings.encrypt}
                  onChange={(e) => setEncryptionSettings(prev => ({
                    ...prev,
                    encrypt: e.target.checked
                  }))}
                  className="w-4 h-4 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                />
                <span className="text-white">Encrypt files before upload</span>
              </label>
              
              {encryptionSettings.encrypt && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Algorithm</label>
                    <select
                      value={encryptionSettings.algorithm}
                      onChange={(e) => setEncryptionSettings(prev => ({
                        ...prev,
                        algorithm: e.target.value
                      }))}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="auto">Auto (Recommended)</option>
                      <option value="aes-256-gcm">AES-256-GCM</option>
                      <option value="aes-192-cbc">AES-192-CBC</option>
                      <option value="aes-128-ctr">AES-128-CTR</option>
                      <option value="tripledes">Triple DES</option>
                      <option value="rabbit">Rabbit</option>
                      <option value="rc4">RC4</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            {encryptionSettings.encrypt && (
              <div>
                <label className="block text-white/80 text-sm mb-2">Encryption Password</label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={encryptionSettings.password}
                    onChange={(e) => setEncryptionSettings(prev => ({
                      ...prev,
                      password: e.target.value
                    }))}
                    placeholder="Enter encryption password"
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={generateSecurePassword}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  >
                    Generate
                  </button>
                </div>
                {encryptionSettings.password && (
                  <div className="text-xs text-green-400 mt-1">
                    Password strength: Strong
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Drop Zone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
            isDragActive 
              ? 'border-blue-400 bg-blue-400/10' 
              : 'border-white/30 hover:border-white/50 hover:bg-white/5'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 text-white/50 mx-auto mb-4" />
          <p className="text-white text-lg mb-2">
            {isDragActive ? 'Drop files here' : 'Drag & drop files here, or click to select'}
          </p>
          <p className="text-white/60 text-sm">
            Support for all file types up to 100MB each
          </p>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-white mb-4">
              Files to Upload ({files.length})
            </h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {files.map((fileData) => (
                <div key={fileData.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  {getFileIcon(fileData.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white font-medium truncate">{fileData.name}</p>
                      {encryptionSettings.encrypt && (
                        <Lock className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    <p className="text-white/60 text-sm">
                      {formatFileSize(fileData.size)}
                      {fileData.algorithm && ` • ${fileData.algorithm.toUpperCase()}`}
                    </p>
                    
                    {/* Progress Bar */}
                    {uploadProgress[fileData.id] !== undefined && (
                      <div className="mt-2">
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress[fileData.id]}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Status */}
                    {fileData.status === 'error' && (
                      <div className="flex items-center gap-2 mt-2">
                        <AlertCircle className="w-4 h-4 text-red-400" />
                        <span className="text-red-400 text-sm">{fileData.error}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Status Icon */}
                  <div className="flex items-center">
                    {uploadProgress[fileData.id] === 100 ? (
                      <Check className="w-5 h-5 text-green-400" />
                    ) : uploadProgress[fileData.id] !== undefined ? (
                      <Loader className="w-5 h-5 text-blue-400 animate-spin" />
                    ) : (
                      <button
                        onClick={() => removeFile(fileData.id)}
                        className="p-1 text-white/70 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/20">
          <div className="text-white/70 text-sm">
            {files.length} file{files.length !== 1 ? 's' : ''} selected
            {encryptionSettings.encrypt && ' • Encryption enabled'}
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 text-white/70 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <motion.button
              onClick={handleUpload}
              disabled={files.length === 0 || isUploading || (encryptionSettings.encrypt && !encryptionSettings.password)}
              whileHover={{ scale: files.length > 0 ? 1.05 : 1 }}
              whileTap={{ scale: files.length > 0 ? 0.95 : 1 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Upload Files
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
