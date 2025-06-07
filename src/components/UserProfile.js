'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Shield, 
  Key, 
  Calendar,
  Edit3,
  Check,
  X,
  Trash2,
  Download,
  Upload,
  FileText,
  Lock,
  Unlock,
  Activity,
  BarChart3,
  Clock,
  HardDrive,
  CloudUpload,
  Cloud
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function UserProfile({ 
  user, 
  driveConnected = false, 
  storageStats = null, 
  onConnectDrive = null, 
  onDisconnectDrive = null, 
  isConnectingDrive = false 
}) {
  const { updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    bio: '',
    joinedDate: user?.metadata?.creationTime || new Date().toISOString()
  });
  const [stats, setStats] = useState({
    totalFiles: 0,
    encryptedFiles: 0,
    storageUsed: 0,
    lastActivity: new Date().toISOString(),
    encryptionsMade: 0,
    algorithmUsage: {}
  });
  const [activityLog, setActivityLog] = useState([]);

  useEffect(() => {
    // Load user stats from localStorage
    if (user) {
      const savedFiles = localStorage.getItem(`cipherit_files_${user.uid}`);
      const savedStats = localStorage.getItem(`cipherit_stats_${user.uid}`);
      const savedActivity = localStorage.getItem(`cipherit_activity_${user.uid}`);
      
      if (savedFiles) {
        const files = JSON.parse(savedFiles);
        updateStatsFromFiles(files);
      }
      
      if (savedStats) {
        setStats(prev => ({ ...prev, ...JSON.parse(savedStats) }));
      }
      
      if (savedActivity) {
        setActivityLog(JSON.parse(savedActivity));
      }
      
      // Load profile data
      const savedProfile = localStorage.getItem(`cipherit_profile_${user.uid}`);
      if (savedProfile) {
        setProfileData(prev => ({ ...prev, ...JSON.parse(savedProfile) }));
      }
    }
  }, [user]);

  const updateStatsFromFiles = (files) => {
    const encryptedFiles = files.filter(f => f.encrypted).length;
    const storageUsed = files.reduce((sum, f) => sum + (f.size || 0), 0);
    
    const algorithmUsage = {};
    files.forEach(file => {
      if (file.algorithm) {
        algorithmUsage[file.algorithm] = (algorithmUsage[file.algorithm] || 0) + 1;
      }
    });

    setStats(prev => ({
      ...prev,
      totalFiles: files.length,
      encryptedFiles,
      storageUsed: Math.round(storageUsed / (1024 * 1024)), // Convert to MB
      algorithmUsage
    }));
  };

  const handleSaveProfile = async () => {
    try {
      // Save to localStorage
      localStorage.setItem(`cipherit_profile_${user.uid}`, JSON.stringify(profileData));
      
      // Update Firebase profile if displayName changed
      if (profileData.displayName !== user.displayName) {
        await updateUserProfile({ displayName: profileData.displayName });
      }
      
      setIsEditing(false);
      
      // Add to activity log
      addActivity('Profile updated', 'profile');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const addActivity = (action, type) => {
    const newActivity = {
      id: Date.now(),
      action,
      type,
      timestamp: new Date().toISOString()
    };
    
    const updatedActivity = [newActivity, ...activityLog].slice(0, 50); // Keep last 50 activities
    setActivityLog(updatedActivity);
    localStorage.setItem(`cipherit_activity_${user.uid}`, JSON.stringify(updatedActivity));
  };

  const exportUserData = () => {
    const userData = {
      profile: profileData,
      stats,
      activityLog,
      files: JSON.parse(localStorage.getItem(`cipherit_files_${user.uid}`) || '[]'),
      settings: JSON.parse(localStorage.getItem('cipherit_settings') || '{}'),
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cipherit-data-${user.uid}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    addActivity('Data exported', 'export');
  };

  const deleteAllData = () => {
    if (confirm('Are you sure? This will permanently delete all your files and data. This action cannot be undone.')) {
      localStorage.removeItem(`cipherit_files_${user.uid}`);
      localStorage.removeItem(`cipherit_stats_${user.uid}`);
      localStorage.removeItem(`cipherit_activity_${user.uid}`);
      localStorage.removeItem(`cipherit_profile_${user.uid}`);
      
      // Reset states
      setStats({
        totalFiles: 0,
        encryptedFiles: 0,
        storageUsed: 0,
        lastActivity: new Date().toISOString(),
        encryptionsMade: 0,
        algorithmUsage: {}
      });
      setActivityLog([]);
      
      addActivity('All data deleted', 'delete');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'upload': return <Upload className="w-4 h-4 text-blue-400" />;
      case 'download': return <Download className="w-4 h-4 text-green-400" />;
      case 'encrypt': return <Lock className="w-4 h-4 text-purple-400" />;
      case 'decrypt': return <Unlock className="w-4 h-4 text-yellow-400" />;
      case 'delete': return <Trash2 className="w-4 h-4 text-red-400" />;
      case 'profile': return <User className="w-4 h-4 text-indigo-400" />;
      case 'export': return <Download className="w-4 h-4 text-cyan-400" />;
      default: return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">User Profile</h2>
        <p className="text-white/70">Manage your account and view your encryption activity</p>
      </div>

      {/* Profile Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Profile Information</h3>
              <p className="text-white/60 text-sm">Member since {formatDate(profileData.joinedDate)}</p>
            </div>
          </div>
          
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-colors flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSaveProfile}
                className="bg-green-500/20 text-green-300 px-4 py-2 rounded-lg hover:bg-green-500/30 transition-colors flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-red-500/20 text-red-300 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Display Name</label>
            {isEditing ? (
              <input
                type="text"
                value={profileData.displayName}
                onChange={(e) => setProfileData(prev => ({ ...prev, displayName: e.target.value }))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your display name"
              />
            ) : (
              <p className="text-white text-lg">{profileData.displayName || 'Not set'}</p>
            )}
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Email</label>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-white/50" />
              <p className="text-white">{profileData.email}</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-white/80 text-sm font-medium mb-2">Bio</label>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Tell us about yourself..."
              />
            ) : (
              <p className="text-white/80">{profileData.bio || 'No bio added yet'}</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-semibold text-white">Usage Statistics</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.totalFiles}</div>
            <div className="text-white/60 text-sm">Total Files</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stats.encryptedFiles}</div>
            <div className="text-white/60 text-sm">Encrypted Files</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <HardDrive className="w-6 h-6 text-green-400" />
            </div>
            {driveConnected && storageStats ? (
              <>
                <div className="text-2xl font-bold text-white mb-1">{storageStats.used} MB</div>
                <div className="text-white/60 text-sm">Google Drive Storage</div>
              </>
            ) : driveConnected ? (
              <>
                <div className="text-2xl font-bold text-white mb-1">Loading...</div>
                <div className="text-white/60 text-sm">Storage Used</div>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-white mb-1">{stats.storageUsed} MB</div>
                <div className="text-white/60 text-sm">Local Storage</div>
              </>
            )}
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {Math.round((stats.encryptedFiles / Math.max(stats.totalFiles, 1)) * 100)}%
            </div>
            <div className="text-white/60 text-sm">Encryption Rate</div>
          </div>
        </div>

        {/* Google Drive Connection */}
        <div className="bg-white/5 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Cloud className="w-5 h-5" />
            Cloud Storage
          </h4>
          {driveConnected ? (
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Google Drive Connected</div>
                <div className="text-white/60 text-sm">
                  {storageStats ? `${storageStats.used}MB / ${storageStats.total}MB used` : 'Loading storage info...'}
                </div>
              </div>
              {onDisconnectDrive && (
                <button
                  onClick={onDisconnectDrive}
                  className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors text-sm"
                >
                  Disconnect
                </button>
              )}
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="text-white/70 mb-4">
                Connect Google Drive to backup your encrypted files and get real storage statistics
              </div>
              {onConnectDrive && (
                <motion.button
                  onClick={onConnectDrive}
                  disabled={isConnectingDrive}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                >
                  {isConnectingDrive ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Cloud className="w-4 h-4" />
                      Connect Google Drive
                    </>
                  )}
                </motion.button>
              )}
            </div>
          )}
        </div>

        {/* Algorithm Usage */}
        {Object.keys(stats.algorithmUsage).length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Algorithm Usage</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {Object.entries(stats.algorithmUsage).map(([algorithm, count]) => (
                <div key={algorithm} className="bg-white/5 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-white">{count}</div>
                  <div className="text-white/60 text-xs uppercase">{algorithm}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <Activity className="w-6 h-6 text-orange-400" />
          <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
        </div>

        {activityLog.length > 0 ? (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {activityLog.slice(0, 10).map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                {getActivityIcon(activity.type)}
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.action}</p>
                  <p className="text-white/50 text-xs">{formatDateTime(activity.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Activity className="w-12 h-12 text-white/30 mx-auto mb-3" />
            <p className="text-white/50">No activity yet</p>
          </div>
        )}
      </motion.div>

      {/* Data Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-red-400" />
          <h3 className="text-xl font-semibold text-white">Data Management</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={exportUserData}
            className="bg-blue-500/20 border border-blue-500/30 text-blue-300 px-6 py-4 rounded-xl font-medium hover:bg-blue-500/30 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Download className="w-5 h-5" />
            Export All Data
          </button>

          <button
            onClick={deleteAllData}
            className="bg-red-500/20 border border-red-500/30 text-red-300 px-6 py-4 rounded-xl font-medium hover:bg-red-500/30 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <Trash2 className="w-5 h-5" />
            Delete All Data
          </button>
        </div>

        <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-yellow-400 mt-0.5" />
            <div>
              <h4 className="text-yellow-400 font-medium mb-1">Privacy Notice</h4>
              <p className="text-white/70 text-sm">
                Your data is stored locally in your browser. CipherIt follows a zero-knowledge architecture, 
                meaning we never have access to your files or encryption keys. Deleting your data is permanent 
                and cannot be recovered.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
