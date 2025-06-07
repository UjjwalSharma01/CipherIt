'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Lock, Cloud, Zap, Users, Star, ArrowRight, CheckCircle, Globe, Smartphone, Database, Eye } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: 'all 0.1s ease-out'
          }}
        />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='20' cy='20' r='20'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '40px 40px'
          }} />
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              CipherIt
            </span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex space-x-8"
          >
            <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
            <a href="#security" className="hover:text-purple-400 transition-colors">Security</a>
            <a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex space-x-4"
          >
            <Link href="/auth/login" className="px-4 py-2 text-purple-400 hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/auth/signup" className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105">
              Get Started
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Your Data's
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent block">
                Ultimate Shield
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Military-grade encryption meets effortless simplicity. Secure your files locally, 
              store them anywhere, and access them anytime with zero-knowledge architecture.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/auth/signup" className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105 flex items-center space-x-2">
                <span>Start Encrypting Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 border border-gray-600 rounded-lg text-lg font-semibold hover:border-purple-500 hover:text-purple-400 transition-all flex items-center space-x-2">
                <span>Watch Demo</span>
                <Eye className="w-5 h-5" />
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Zero Server Storage</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Client-Side Only</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Military Grade Encryption</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why <span className="text-purple-400">CipherIt</span> is Different
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We don't just encrypt your files - we revolutionize how you think about data security
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-gray-800 hover:border-purple-500/50 transition-all hover:bg-white/10"
              >
                <div className="mb-6 p-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-purple-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 mb-6">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center space-x-2 text-sm text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="relative z-10 px-6 py-20 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-purple-400">Bank-Level</span> Security
                <br />Made Simple
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Your encryption key never leaves your device. Even we can't access your data. 
                That's true zero-knowledge security.
              </p>
              
              <div className="space-y-6">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl p-8 backdrop-blur-lg border border-gray-800">
                <div className="text-center mb-8">
                  <Shield className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold">Encryption Process</h3>
                </div>
                
                <div className="space-y-6">
                  {encryptionSteps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold">{step.title}</h4>
                        <p className="text-sm text-gray-400">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-12">Trusted by Security Professionals</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="p-6 bg-white/5 rounded-2xl border border-gray-800">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center space-x-12 opacity-60">
              <div className="text-2xl font-bold">10,000+</div>
              <div className="text-2xl font-bold">Files Secured</div>
              <div className="text-2xl font-bold">Zero Breaches</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-r from-purple-600/20 to-blue-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Secure Your Digital Life?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of users who trust CipherIt with their most sensitive data.
              Start encrypting in under 60 seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup" className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all transform hover:scale-105">
                Start Free Trial
              </Link>
              <button className="px-8 py-4 border border-gray-600 rounded-lg text-lg font-semibold hover:border-purple-500 hover:text-purple-400 transition-all">
                Schedule Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                CipherIt
              </span>
            </div>
            
            <div className="flex space-x-8 text-gray-400">
              <a href="#" className="hover:text-purple-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Support</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 CipherIt. Your data, your security, your control.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: <Lock className="w-8 h-8 text-purple-400" />,
    title: "Client-Side Encryption",
    description: "Your files are encrypted directly in your browser. We never see your data or encryption keys.",
    benefits: ["Zero-knowledge architecture", "Military-grade AES-256", "Multiple algorithms supported", "Instant encryption"]
  },
  {
    icon: <Cloud className="w-8 h-8 text-blue-400" />,
    title: "Universal Cloud Storage",
    description: "Store encrypted files on Google Drive, Dropbox, or any cloud service. Your choice, your control.",
    benefits: ["Works with any cloud provider", "Seamless sync across devices", "No vendor lock-in", "Unlimited storage options"]
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-400" />,
    title: "Smart Algorithm Selection",
    description: "AI-powered recommendations choose the best encryption method based on your file type and size.",
    benefits: ["Optimized performance", "Intelligent recommendations", "Custom algorithm settings", "Real-time analysis"]
  },
  {
    icon: <Smartphone className="w-8 h-8 text-green-400" />,
    title: "Cross-Platform Access",
    description: "Access your encrypted files from any device, anywhere. Web, mobile, desktop - it all works.",
    benefits: ["Universal compatibility", "No software installation", "Responsive design", "Offline capability"]
  },
  {
    icon: <Users className="w-8 h-8 text-pink-400" />,
    title: "AI Assistant",
    description: "Built-in chatbot helps you with encryption best practices and troubleshooting.",
    benefits: ["24/7 AI support", "Security guidance", "Troubleshooting help", "Best practice tips"]
  },
  {
    icon: <Database className="w-8 h-8 text-indigo-400" />,
    title: "Secure File Management",
    description: "Organize, search, and manage your encrypted files with our intuitive interface.",
    benefits: ["Smart organization", "Advanced search", "Batch operations", "Version control"]
  }
];

const securityFeatures = [
  {
    icon: <Shield className="w-6 h-6 text-purple-400" />,
    title: "Zero-Knowledge Architecture",
    description: "Your encryption keys never leave your device. Even our servers can't decrypt your files."
  },
  {
    icon: <Lock className="w-6 h-6 text-blue-400" />,
    title: "Multiple Encryption Standards",
    description: "Choose from AES-256, RSA, ChaCha20, and more. Each optimized for different use cases."
  },
  {
    icon: <Globe className="w-6 h-6 text-green-400" />,
    title: "Open Source Transparency",
    description: "Our encryption algorithms are open source and audited by security researchers worldwide."
  }
];

const encryptionSteps = [
  { title: "Select File", description: "Choose any file from your device" },
  { title: "AI Analysis", description: "Smart algorithm recommendation" },
  { title: "Local Encryption", description: "File encrypted in your browser" },
  { title: "Cloud Upload", description: "Encrypted file stored securely" },
  { title: "Access Anywhere", description: "Download and decrypt when needed" }
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Security Engineer",
    quote: "Finally, a tool that puts security first without sacrificing usability. The client-side encryption gives me complete peace of mind."
  },
  {
    name: "Michael Rodriguez",
    role: "Data Privacy Consultant",
    quote: "I've recommended CipherIt to all my clients. The zero-knowledge architecture is exactly what we need in today's threat landscape."
  },
  {
    name: "Dr. Emily Watson",
    role: "Cybersecurity Researcher",
    quote: "The most user-friendly encryption tool I've ever used. Perfect balance of security and simplicity."
  }
];
