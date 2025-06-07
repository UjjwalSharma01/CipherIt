'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Settings, 
  Lock, 
  Key, 
  Zap, 
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Info,
  Check,
  X,
  RefreshCw,
  Download,
  Upload,
  Eye,
  EyeOff
} from 'lucide-react';

export default function EncryptionSettings() {
  const [settings, setSettings] = useState({
    defaultAlgorithm: 'auto',
    autoEncrypt: true,
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSymbols: true
    },
    fileTypeSettings: {
      images: 'aes-128-ctr',
      videos: 'aes-256-gcm',
      documents: 'aes-192-cbc',
      audio: 'aes-128-ctr',
      archives: 'aes-256-gcm',
      other: 'aes-192-cbc'
    },
    performance: {
      maxFileSize: 100,
      batchSize: 10,
      enableProgress: true
    }
  });

  const [testPassword, setTestPassword] = useState('');
  const [showTestPassword, setShowTestPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('cipherit_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem('cipherit_settings', JSON.stringify(settings));
  };

  const algorithms = [
    {
      id: 'auto',
      name: 'Auto (Recommended)',
      description: 'Automatically selects the best algorithm based on file type and size',
      security: 'Variable',
      speed: 'Optimized',
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 'aes-256-gcm',
      name: 'AES-256-GCM',
      description: 'Maximum security with authenticated encryption',
      security: 'Maximum',
      speed: 'Medium',
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: 'aes-192-cbc',
      name: 'AES-192-CBC',
      description: 'Good balance of security and performance',
      security: 'High',
      speed: 'Fast',
      icon: <Lock className="w-5 h-5" />
    },
    {
      id: 'aes-128-ctr',
      name: 'AES-128-CTR',
      description: 'Fast encryption for small files',
      security: 'Good',
      speed: 'Very Fast',
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 'tripledes',
      name: 'Triple DES',
      description: 'Legacy algorithm for compatibility',
      security: 'Medium',
      speed: 'Slow',
      icon: <Key className="w-5 h-5" />
    },
    {
      id: 'rabbit',
      name: 'Rabbit',
      description: 'Very fast stream cipher',
      security: 'Good',
      speed: 'Very Fast',
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: 'rc4',
      name: 'RC4',
      description: 'Lightweight cipher for non-sensitive data',
      security: 'Low',
      speed: 'Very Fast',
      icon: <RefreshCw className="w-5 h-5" />
    }
  ];

  const fileTypes = [
    { id: 'images', name: 'Images', icon: <Image className="w-5 h-5" />, types: ['jpg', 'png', 'gif', 'svg'] },
    { id: 'videos', name: 'Videos', icon: <Video className="w-5 h-5" />, types: ['mp4', 'avi', 'mov', 'mkv'] },
    { id: 'documents', name: 'Documents', icon: <FileText className="w-5 h-5" />, types: ['pdf', 'doc', 'txt', 'md'] },
    { id: 'audio', name: 'Audio', icon: <Music className="w-5 h-5" />, types: ['mp3', 'wav', 'flac', 'aac'] },
    { id: 'archives', name: 'Archives', icon: <Archive className="w-5 h-5" />, types: ['zip', 'rar', '7z', 'tar'] },
    { id: 'other', name: 'Other', icon: <FileText className="w-5 h-5" />, types: ['*'] }
  ];

  const checkPasswordStrength = (password) => {
    const checks = {
      length: password.length >= settings.passwordPolicy.minLength,
      uppercase: settings.passwordPolicy.requireUppercase ? /[A-Z]/.test(password) : true,
      lowercase: settings.passwordPolicy.requireLowercase ? /[a-z]/.test(password) : true,
      numbers: settings.passwordPolicy.requireNumbers ? /\d/.test(password) : true,
      symbols: settings.passwordPolicy.requireSymbols ? /[^A-Za-z0-9]/.test(password) : true
    };
    
    const score = Object.values(checks).filter(Boolean).length;
    const total = Object.keys(checks).length;
    
    return {
      score,
      total,
      checks,
      strength: score === total ? 'strong' : score >= total * 0.7 ? 'medium' : 'weak'
    };
  };

  useEffect(() => {
    if (testPassword) {
      setPasswordStrength(checkPasswordStrength(testPassword));
    } else {
      setPasswordStrength(null);
    }
  }, [testPassword, settings.passwordPolicy]);

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cipherit-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importSettings = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target.result);
          setSettings(importedSettings);
          saveSettings();
        } catch (error) {
          alert('Invalid settings file');
        }
      };
      reader.readAsText(file);
    }
  };

  const resetSettings = () => {
    const defaultSettings = {
      defaultAlgorithm: 'auto',
      autoEncrypt: true,
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSymbols: true
      },
      fileTypeSettings: {
        images: 'aes-128-ctr',
        videos: 'aes-256-gcm',
        documents: 'aes-192-cbc',
        audio: 'aes-128-ctr',
        archives: 'aes-256-gcm',
        other: 'aes-192-cbc'
      },
      performance: {
        maxFileSize: 100,
        batchSize: 10,
        enableProgress: true
      }
    };
    setSettings(defaultSettings);
    saveSettings();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Encryption Settings</h2>
        <p className="text-white/70">Customize your encryption preferences and security policies</p>
      </div>

      {/* General Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <Settings className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">General Settings</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-3">
              Default Encryption Algorithm
            </label>
            <select
              value={settings.defaultAlgorithm}
              onChange={(e) => setSettings(prev => ({ ...prev, defaultAlgorithm: e.target.value }))}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {algorithms.map(algo => (
                <option key={algo.id} value={algo.id}>{algo.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.autoEncrypt}
                onChange={(e) => setSettings(prev => ({ ...prev, autoEncrypt: e.target.checked }))}
                className="w-5 h-5 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500"
              />
              <div>
                <span className="text-white font-medium">Auto-encrypt files</span>
                <p className="text-white/60 text-sm">Automatically encrypt files during upload</p>
              </div>
            </label>
          </div>
        </div>
      </motion.div>

      {/* Algorithm Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-semibold text-white">Encryption Algorithms</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {algorithms.map(algo => (
            <div
              key={algo.id}
              className={`p-4 rounded-xl border transition-all ${
                settings.defaultAlgorithm === algo.id
                  ? 'bg-blue-500/20 border-blue-500/40'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                {algo.icon}
                <h4 className="text-white font-medium">{algo.name}</h4>
              </div>
              <p className="text-white/70 text-sm mb-3">{algo.description}</p>
              <div className="flex gap-4 text-xs">
                <span className="text-white/60">
                  Security: <span className={`font-medium ${
                    algo.security === 'Maximum' ? 'text-green-400' :
                    algo.security === 'High' ? 'text-blue-400' :
                    algo.security === 'Good' ? 'text-yellow-400' :
                    algo.security === 'Medium' ? 'text-orange-400' : 'text-red-400'
                  }`}>{algo.security}</span>
                </span>
                <span className="text-white/60">
                  Speed: <span className="text-white font-medium">{algo.speed}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* File Type Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <FileText className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">File Type Preferences</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fileTypes.map(type => (
            <div key={type.id} className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                {type.icon}
                <div>
                  <h4 className="text-white font-medium">{type.name}</h4>
                  <p className="text-white/60 text-xs">{type.types.join(', ')}</p>
                </div>
              </div>
              <select
                value={settings.fileTypeSettings[type.id]}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  fileTypeSettings: {
                    ...prev.fileTypeSettings,
                    [type.id]: e.target.value
                  }
                }))}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {algorithms.filter(a => a.id !== 'auto').map(algo => (
                  <option key={algo.id} value={algo.id}>{algo.name}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Password Policy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <Key className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-semibold text-white">Password Policy</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Minimum Length: {settings.passwordPolicy.minLength} characters
              </label>
              <input
                type="range"
                min="6"
                max="32"
                value={settings.passwordPolicy.minLength}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  passwordPolicy: {
                    ...prev.passwordPolicy,
                    minLength: parseInt(e.target.value)
                  }
                }))}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              {[
                { key: 'requireUppercase', label: 'Require uppercase letters' },
                { key: 'requireLowercase', label: 'Require lowercase letters' },
                { key: 'requireNumbers', label: 'Require numbers' },
                { key: 'requireSymbols', label: 'Require symbols' }
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={settings.passwordPolicy[key]}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      passwordPolicy: {
                        ...prev.passwordPolicy,
                        [key]: e.target.checked
                      }
                    }))}
                    className="w-4 h-4 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500"
                  />
                  <span className="text-white">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Test Password Strength
            </label>
            <div className="relative mb-3">
              <input
                type={showTestPassword ? 'text' : 'password'}
                value={testPassword}
                onChange={(e) => setTestPassword(e.target.value)}
                placeholder="Enter a password to test"
                className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowTestPassword(!showTestPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60"
              >
                {showTestPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {passwordStrength && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-white/70 text-sm">Strength:</span>
                  <span className={`font-medium ${
                    passwordStrength.strength === 'strong' ? 'text-green-400' :
                    passwordStrength.strength === 'medium' ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {passwordStrength.strength.toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-2">
                  {Object.entries(passwordStrength.checks).map(([key, passed]) => (
                    <div key={key} className={`flex items-center gap-2 text-sm ${passed ? 'text-green-400' : 'text-red-400'}`}>
                      {passed ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      {key === 'length' && `At least ${settings.passwordPolicy.minLength} characters`}
                      {key === 'uppercase' && 'Contains uppercase letters'}
                      {key === 'lowercase' && 'Contains lowercase letters'}
                      {key === 'numbers' && 'Contains numbers'}
                      {key === 'symbols' && 'Contains symbols'}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Performance Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
      >
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-semibold text-white">Performance Settings</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Max File Size: {settings.performance.maxFileSize} MB
            </label>
            <input
              type="range"
              min="10"
              max="500"
              step="10"
              value={settings.performance.maxFileSize}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                performance: {
                  ...prev.performance,
                  maxFileSize: parseInt(e.target.value)
                }
              }))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Batch Size: {settings.performance.batchSize} files
            </label>
            <input
              type="range"
              min="1"
              max="50"
              value={settings.performance.batchSize}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                performance: {
                  ...prev.performance,
                  batchSize: parseInt(e.target.value)
                }
              }))}
              className="w-full"
            />
          </div>

          <div className="flex items-center">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.performance.enableProgress}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  performance: {
                    ...prev.performance,
                    enableProgress: e.target.checked
                  }
                }))}
                className="w-4 h-4 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500"
              />
              <div>
                <span className="text-white font-medium">Show Progress</span>
                <p className="text-white/60 text-sm">Display encryption progress</p>
              </div>
            </label>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <button
          onClick={saveSettings}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <Check className="w-5 h-5" />
          Save Settings
        </button>

        <button
          onClick={exportSettings}
          className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Export
        </button>

        <label className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-all duration-300 flex items-center gap-2 cursor-pointer">
          <Upload className="w-5 h-5" />
          Import
          <input
            type="file"
            accept=".json"
            onChange={importSettings}
            className="hidden"
          />
        </label>

        <button
          onClick={resetSettings}
          className="bg-red-500/20 border border-red-500/30 text-red-300 px-6 py-3 rounded-xl font-medium hover:bg-red-500/30 transition-all duration-300 flex items-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          Reset to Defaults
        </button>
      </motion.div>
    </div>
  );
}
