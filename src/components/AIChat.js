'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Shield,
  Lock,
  FileText,
  HelpCircle,
  Zap,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Loader
} from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function AIChat({ onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "👋 Hi! I'm your CipherIt AI assistant powered by Gemini 2.0 Flash. I can help you with:\n\n• **File encryption** best practices\n• **Algorithm selection** guidance\n• **Security questions** and concerns\n• **Troubleshooting** encryption issues\n• **General help** with the platform\n\nWhat would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize Gemini AI
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickResponses = [
    "What's the best encryption algorithm?",
    "How secure is my data?",
    "Help with password strength",
    "File size limits",
    "Backup and recovery",
    "How does zero-knowledge work?"
  ];

  const getAIResponse = async (userMessage) => {
    try {
      // Create a context-aware prompt for CipherIt
      const systemPrompt = `You are a helpful AI assistant for CipherIt, a client-side file encryption application. You help users with:

- File encryption best practices and algorithm selection
- Security questions and privacy concerns  
- Password strength and management
- Troubleshooting encryption/decryption issues
- General platform guidance

Key CipherIt features:
- Zero-knowledge architecture (client-side encryption only)
- Supports multiple algorithms: AES-256-GCM, AES-192-CBC, AES-128-CTR, Triple DES, Rabbit, RC4
- File size limit: 100MB per file, 15GB total storage
- Google Drive integration for encrypted file storage
- Smart algorithm recommendations based on file type/size

Always be helpful, concise, and security-focused. Use emojis and formatting to make responses engaging.

User question: ${userMessage}`;

      const result = await model.generateContent(systemPrompt);
      const response = await result.response;
      const text = response.text();
      
      return text;
    } catch (error) {
      console.error('Gemini AI Error:', error);
      
      // Fallback responses for common questions
      const lowercaseMessage = userMessage.toLowerCase();
      
      if (lowercaseMessage.includes('algorithm') || lowercaseMessage.includes('encryption')) {
        return "🔐 **Algorithm Recommendations:**\n\n• **AES-256-GCM** - Best for sensitive documents and large files\n• **AES-192-CBC** - Good balance of speed and security\n• **AES-128-CTR** - Fastest for small files\n• **Triple DES** - Legacy support\n• **Rabbit** - Very fast encryption\n• **RC4** - Lightweight option\n\nI automatically recommend the best algorithm based on your file type and size! 🚀";
      }
      
      if (lowercaseMessage.includes('secure') || lowercaseMessage.includes('safe')) {
        return "🛡️ **Your Security is Our Priority:**\n\n✅ Zero-knowledge architecture - We never see your data\n✅ Client-side encryption - Everything happens in your browser\n✅ Military-grade encryption standards\n✅ Secure key derivation with salt\n✅ No server storage of unencrypted data\n\n**Remember:** Your encryption password is the key to your data!";
      }
      
      return "🤖 I'm experiencing some connectivity issues right now. Here are some common topics I can help with:\n\n🔐 Encryption algorithms and recommendations\n🛡️ Security and privacy questions\n🔑 Password strength and management\n📁 File upload and storage limits\n⚡ Performance optimization\n\nPlease try asking your question again, or check the help documentation!";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Get AI response
    const response = await getAIResponse(inputMessage);
    
    const botMessage = {
      id: Date.now() + 1,
      type: 'bot',
      content: response,
      timestamp: new Date()
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botMessage]);
  };

  const handleQuickResponse = (response) => {
    setInputMessage(response);
    inputRef.current?.focus();
  };

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content);
  };

  const formatMessage = (content) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed right-4 bottom-4 top-4 w-96 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl z-40 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-semibold">AI Assistant</h3>
            <p className="text-white/60 text-xs">Always here to help</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.type === 'bot' && (
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-3 h-3 text-white" />
              </div>
            )}
            
            <div className={`max-w-[80%] ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white'} rounded-2xl p-3 group`}>
              <div 
                className="text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
              />
              
              {message.type === 'bot' && (
                <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => copyMessage(message.content)}
                    className="p-1 text-white/50 hover:text-white/80 transition-colors"
                    title="Copy message"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  <button className="p-1 text-white/50 hover:text-green-400 transition-colors" title="Helpful">
                    <ThumbsUp className="w-3 h-3" />
                  </button>
                  <button className="p-1 text-white/50 hover:text-red-400 transition-colors" title="Not helpful">
                    <ThumbsDown className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {message.type === 'user' && (
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-3 h-3 text-white" />
              </div>
            )}
          </motion.div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3"
          >
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Bot className="w-3 h-3 text-white" />
            </div>
            <div className="bg-white/10 rounded-2xl p-3">
              <div className="flex items-center gap-2">
                <Loader className="w-3 h-3 text-white/60 animate-spin" />
                <span className="text-white/70 text-xs">Gemini AI is thinking...</span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Responses */}
      {messages.length === 1 && (
        <div className="p-4 border-t border-white/10">
          <p className="text-white/70 text-xs mb-3">Quick questions:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickResponses.map((response, index) => (
              <button
                key={index}
                onClick={() => handleQuickResponse(response)}
                className="text-left p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/80 text-xs transition-colors"
              >
                {response}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-white/20">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything about encryption..."
            className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
