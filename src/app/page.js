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
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-stone-900 to-neutral-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
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
            <div className="p-2 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              CipherIt
            </span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex space-x-8"
          >
            <a href="#features" className="hover:text-amber-400 transition-colors">Features</a>
            <a href="#security" className="hover:text-amber-400 transition-colors">Security</a>
            <a href="#pricing" className="hover:text-amber-400 transition-colors">Pricing</a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex space-x-4"
          >
            <Link href="/auth/login" className="px-4 py-2 text-amber-400 hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/auth/signup" className="px-6 py-2 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105">
              Get Started
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 px-6 py-20 min-h-screen flex items-center">
        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-amber-500/15 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-orange-500/15 rounded-full blur-xl animate-float animation-delay-2000"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-yellow-500/15 rounded-full blur-xl animate-float animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/25 rounded-full mb-8 glass"
            >
              <Star className="w-5 h-5 text-amber-400 fill-current" />
              <span className="text-amber-300 font-semibold">Trusted by 50,000+ Families</span>
              <Star className="w-5 h-5 text-amber-400 fill-current" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Sleep Peacefully While
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent block shimmer-text">
                Hackers Fail
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Protect your family photos, financial documents, and personal files from identity thieves 
              and data breaches. Even if your cloud gets hacked, your data stays completely unreadable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/auth/signup" className="group premium-button px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg text-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105 flex items-center space-x-2">
                <span>Protect My Files Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="premium-button px-8 py-4 glass-dark rounded-lg text-lg font-semibold hover:border-amber-500 hover:text-amber-400 transition-all flex items-center space-x-2">
                <span>See It In Action</span>
                <Eye className="w-5 h-5" />
              </button>
            </div>

            {/* Enhanced Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center items-center gap-8 text-gray-400"
            >
              <div className="flex items-center space-x-2 glass px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Your Keys Never Leave Your Device</span>
              </div>
              <div className="flex items-center space-x-2 glass px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Even We Can't Read Your Files</span>
              </div>
              <div className="flex items-center space-x-2 glass px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Works With Your Existing Cloud</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pain Points Section - New Premium Addition */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-r from-red-950/20 to-orange-950/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Are You <span className="text-red-400">Losing Sleep</span> Over These Fears?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Every day, millions of personal files get exposed in data breaches. Your most private moments, financial records, and family memories are sitting ducks in unprotected cloud storage.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {painPoints.map((pain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 bg-red-950/30 border border-red-800/30 rounded-2xl backdrop-blur-lg"
              >
                <div className="mb-4 p-3 bg-red-500/20 rounded-lg w-fit">
                  {pain.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-red-300">{pain.title}</h3>
                <p className="text-gray-300 mb-4">{pain.description}</p>
                <div className="text-sm text-red-400 font-semibold">{pain.consequence}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center"
          >
            <div className="p-8 bg-gradient-to-r from-amber-600/15 to-orange-600/15 rounded-3xl border border-amber-500/25 backdrop-blur-lg">
              <h3 className="text-2xl font-bold mb-4 text-amber-300">
                🛡️ These Nightmares End Today
              </h3>
              <p className="text-lg text-gray-300">
                CipherIt makes your files mathematically impossible to read, even if every cloud service gets hacked tomorrow.
              </p>
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
              Stop Worrying About <span className="text-amber-400">Data Breaches</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Finally, a solution that puts you back in control. Your most precious files become completely unreadable to hackers, corporations, and governments.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-8 glass hover:glass-dark rounded-2xl luxury-border hover:border-amber-500/50 transition-all hover:transform hover:scale-105 relative overflow-hidden"
              >
                {/* Premium shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                <div className="relative z-10">
                  <div className="mb-6 p-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg w-fit animate-glow">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-amber-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.benefits.map((benefit, i) => (
                      <motion.li 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: (index * 0.1) + (i * 0.05) }}
                        className="flex items-center space-x-3 text-sm text-gray-400"
                      >
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
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
                <span className="text-amber-400">Bulletproof</span> Protection
                <br />That Actually Works
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                While others promise security, we deliver mathematical certainty. Your data becomes as secure as the world's most classified secrets, but easier to use than Dropbox.
              </p>
              
              <div className="space-y-6">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="p-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg">
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
              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-3xl p-8 backdrop-blur-lg border border-stone-800">
                <div className="text-center mb-8">
                  <Shield className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold">Encryption Process</h3>
                </div>
                
                <div className="space-y-6">
                  {encryptionSteps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold">
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
            <h2 className="text-4xl font-bold mb-12">Trusted by People Like You</h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="p-6 bg-stone-900/50 rounded-2xl border border-stone-800">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
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
              <div className="text-center">
                <div className="text-2xl font-bold">50,000+</div>
                <div className="text-sm text-gray-400">Families Protected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">2M+</div>
                <div className="text-sm text-gray-400">Files Secured</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Zero</div>
                <div className="text-sm text-gray-400">Data Breaches</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Value Proposition Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6">
                <span className="px-4 py-2 bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-amber-500/25 rounded-full text-amber-300 text-sm font-semibold">
                  ✨ The CipherIt Difference
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                From <span className="text-red-400">Vulnerable</span> to
                <br />
                <span className="text-green-400">Virtually Unhackable</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                While others store your data on their servers (where hackers can steal it), we transform your files into unbreakable codes that only you possess the key to unlock.
              </p>
              
              <div className="space-y-4">
                {beforeAfter.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-stone-800"
                  >
                    <div className="flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-green-400">{item.after}</div>
                      <div className="text-sm text-gray-400">Instead of: <span className="text-red-400">{item.before}</span></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-amber-500/8 to-orange-500/8 rounded-3xl p-8 backdrop-blur-lg border border-stone-800">
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold">
                  💎 Premium Protection
                </div>
                
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Your Digital Fortress</h3>
                  <p className="text-gray-300">See exactly how your protection works</p>
                </div>

                <div className="space-y-4">
                  {protectionLevels.map((level, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <span className="text-sm">{level.feature}</span>
                      </div>
                      <div className="text-green-400 font-bold text-sm">{level.strength}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-r from-amber-600/15 to-orange-600/15">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Protect Everything That Matters to You
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join over 50,000 families who sleep better knowing their precious memories and important documents are truly safe. Start protecting your digital life in under 60 seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup" className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg text-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-105">
                Protect My Files Now
              </Link>
              <button className="px-8 py-4 border border-stone-600 rounded-lg text-lg font-semibold hover:border-amber-500 hover:text-amber-400 transition-all">
                See How It Works
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-stone-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="p-2 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                CipherIt
              </span>
            </div>
            
            <div className="flex space-x-8 text-gray-400">
              <a href="#" className="hover:text-amber-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Terms</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Support</a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-stone-800 text-center text-gray-400">
            <p>&copy; 2024 CipherIt. Your data, your security, your control.</p>
          </div>
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
