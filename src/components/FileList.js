'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  File, 
  Image, 
  Video, 
  Music, 
  Archive,
  FileText,
  Download,
  Trash2,
  Eye,
  Lock,
  Unlock,
  Cloud,
  Calendar,
  Shield,
  AlertCircle,
  Check,
  Copy,
  Share,
  MoreVertical
} from 'lucide-react';
import { decryptFile } from '../lib/encryption';

export default function FileList({ files, viewMode, onFilesChange }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showDecryptModal, setShowDecryptModal] = useState(false);
  const [decryptingFile, setDecryptingFile] = useState(null);
  const [decryptPassword, setDecryptPassword] = useState('');
  const [decryptError, setDecryptError] = useState('');

  const getFileIcon = (type, size = 'w-6 h-6') => {
    const iconClass = `${size} flex-shrink-0`;
    if (type?.startsWith('image/')) return <Image className={`${iconClass} text-blue-400`} />;
    if (type?.startsWith('video/')) return <Video className={`${iconClass} text-purple-400`} />;
    if (type?.startsWith('audio/')) return <Music className={`${iconClass} text-green-400`} />;
    if (type?.includes('zip') || type?.includes('rar')) return <Archive className={`${iconClass} text-yellow-400`} />;
    return <FileText className={`${iconClass} text-gray-400`} />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleFileSelect = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleDeleteFile = (fileId) => {
    const updatedFiles = files.filter(file => file.id !== fileId);
    onFilesChange(updatedFiles);
    setSelectedFiles(prev => prev.filter(id => id !== fileId));
  };

  const handleDeleteSelected = () => {
    const updatedFiles = files.filter(file => !selectedFiles.includes(file.id));
    onFilesChange(updatedFiles);
    setSelectedFiles([]);
  };

  const handleDownloadFile = async (file) => {
    try {
      let fileData;
      let fileName = file.name;

      if (file.encrypted) {
        // Show decrypt modal
        setDecryptingFile(file);
        setShowDecryptModal(true);
        return;
      } else {
        // Handle unencrypted file
        const binaryString = atob(file.data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        fileData = bytes;
      }

      // Create download
      const blob = new Blob([fileData], { type: file.type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  const handleDecryptAndDownload = async () => {
    if (!decryptingFile || !decryptPassword) return;

    try {
      setDecryptError('');
      
      // Reconstruct encrypted data
      const encryptedData = new Uint8Array(decryptingFile.encryptedData);
      const iv = new Uint8Array(decryptingFile.iv);
      const salt = decryptingFile.salt ? new Uint8Array(decryptingFile.salt) : null;

      // Decrypt the file
      const decryptedData = await decryptFile(
        { data: encryptedData, iv, salt },
        decryptPassword,
        decryptingFile.algorithm
      );

      // Create download
      const blob = new Blob([decryptedData], { type: decryptingFile.type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = decryptingFile.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Close modal
      setShowDecryptModal(false);
      setDecryptingFile(null);
      setDecryptPassword('');
    } catch (error) {
      setDecryptError('Invalid password or corrupted file');
      console.error('Decryption error:', error);
    }
  };

  const copyFileInfo = (file) => {
    const info = `File: ${file.name}\nSize: ${formatFileSize(file.size)}\nType: ${file.type}\nEncrypted: ${file.encrypted ? 'Yes' : 'No'}\nUploaded: ${formatDate(file.uploadedAt)}`;
    navigator.clipboard.writeText(info);
  };

  if (files.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText className="w-12 h-12 text-white/50" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No files uploaded yet</h3>
        <p className="text-white/70 mb-6">Upload your first file to get started with secure encryption</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Selection Actions */}
      {selectedFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20"
        >
          <div className="flex items-center justify-between">
            <span className="text-white">
              {selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleDeleteSelected}
                className="px-4 py-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Selected
              </button>
              <button
                onClick={() => setSelectedFiles([])}
                className="px-4 py-2 text-white/70 hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* File Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
          : 'space-y-3'
      }>
        <AnimatePresence>
          {files.map((file) => (
            <motion.div
              key={file.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:border-white/30 transition-all group ${
                selectedFiles.includes(file.id) ? 'ring-2 ring-blue-500 bg-blue-500/10' : ''
              } ${
                viewMode === 'grid' ? 'p-4' : 'p-4 flex items-center gap-4'
              }`}
            >
              {viewMode === 'grid' ? (
                // Grid View
                <>
                  <div className="flex items-center justify-between mb-3">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => handleFileSelect(file.id)}
                      className="w-4 h-4 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                    />
                    <div className="flex items-center gap-1">
                      {file.encrypted && <Lock className="w-4 h-4 text-green-400" />}
                      {file.status === 'error' && <AlertCircle className="w-4 h-4 text-red-400" />}
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    {getFileIcon(file.type, 'w-12 h-12')}
                  </div>

                  <div className="space-y-2 mb-4">
                    <h3 className="text-white font-medium text-sm truncate" title={file.name}>
                      {file.name}
                    </h3>
                    <p className="text-white/60 text-xs">
                      {formatFileSize(file.size)}
                    </p>
                    <p className="text-white/50 text-xs">
                      {formatDate(file.uploadedAt)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownloadFile(file)}
                      className="flex-1 bg-blue-500/20 text-blue-300 py-2 px-3 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center justify-center gap-1 text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button
                      onClick={() => handleDeleteFile(file.id)}
                      className="bg-red-500/20 text-red-300 py-2 px-3 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                // List View
                <>
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(file.id)}
                    onChange={() => handleFileSelect(file.id)}
                    className="w-4 h-4 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                  />

                  {getFileIcon(file.type)}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-medium truncate">{file.name}</h3>
                      {file.encrypted && <Lock className="w-4 h-4 text-green-400" />}
                      {file.status === 'error' && <AlertCircle className="w-4 h-4 text-red-400" />}
                    </div>
                    <div className="flex items-center gap-4 text-white/60 text-sm">
                      <span>{formatFileSize(file.size)}</span>
                      <span>{formatDate(file.uploadedAt)}</span>
                      {file.encrypted && file.algorithm && (
                        <span className="text-green-400">{file.algorithm.toUpperCase()}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyFileInfo(file)}
                      className="p-2 text-white/70 hover:text-white transition-colors"
                      title="Copy file info"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDownloadFile(file)}
                      className="p-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteFile(file.id)}
                      className="p-2 bg-red-500/20 text-red-300 rounded-lg hover:bg-red-500/30 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Decrypt Modal */}
      <AnimatePresence>
        {showDecryptModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowDecryptModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 max-w-md w-full"
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">Decrypt File</h3>
              </div>

              <div className="mb-6">
                <p className="text-white/70 text-sm mb-4">
                  Enter the password to decrypt "{decryptingFile?.name}"
                </p>
                <input
                  type="password"
                  value={decryptPassword}
                  onChange={(e) => setDecryptPassword(e.target.value)}
                  placeholder="Enter decryption password"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                {decryptError && (
                  <p className="text-red-400 text-sm mt-2">{decryptError}</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowDecryptModal(false);
                    setDecryptingFile(null);
                    setDecryptPassword('');
                    setDecryptError('');
                  }}
                  className="flex-1 px-4 py-3 text-white/70 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDecryptAndDownload}
                  disabled={!decryptPassword}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Decrypt & Download
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
