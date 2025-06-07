'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '../../../hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const { signInWithEmail, signInWithGoogle, error } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setIsLoading(true);
      await signInWithEmail(email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      router.push('/dashboard');
    } catch (error) {
      console.error('Google login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden relative">
      {/* Ultra-Premium Architectural Background System */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Primary architectural light source */}
        <div className="absolute w-[800px] h-[800px] bg-gradient-radial from-amber-400/8 via-orange-500/4 via-yellow-400/2 to-transparent rounded-full blur-3xl top-1/6 left-1/4 animate-pulse-slow opacity-80" />
        
        {/* Secondary depth layers */}
        <div className="absolute top-1/5 right-1/6 w-[600px] h-[600px] bg-gradient-radial from-yellow-400/6 via-amber-400/3 to-transparent rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/6 left-1/8 w-[700px] h-[700px] bg-gradient-radial from-orange-400/5 via-amber-500/2 to-transparent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '3s' }} />
        
        {/* Architectural mesh pattern */}
        <div className="absolute inset-0 opacity-[0.008]" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.8'%3E%3Cpath d='M40 40c0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4 4-1.8 4-4zm0-40c0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4 4-1.8 4-4zm0 80c0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4 4-1.8 4-4zM0 40c0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4 4-1.8 4-4zm80 0c0-2.2-1.8-4-4-4s-4 1.8-4 4 1.8 4 4 4 4-1.8 4-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '80px 80px'
             }} />
        
        {/* Floating geometric accents */}
        <div className="absolute top-1/4 left-1/2 w-1 h-20 bg-gradient-to-b from-amber-400/20 to-transparent animate-float" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-1 h-16 bg-gradient-to-t from-orange-400/20 to-transparent animate-float" style={{ animationDelay: '2.5s' }} />
        
        {/* Subtle geometric grid */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 79px, rgba(251, 191, 36, 0.1) 80px, rgba(251, 191, 36, 0.1) 81px, transparent 82px),
              linear-gradient(0deg, transparent 79px, rgba(251, 191, 36, 0.1) 80px, rgba(251, 191, 36, 0.1) 81px, transparent 82px)
            `,
            backgroundSize: '80px 80px'
          }} />
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.165, 0.84, 0.44, 1],
            type: "spring",
            stiffness: 100,
            damping: 20
          }}
          className="w-full max-w-md"
        >
          {/* Ultra-Premium Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.165, 0.84, 0.44, 1] }}
          >
            <Link 
              href="/" 
              className="group inline-flex items-center space-x-3 text-gray-400 hover:text-amber-300 transition-all duration-500 mb-12 relative overflow-hidden"
            >
              <div className="relative z-10 flex items-center space-x-3">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-500 ease-out" />
                <span className="font-medium text-sm tracking-wide">Back to Home</span>
              </div>
              
              {/* Hover underline effect */}
              <div className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-full transition-all duration-500 ease-out"></div>
              
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 rounded-lg bg-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110"></div>
            </Link>
          </motion.div>

          {/* Ultra-Premium Login Architecture */}
          <div className="relative">
            {/* Multi-layered glow system */}
            <div className="absolute -inset-8 bg-gradient-to-r from-amber-500/15 via-orange-500/20 to-yellow-500/15 rounded-[2.5rem] blur-2xl opacity-60 animate-pulse-slow"></div>
            <div className="absolute -inset-6 bg-gradient-to-br from-amber-400/10 to-orange-600/10 rounded-[2rem] blur-xl opacity-80"></div>
            <div className="absolute -inset-4 bg-gradient-to-tr from-yellow-400/8 to-amber-500/8 rounded-3xl blur-lg opacity-50"></div>
            
            {/* Main card with architectural depth */}
            <div className="relative bg-[#0d0d0d]/95 border border-white/10 rounded-3xl p-10 shadow-2xl backdrop-blur-3xl">
              {/* Subtle inner border highlight */}
              <div className="absolute inset-px bg-gradient-to-b from-white/5 to-transparent rounded-3xl pointer-events-none"></div>
              
              {/* Architectural header system */}
              <div className="text-center mb-10">
                {/* Ultra-premium icon with multiple interaction layers */}
                <motion.div
                  initial={{ scale: 0.6, opacity: 0, rotateY: -45 }}
                  animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                  transition={{ 
                    duration: 1.0, 
                    delay: 0.3,
                    ease: [0.165, 0.84, 0.44, 1]
                  }}
                  className="relative inline-flex items-center justify-center mb-8 group cursor-pointer"
                  whileHover={{ 
                    scale: 1.05,
                    rotateY: 5,
                    transition: { duration: 0.6, ease: "easeOut" }
                  }}
                >
                  {/* Multiple glow layers */}
                  <div className="absolute -inset-6 bg-gradient-to-r from-amber-500/30 via-orange-500/40 to-yellow-500/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="absolute -inset-4 bg-gradient-to-br from-amber-400/20 to-orange-600/20 rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
                  <div className="absolute -inset-2 bg-gradient-to-tr from-yellow-400/15 to-amber-500/15 rounded-xl blur opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
                  
                  {/* Icon container with sophisticated styling */}
                  <div className="relative p-6 bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 rounded-2xl shadow-2xl shadow-amber-500/30 group-hover:shadow-amber-500/50 transition-all duration-500">
                    {/* Inner highlight */}
                    <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                    
                    {/* Icon with micro-animation */}
                    <motion.div
                      animate={{ 
                        rotateZ: [0, 5, -5, 0],
                        scale: [1, 1.02, 1]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Shield className="w-10 h-10 text-white relative z-10" />
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* Ultra-premium typography */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
                >
                  <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4 leading-tight">
                    <span className="bg-gradient-to-r from-amber-200 via-orange-200 via-yellow-200 to-amber-200 bg-clip-text text-transparent bg-size-200 animate-shimmer">
                      Welcome Back
                    </span>
                  </h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7, ease: [0.165, 0.84, 0.44, 1] }}
                    className="text-gray-300/90 text-lg leading-relaxed font-medium max-w-sm mx-auto"
                  >
                    Access your fortress of <span className="text-amber-300/80">encrypted files</span>
                  </motion.p>
                </motion.div>
              </div>

              {/* Ultra-Premium Error System */}
              {(error || Object.keys(errors).length > 0) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
                  className="mb-8 relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-xl blur"></div>
                  <div className="relative p-4 bg-red-500/10 border border-red-400/20 rounded-xl backdrop-blur-sm">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-red-400"></div>
                      </div>
                      <p className="text-red-300/90 text-sm font-medium leading-relaxed">
                        {error || 'Please fix the errors below'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Ultra-Premium Google Authentication */}
              <motion.button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.165, 0.84, 0.44, 1] }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ 
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
                className="group relative w-full mb-8 p-5 bg-white/8 hover:bg-white/12 border border-white/15 hover:border-white/25 rounded-2xl font-semibold transition-all duration-500 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Multi-layer hover effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Button content */}
                <div className="relative flex items-center justify-center space-x-4">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </motion.div>
                  <span className="text-white/90 font-medium text-lg tracking-wide">Continue with Google</span>
                </div>
                
                {/* Subtle border glow on hover */}
                <div className="absolute inset-0 rounded-2xl border border-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>

              {/* Architectural Divider System */}
              <div className="relative mb-8 flex items-center">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-600/40 to-gray-600/40"></div>
                <div className="relative px-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur"></div>
                  <span className="relative text-gray-400/80 font-medium text-sm tracking-wide">
                    Or continue with email
                  </span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-600/40 via-gray-600/40 to-transparent"></div>
              </div>

              {/* Ultra-Premium Email Authentication Form */}
              <form onSubmit={handleEmailLogin} className="space-y-8">
                {/* Email Field with Architectural Design */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
                  className="group"
                >
                  <label className="block text-sm font-semibold text-gray-300/90 mb-4 tracking-wide">
                    Email Address
                  </label>
                  <div className="relative">
                    {/* Input field with sophisticated styling */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400/60 group-focus-within:text-amber-400 transition-colors duration-300" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full pl-14 pr-5 py-5 bg-white/5 border-2 rounded-2xl text-white/95 placeholder-gray-400/70 focus:outline-none focus:ring-0 focus:border-amber-500/60 transition-all duration-500 font-medium text-lg ${
                          errors.email ? 'border-red-500/50 bg-red-500/5' : 'border-white/15 hover:border-white/25 focus:bg-white/8'
                        }`}
                        placeholder="Enter your email address"
                      />
                      
                      {/* Focus glow effect */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-amber-400/30 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                  
                  {/* Error message with sophisticated styling */}
                  {errors.email && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="mt-3 flex items-center space-x-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                      <p className="text-sm text-red-300/80 font-medium">
                        {errors.email}
                      </p>
                    </motion.div>
                  )}
                </motion.div>

                {/* Password Field with Ultra-Premium Design */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.9, ease: [0.165, 0.84, 0.44, 1] }}
                  className="group"
                >
                  <label className="block text-sm font-semibold text-gray-300/90 mb-4 tracking-wide">
                    Password
                  </label>
                  <div className="relative">
                    {/* Sophisticated input styling */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    
                    <div className="relative">
                      <Lock className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-400/60 group-focus-within:text-amber-400 transition-colors duration-300" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full pl-14 pr-14 py-5 bg-white/5 border-2 rounded-2xl text-white/95 placeholder-gray-400/70 focus:outline-none focus:ring-0 focus:border-amber-500/60 transition-all duration-500 font-medium text-lg ${
                          errors.password ? 'border-red-500/50 bg-red-500/5' : 'border-white/15 hover:border-white/25 focus:bg-white/8'
                        }`}
                        placeholder="Enter your password"
                      />
                      
                      {/* Premium toggle button */}
                      <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400/70 hover:text-amber-400 transition-colors duration-300 p-1 rounded-lg hover:bg-white/5"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </motion.button>
                      
                      {/* Focus glow effect */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-amber-400/30 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                  
                  {/* Error message */}
                  {errors.password && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="mt-3 flex items-center space-x-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                      <p className="text-sm text-red-300/80 font-medium">
                        {errors.password}
                      </p>
                    </motion.div>
                  )}
                </motion.div>

                {/* Ultra-Premium Forgot Password */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  className="text-right"
                >
                  <Link 
                    href="/auth/forgot-password" 
                    className="group inline-flex items-center text-sm text-amber-400/80 hover:text-amber-300 font-medium transition-all duration-300 relative"
                  >
                    <span>Forgot your password?</span>
                    <div className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-full transition-all duration-300"></div>
                  </Link>
                </motion.div>

                {/* Ultra-Premium Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1, ease: [0.165, 0.84, 0.44, 1] }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                  className="group relative w-full py-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl font-bold text-xl text-[#0a0a0a] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {/* Multiple effect layers */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/40 to-orange-600/40 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Button content */}
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    {isLoading ? (
                      <>
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-6 h-6 border-3 border-[#0a0a0a]/30 border-t-[#0a0a0a] rounded-full"
                        />
                        <span>Signing In...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In to CipherIt</span>
                        <motion.div
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.3 }}
                          className="w-5 h-5 flex items-center justify-center"
                        >
                          <svg 
                            className="w-4 h-4 fill-current" 
                            viewBox="0 0 24 24"
                          >
                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                          </svg>
                        </motion.div>
                      </>
                    )}
                  </span>
                  
                  {/* Inner highlight */}
                  <div className="absolute inset-1 bg-gradient-to-b from-white/20 to-transparent rounded-xl opacity-60"></div>
                </motion.button>
              </form>

              {/* Ultra-Premium Sign Up Link */}              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3, ease: [0.165, 0.84, 0.44, 1] }}
                className="text-center mt-8"
              >
                <div className="text-gray-400/80 text-base">
                  Don't have an account?{' '}
                  <Link 
                    href="/auth/signup" 
                    className="group relative inline-flex items-center text-amber-400 hover:text-amber-300 font-semibold transition-all duration-300"
                  >
                    <span>Create one now</span>
                    <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 group-hover:w-full transition-all duration-300"></div>
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.3 }}
                      className="ml-1"
                    >
                      →
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Ultra-Premium Security Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.165, 0.84, 0.44, 1] }}
            className="mt-8 flex items-center justify-center space-x-3 text-emerald-400/70 text-sm"
          >
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="font-medium">End-to-end encrypted</span>
            </div>
            <div className="w-px h-4 bg-gray-600/40"></div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span className="font-medium">Zero-knowledge</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
