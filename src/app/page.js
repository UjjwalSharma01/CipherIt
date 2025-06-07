'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Lock, Cloud, Zap, Users, Star, ArrowRight, CheckCircle, Globe, Smartphone, Database, Eye } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Sophisticated Background System */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Primary ambient light */}
        <div 
          className="absolute w-[600px] h-[600px] bg-gradient-radial from-amber-400/8 via-orange-500/4 to-transparent rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 300,
            top: mousePosition.y - 300,
            transform: `translate3d(0, ${scrollY * 0.3}px, 0)`,
            transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1), top 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
        
        {/* Secondary accent lights */}
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-yellow-400/6 to-transparent rounded-full blur-2xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 left-1/5 w-96 h-96 bg-gradient-radial from-orange-400/5 to-transparent rounded-full blur-3xl" 
             style={{ animationDelay: '2s' }} />
        
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.015]" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M30 30c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm0-20c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm0 40c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zM10 30c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm40 0c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '60px 60px'
             }} />
      </div>

      {/* Premium Navigation */}
      <nav className="relative z-50 px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <div className="p-2.5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg shadow-amber-500/25">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl blur opacity-30"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent tracking-tight">
                  CipherIt
                </span>
                <span className="text-xs text-amber-400/70 font-medium tracking-wider uppercase">PROTECTION</span>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hidden lg:flex items-center space-x-10"
            >
              {['Features', 'Security', 'Enterprise', 'Resources'].map((item, index) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="relative text-gray-300 hover:text-white transition-all duration-300 font-medium tracking-wide text-sm group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center space-x-4"
            >
              <Link 
                href="/auth/login" 
                className="text-gray-300 hover:text-amber-300 transition-all duration-300 font-medium text-sm tracking-wide hidden sm:block"
              >
                Sign In
              </Link>
              <Link 
                href="/auth/signup" 
                className="group relative px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg font-semibold text-sm tracking-wide overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25"
              >
                <span className="relative z-10">Start Free Trial</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Premium Agency Design */}
      <section ref={heroRef} className="relative z-10 px-6 lg:px-8 py-20 lg:py-32 min-h-screen flex items-center">
        {/* Sophisticated floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            className="absolute top-1/4 left-1/12 w-3 h-3 bg-amber-400 rounded-full opacity-60"
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.6, 1, 0.6] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/6 w-2 h-2 bg-orange-400 rounded-full opacity-40"
            animate={{ 
              y: [0, 30, 0],
              x: [0, 10, 0],
              opacity: [0.4, 0.8, 0.4] 
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2 
            }}
          />
          <motion.div 
            className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-50"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5] 
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1 
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            {/* Premium trust badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="inline-flex items-center space-x-3 px-6 py-3 mb-8 lg:mb-12"
            >
              <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-400/20 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-300 font-medium text-sm tracking-wide">LIVE</span>
              </div>
              <span className="text-gray-300 font-medium text-sm">Trusted by Fortune 500 companies</span>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
              </div>
            </motion.div>

            {/* Sophisticated headline system */}
            <div className="space-y-6 lg:space-y-8 mb-8 lg:mb-12">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl lg:text-7xl xl:text-8xl font-light leading-[0.9] tracking-tight"
              >
                <span className="block text-gray-100 font-extralight">Your files are</span>
                <span className="block font-bold bg-gradient-to-r from-amber-200 via-orange-300 to-yellow-200 bg-clip-text text-transparent relative">
                  unbreakable
                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 to-orange-400/20 blur-xl rounded-2xl"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </span>
                <span className="block text-gray-100 font-extralight">even when hacked</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light tracking-wide"
              >
                Military-grade encryption that makes your personal files mathematically impossible 
                to decrypt. Even if every server gets compromised, your data remains completely unreadable.
              </motion.p>
            </div>

            {/* Premium CTA section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col lg:flex-row gap-4 lg:gap-6 justify-center items-center mb-12 lg:mb-16"
            >
              <Link 
                href="/auth/signup" 
                className="group relative px-8 lg:px-10 py-4 lg:py-5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl font-semibold text-lg lg:text-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/25 w-full lg:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  <span>Protect My Files</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              </Link>
              
              <button className="group px-8 lg:px-10 py-4 lg:py-5 border border-gray-600 hover:border-amber-400/50 rounded-2xl font-semibold text-lg lg:text-xl backdrop-blur-sm transition-all duration-300 hover:bg-amber-500/5 w-full lg:w-auto">
                <span className="flex items-center justify-center space-x-3 text-gray-300 group-hover:text-amber-300">
                  <span>Watch Demo</span>
                  <Eye className="w-5 h-5" />
                </span>
              </button>
            </motion.div>

            {/* Enhanced trust indicators with better spacing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 max-w-5xl mx-auto"
            >
              {[
                { icon: CheckCircle, text: "Zero-knowledge architecture", subtext: "We never see your data" },
                { icon: CheckCircle, text: "Client-side encryption", subtext: "Keys never leave your device" },
                { icon: CheckCircle, text: "Works with any cloud", subtext: "Google Drive, Dropbox, OneDrive" }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm">
                  <item.icon className="w-6 h-6 text-emerald-400" />
                  <span className="text-high-contrast font-medium text-center">{item.text}</span>
                  <span className="text-medium-contrast text-sm text-center">{item.subtext}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pain Points Section - Sophisticated Problem Awareness */}
      <section className="relative z-10 px-6 lg:px-8 py-24 lg:py-32 overflow-hidden">
        {/* Sophisticated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/10 via-transparent to-orange-950/10" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-red-500/10 border border-red-400/20 rounded-full mb-8">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-red-300 font-medium text-sm tracking-wider uppercase">Critical Alert</span>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-light mb-8 leading-[0.9] tracking-tight">
              <span className="block text-gray-100">Your digital life is</span>
              <span className="block font-bold bg-gradient-to-r from-red-300 via-orange-300 to-red-200 bg-clip-text text-transparent relative">
                under attack
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-red-400/20 to-orange-400/20 blur-xl rounded-2xl"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>
              <span className="block text-gray-100">every single day</span>
            </h2>
            
            <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              Every minute, 1,800 people become victims of cybercrime. Your precious memories, sensitive documents, 
              and private information are sitting exposed in cloud storage, waiting for the next inevitable breach.
            </p>
          </motion.div>

          {/* Premium threat cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {painPoints.map((pain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
                className="group relative p-8 bg-readable-card border border-red-800/40 rounded-3xl backdrop-blur-xl overflow-hidden hover:border-red-600/50 transition-all duration-500"
              >
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                <div className="relative z-10">
                  <div className="mb-6 p-4 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl w-fit shadow-lg shadow-red-500/25">
                    {pain.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-red-200 group-hover:text-red-100 transition-colors">
                    {pain.title}
                  </h3>
                  <p className="text-readable mb-6 leading-relaxed text-lg">{pain.description}</p>
                  <div className="p-4 bg-red-500/15 border border-red-400/25 rounded-xl">
                    <div className="text-sm text-red-300 font-medium uppercase tracking-wide mb-1">The Consequence:</div>
                    <div className="text-red-200 font-semibold">{pain.consequence}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Premium solution callout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl blur-xl"></div>
            <div className="relative p-10 bg-gradient-to-br from-amber-600/10 to-orange-600/10 rounded-3xl border border-amber-500/25 backdrop-blur-xl text-center">
              <motion.div
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-6xl mb-6"
              >
                🛡️
              </motion.div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">
                  Sleep Peacefully While Hackers Fail
                </span>
              </h3>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                CipherIt transforms your files into unbreakable mathematical puzzles. Even if every cloud service 
                gets compromised tomorrow, your data remains completely unreadable to attackers.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                {["Zero-Knowledge", "Military-Grade", "Quantum-Resistant"].map((badge, i) => (
                  <div key={i} className="px-4 py-2 bg-amber-500/20 border border-amber-400/30 rounded-full">
                    <span className="text-amber-200 font-semibold text-sm">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid - Premium Agency Design */}
      <section id="features" className="relative z-10 px-6 lg:px-8 py-24 lg:py-32 overflow-hidden">
        {/* Sophisticated background system */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/5 via-transparent to-orange-950/5" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/5 w-80 h-80 bg-orange-400/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-500/10 border border-emerald-400/20 rounded-full mb-8">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-emerald-300 font-medium text-sm tracking-wider uppercase">Solution</span>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-light mb-8 leading-[0.9] tracking-tight">
              <span className="block text-gray-100">Stop worrying about</span>
              <span className="block font-bold bg-gradient-to-r from-amber-200 via-orange-200 to-yellow-200 bg-clip-text text-transparent relative">
                data breaches
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 to-orange-400/20 blur-xl rounded-2xl"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>
              <span className="block text-gray-100">forever</span>
            </h2>
            
            <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              Finally, a solution that puts you back in control. Your most precious files become completely 
              unreadable to hackers, corporations, and governments.
            </p>
          </motion.div>

          {/* Premium features grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.6, -0.05, 0.01, 0.99] }}
                className="group relative p-8 bg-readable-card hover:bg-opacity-100 rounded-3xl border border-white/15 hover:border-amber-500/40 transition-all duration-500 hover:transform hover:scale-[1.02] overflow-hidden"
              >
                {/* Premium shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                {/* Floating glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/10 group-hover:to-orange-500/10 rounded-3xl blur-xl transition-all duration-500"></div>
                
                <div className="relative z-10">
                  <motion.div 
                    className="mb-8 p-4 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl w-fit shadow-lg shadow-amber-500/25"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold mb-6 text-high-contrast group-hover:text-amber-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-readable mb-8 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                  
                  <div className="space-y-4">
                    {feature.benefits.map((benefit, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: (index * 0.15) + (i * 0.1) }}
                        className="flex items-start space-x-3 p-3 bg-white/10 rounded-xl border border-white/15 group-hover:border-amber-500/20 transition-colors duration-300"
                      >
                        <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-medium-contrast text-sm leading-relaxed">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Premium CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-20"
          >
            <div className="inline-flex items-center space-x-4 p-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl backdrop-blur-xl">
              <div className="text-4xl">⚡</div>
              <div className="text-left">
                <div className="text-amber-200 font-semibold text-lg">Ready in 60 seconds</div>
                <div className="text-gray-400 text-sm">No downloads, no complex setup</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Security Section - Premium Design */}
      <section id="security" className="relative z-10 px-6 lg:px-8 py-24 lg:py-32 overflow-hidden">
        {/* Sophisticated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/50 via-transparent to-stone-950/50" />
        <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-500/10 border border-emerald-400/20 rounded-full mb-8">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300 font-medium text-sm tracking-wider uppercase">Military Grade</span>
              </div>
              
              <h2 className="text-5xl lg:text-6xl font-light mb-8 leading-[0.9] tracking-tight">
                <span className="block font-bold bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent">Bulletproof</span>
                <span className="block text-gray-100">protection that</span>
                <span className="block text-gray-100">actually works</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                While others promise security, we deliver mathematical certainty. Your data becomes as secure 
                as the world's most classified secrets, but easier to use than Dropbox.
              </p>
              
              <div className="space-y-8">
                {securityFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="group flex items-start space-x-6 p-6 bg-readable-card rounded-2xl border border-white/15 hover:border-amber-500/30 transition-all duration-500"
                  >
                    <motion.div 
                      className="p-3 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-xl shadow-lg shadow-amber-500/25 flex-shrink-0"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {feature.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold mb-3 text-high-contrast group-hover:text-amber-300 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-readable leading-relaxed">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right visualization */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
              className="relative"
            >
              <div className="relative">
                {/* Main card */}
                <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-3xl p-10 backdrop-blur-xl border border-amber-500/20 shadow-2xl shadow-amber-500/10">
                  {/* Header */}
                  <div className="text-center mb-10">
                    <motion.div
                      animate={{ rotate: [0, 5, 0, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-500/25"
                    >
                      <Shield className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent mb-4">
                      Your Digital Fortress
                    </h3>
                    <p className="text-gray-300">See exactly how your protection works</p>
                  </div>

                  {/* Encryption steps */}
                  <div className="space-y-6">
                    {encryptionSteps.map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start space-x-4 p-4 bg-white/10 rounded-xl border border-white/15 hover:border-amber-500/30 transition-colors duration-300"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 shadow-md">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-bold text-amber-200 mb-1">{step.title}</h4>
                          <p className="text-sm text-medium-contrast leading-relaxed">{step.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Protection levels */}
                  <div className="mt-10 p-6 bg-gradient-to-r from-emerald-500/15 to-teal-500/15 border border-emerald-400/25 rounded-2xl">
                    <h4 className="font-bold text-emerald-200 mb-4 text-center">Protection Levels</h4>
                    <div className="space-y-3">
                      {protectionLevels.map((level, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                            <span className="text-sm text-medium-contrast">{level.feature}</span>
                          </div>
                          <div className="text-emerald-400 font-bold text-sm">{level.strength}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating decorative elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-amber-400/60 rounded-full blur-sm"
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -bottom-6 -left-6 w-6 h-6 bg-orange-400/60 rounded-full blur-sm"
                  animate={{
                    y: [0, 10, 0],
                    x: [0, 5, 0],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof - Premium Design */}
      <section className="relative z-10 px-6 lg:px-8 py-24 lg:py-32 overflow-hidden">
        {/* Sophisticated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/5 via-transparent to-blue-950/5" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-blue-400/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-500/10 border border-purple-400/20 rounded-full mb-8">
              <Star className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 font-medium text-sm tracking-wider uppercase">Testimonials</span>
            </div>
            
            <h2 className="text-5xl lg:text-6xl font-light mb-8 leading-[0.9] tracking-tight">
              <span className="block text-gray-100">Trusted by</span>
              <span className="block font-bold bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">people like you</span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-16 leading-relaxed">
              Real families and professionals who finally found peace of mind in our digital age
            </p>
            
            {/* Premium testimonials grid */}
            <div className="grid lg:grid-cols-3 gap-8 mb-20">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2, ease: [0.6, -0.05, 0.01, 0.99] }}
                  className="group relative p-8 bg-readable-card hover:bg-opacity-100 rounded-3xl border border-white/15 hover:border-purple-500/30 transition-all duration-500 overflow-hidden"
                >
                  {/* Premium shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  
                  <div className="relative z-10">
                    {/* Star rating */}
                    <div className="flex justify-center mb-6">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.2 + i * 0.1 }}
                        >
                          <Star className="w-5 h-5 text-amber-400 fill-current mx-0.5" />
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Quote */}
                    <blockquote className="text-readable mb-8 italic text-lg leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    {/* Profile */}
                    <div className="flex items-center justify-center space-x-4">
                      <motion.div 
                        className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-amber-500/25"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {testimonial.name[0]}
                      </motion.div>
                      <div className="text-left">
                        <div className="font-bold text-high-contrast text-lg">{testimonial.name}</div>
                        <div className="text-medium-contrast text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Premium stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            >
              {[
                { number: "50,000+", label: "Families Protected", icon: "👨‍👩‍👧‍👦" },
                { number: "2M+", label: "Files Secured", icon: "🛡️" },
                { number: "Zero", label: "Data Breaches", icon: "🔒" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center p-6 bg-readable-card rounded-2xl border border-white/15 hover:border-amber-500/30 transition-all duration-300"
                >
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-200 to-orange-200 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-medium-contrast font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Premium Value Proposition Section - Enhanced */}
      <section className="relative z-10 px-6 lg:px-8 py-24 lg:py-32 overflow-hidden">
        {/* Sophisticated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/10 via-transparent to-teal-950/10" />
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-emerald-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-teal-400/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-500/10 border border-emerald-400/20 rounded-full mb-8">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-300 font-medium text-sm tracking-wider uppercase">The CipherIt Difference</span>
              </div>
              
              <h2 className="text-5xl lg:text-6xl font-light mb-8 leading-[0.9] tracking-tight">
                <span className="block text-gray-100">From</span>
                <span className="block font-bold text-red-300">vulnerable</span>
                <span className="block text-gray-100">to</span>
                <span className="block font-bold bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent">unhackable</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                While others store your data on their servers (where hackers can steal it), we transform your files 
                into unbreakable codes that only you possess the key to unlock.
              </p>
              
              <div className="space-y-6">
                {beforeAfter.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="group flex items-start space-x-6 p-6 bg-readable-card rounded-2xl border border-white/15 hover:border-emerald-500/30 transition-all duration-500"
                  >
                    <motion.div
                      className="flex-shrink-0 p-2 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-xl"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <div className="font-bold text-emerald-200 text-lg mb-2 group-hover:text-emerald-100 transition-colors">
                        ✓ {item.after}
                      </div>
                      <div className="text-medium-contrast">
                        <span className="line-through text-red-400">✗ {item.before}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
              className="relative"
            >
              <div className="relative">
                {/* Main fortress card */}
                <div className="relative bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-3xl p-10 backdrop-blur-xl border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
                  <div className="absolute -top-6 -right-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-emerald-500/25">
                    💎 Premium Protection
                  </div>
                  
                  <div className="text-center mb-10">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/25"
                    >
                      <Shield className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent mb-4">
                      Your Digital Fortress
                    </h3>
                    <p className="text-gray-300">See exactly how your protection works</p>
                  </div>

                  <div className="space-y-4">
                    {protectionLevels.map((level, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/15 hover:border-emerald-500/30 transition-colors duration-300"
                      >
                        <div className="flex items-center space-x-3">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                            className="w-4 h-4 bg-emerald-400 rounded-full"
                          />
                          <span className="text-medium-contrast font-medium">{level.feature}</span>
                        </div>
                        <div className="text-emerald-400 font-bold">{level.strength}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Trust badges */}
                  <div className="mt-10 grid grid-cols-3 gap-4">
                    {["Zero-Knowledge", "Open Source", "Quantum-Safe"].map((badge, i) => (
                      <div key={i} className="text-center p-3 bg-emerald-500/10 rounded-xl border border-emerald-400/20">
                        <div className="text-2xl mb-1">
                          {i === 0 ? "🔐" : i === 1 ? "⚡" : "🚀"}
                        </div>
                        <div className="text-emerald-200 font-semibold text-xs">{badge}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating security elements */}
                <motion.div
                  className="absolute -top-4 -left-4 w-8 h-8 bg-emerald-400/60 rounded-full blur-sm"
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute -bottom-6 -right-6 w-6 h-6 bg-teal-400/60 rounded-full blur-sm"
                  animate={{
                    y: [0, 15, 0],
                    x: [0, -5, 0],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="relative z-10 px-6 lg:px-8 py-24 lg:py-32 overflow-hidden">
        {/* Sophisticated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-orange-600/5 to-amber-600/10" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl" />
        
        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            {/* Premium urgency indicator */}
            <div className="inline-flex items-center space-x-3 px-6 py-3 bg-red-500/10 border border-red-400/20 rounded-full mb-8">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-3 h-3 bg-red-400 rounded-full"
              />
              <span className="text-red-300 font-medium tracking-wide">⚠️ Every minute delayed = higher risk</span>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-light mb-8 leading-[0.9] tracking-tight">
              <span className="block text-gray-100">Protect everything</span>
              <span className="block font-bold bg-gradient-to-r from-amber-200 via-orange-200 to-yellow-200 bg-clip-text text-transparent relative">
                that matters
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 to-orange-400/20 blur-xl rounded-2xl"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </span>
              <span className="block text-gray-100">to you</span>
            </h2>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
              Join over 50,000 families who sleep better knowing their precious memories and important documents 
              are truly safe. Start protecting your digital life in under 60 seconds.
            </p>
            
            {/* Premium CTA buttons */}
            <div className="flex flex-col lg:flex-row gap-6 justify-center mb-16">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link 
                  href="/auth/signup" 
                  className="group relative px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl font-bold text-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/25 w-full lg:w-auto block"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    <span>Protect My Files Now</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-600 blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </Link>
              </motion.div>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="group px-10 py-5 border-2 border-gray-600 hover:border-amber-400/50 rounded-2xl font-bold text-xl backdrop-blur-sm transition-all duration-300 hover:bg-amber-500/5 w-full lg:w-auto"
              >
                <span className="flex items-center justify-center space-x-3 text-gray-300 group-hover:text-amber-300">
                  <span>See How It Works</span>
                  <Eye className="w-6 h-6" />
                </span>
              </motion.button>
            </div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap justify-center items-center gap-8 text-gray-400"
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="font-medium">30-day money back guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="font-medium">No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="font-medium">Cancel anytime</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="relative z-10 px-6 lg:px-8 py-16 border-t border-stone-800/50 overflow-hidden">
        {/* Subtle background effects */}
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-amber-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-orange-400/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-4 gap-12 mb-12">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center space-x-4 mb-6"
              >
                <div className="relative">
                  <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg shadow-amber-500/25">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl blur opacity-30"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent tracking-tight">
                    CipherIt
                  </span>
                  <span className="text-sm text-amber-400/70 font-medium tracking-wider uppercase">PROTECTION</span>
                </div>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-gray-300 text-lg leading-relaxed mb-6 max-w-lg"
              >
                Your data, your security, your control. Making unbreakable encryption accessible to everyone, 
                one file at a time.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex space-x-4"
              >
                {["🔒", "🛡️", "⚡"].map((icon, i) => (
                  <div key={i} className="w-12 h-12 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-xl">
                    {icon}
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Links sections */}
            <div>
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-white font-bold text-lg mb-6"
              >
                Product
              </motion.h4>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-4"
              >
                {['Features', 'Security', 'Pricing', 'Enterprise'].map((item) => (
                  <a key={item} href="#" className="block text-gray-400 hover:text-amber-400 transition-colors duration-300 text-lg">
                    {item}
                  </a>
                ))}
              </motion.div>
            </div>
            
            <div>
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-white font-bold text-lg mb-6"
              >
                Support
              </motion.h4>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-4"
              >
                {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((item) => (
                  <a key={item} href="#" className="block text-gray-400 hover:text-amber-400 transition-colors duration-300 text-lg">
                    {item}
                  </a>
                ))}
              </motion.div>
            </div>
          </div>
          
          {/* Bottom section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="pt-8 border-t border-stone-800/50 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0"
          >
            <div className="text-gray-400 text-lg">
              <p>&copy; 2024 CipherIt. All rights reserved.</p>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-emerald-400">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="font-medium">All systems operational</span>
              </div>
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
                <span className="ml-2 text-gray-400 text-sm">5.0 on Trustpilot</span>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: <Lock className="w-8 h-8 text-amber-400" />,
    title: "Your Secrets Stay Secret Forever",
    description: "Even if hackers break into Google Drive or Dropbox, your files remain completely unreadable. Your encryption key never leaves your device.",
    benefits: ["Identity theft becomes impossible", "Family photos stay truly private", "Financial documents remain secure", "Works instantly in your browser"]
  },
  {
    icon: <Cloud className="w-8 h-8 text-orange-400" />,
    title: "Use Any Cloud Service You Want",
    description: "Don't get trapped by one company. Keep using Google Drive, Dropbox, OneDrive, or any storage service while staying completely protected.",
    benefits: ["No more vendor lock-in fears", "Keep your existing cloud accounts", "Switch services anytime", "Save money on premium plans"]
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-400" />,
    title: "Set It and Forget It",
    description: "Our AI chooses the perfect security level for each file automatically. You get maximum protection without thinking about complex settings.",
    benefits: ["No technical knowledge required", "Optimized for your specific files", "One-click protection", "Peace of mind guaranteed"]
  },
  {
    icon: <Smartphone className="w-8 h-8 text-emerald-400" />,
    title: "Access Your Files From Anywhere",
    description: "Vacation photos, work documents, personal records - securely access everything from any device without installing software.",
    benefits: ["Never lose access to important files", "Work from anywhere confidently", "Share securely with family", "No apps to install or update"]
  },
  {
    icon: <Users className="w-8 h-8 text-rose-400" />,
    title: "Get Expert Help When You Need It",
    description: "Our AI assistant guides you through best practices and answers security questions, so you always make the right choices.",
    benefits: ["Never make security mistakes", "Learn as you go", "Instant expert advice", "Build confidence over time"]
  },
  {
    icon: <Database className="w-8 h-8 text-slate-400" />,
    title: "Find Your Files Instantly",
    description: "Organize thousands of encrypted files effortlessly. Our smart search finds what you need without compromising security.",
    benefits: ["Save hours searching for files", "Keep everything organized automatically", "Never lose important documents", "Work more efficiently"]
  }
];

const securityFeatures = [
  {
    icon: <Shield className="w-6 h-6 text-amber-400" />,
    title: "Even We Can't Spy On You",
    description: "Your encryption keys live only on your devices. Even if governments demand access, we literally cannot provide your data."
  },
  {
    icon: <Lock className="w-6 h-6 text-orange-400" />,
    title: "Stronger Than Fort Knox",
    description: "The same mathematics protecting nuclear secrets now protects your vacation photos. Each file gets its own unbreakable lock."
  },
  {
    icon: <Globe className="w-6 h-6 text-emerald-400" />,
    title: "Verified By Security Experts",
    description: "Our protection methods are open source and constantly tested by the world's best security researchers."
  }
];

const encryptionSteps = [
  { title: "Drop Your File", description: "Drag any file into your browser" },
  { title: "We Choose Protection", description: "AI picks the strongest security for your file type" },
  { title: "Instant Lock Down", description: "File becomes unreadable in seconds" },
  { title: "Store Anywhere", description: "Upload to any cloud service safely" },
  { title: "Access Securely", description: "Only you can unlock and view your files" }
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Mother of Two",
    quote: "After the Equifax breach, I was terrified of storing anything online. CipherIt gave me my peace of mind back. My kids' photos and our financial docs are finally safe."
  },
  {
    name: "Michael Rodriguez",
    role: "Small Business Owner",
    quote: "I used to lose sleep worrying about client data. Now I know that even if our cloud gets hacked, our customer information stays completely protected."
  },
  {
    name: "Dr. Emily Watson",
    role: "Healthcare Professional",
    quote: "Patient confidentiality is everything in my field. CipherIt ensures that sensitive medical records remain truly private, no matter what happens."
  }
];

const painPoints = [
  {
    icon: <Users className="w-8 h-8 text-red-400" />,
    title: "Identity Theft Anxiety",
    description: "Your SSN, bank statements, and tax documents sit unprotected in cloud storage, vulnerable to the next data breach.",
    consequence: "One breach = years of credit monitoring and financial stress"
  },
  {
    icon: <Smartphone className="w-8 h-8 text-red-400" />,
    title: "Family Privacy Invasion",
    description: "Private photos, videos, and personal messages could be exposed, blackmailed, or sold on the dark web.",
    consequence: "Your most intimate moments become public nightmare"
  },
  {
    icon: <Database className="w-8 h-8 text-red-400" />,
    title: "Business Secrets Exposed",
    description: "Client lists, financial records, and proprietary documents are sitting ducks for corporate espionage.",
    consequence: "Competitors steal your customers and destroy your business"
  }
];

const beforeAfter = [
  {
    icon: <CheckCircle className="w-6 h-6 text-green-400" />,
    before: "Your files readable by hackers",
    after: "Files become unbreakable mathematical puzzles"
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-green-400" />,
    before: "One breach exposes everything",
    after: "Even total server compromise protects you"
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-green-400" />,
    before: "Trust cloud companies with secrets",
    after: "You control access to every single file"
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-green-400" />,
    before: "Complex security software",
    after: "One-click protection in your browser"
  }
];

const protectionLevels = [
  { feature: "Encryption Strength", strength: "Military Grade" },
  { feature: "Key Security", strength: "Device Only" },
  { feature: "Server Knowledge", strength: "Zero Access" },
  { feature: "Breach Protection", strength: "Unbreakable" },
  { feature: "Privacy Level", strength: "Absolute" }
];
