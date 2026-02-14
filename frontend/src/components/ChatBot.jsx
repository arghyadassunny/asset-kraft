import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { chatbotResponses } from '../data/mock';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: chatbotResponses.greeting,
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('service') || message.includes('offer')) {
      return chatbotResponses.services;
    } else if (message.includes('contact') || message.includes('reach') || message.includes('call')) {
      return chatbotResponses.contact;
    } else if (message.includes('sip') || message.includes('mutual fund') || message.includes('invest')) {
      return chatbotResponses.sip;
    } else if (message.includes('team') || message.includes('who')) {
      return chatbotResponses.team;
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return chatbotResponses.greeting;
    } else {
      return chatbotResponses.default;
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing and response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickActions = [
    { label: 'Our Services', value: 'Tell me about your services' },
    { label: 'SIP Info', value: 'What is SIP?' },
    { label: 'Contact', value: 'How can I contact you?' }
  ];

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-teal-600 to-teal-700 text-white p-4 rounded-full shadow-2xl hover:shadow-teal-600/50 transition-all duration-300 hover:scale-110 animate-bounce-slow"
        >
          <MessageCircle size={28} />
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-slate-900 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
            AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-full p-2 backdrop-blur-sm">
                <Bot size={24} />
              </div>
              <div>
                <div className="font-bold">AssetKraft AI Assistant</div>
                <div className="text-xs text-teal-100">Always here to help</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 h-96 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    message.isBot
                      ? 'bg-white text-slate-800 shadow-sm border border-slate-200'
                      : 'bg-teal-600 text-white'
                  }`}
                >
                  {message.isBot && (
                    <div className="flex items-center gap-2 mb-1">
                      <Bot size={14} className="text-teal-600" />
                      <span className="text-xs font-semibold text-teal-600">AI Assistant</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-200">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length === 1 && (
            <div className="p-4 bg-white border-t border-slate-200">
              <div className="text-xs text-slate-600 mb-2">Quick Actions:</div>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputMessage(action.value);
                      handleSendMessage();
                    }}
                    className="text-xs bg-teal-50 text-teal-700 px-3 py-1.5 rounded-full hover:bg-teal-100 transition-colors border border-teal-200"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-200">
            <div className="flex gap-2">
              <Input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
