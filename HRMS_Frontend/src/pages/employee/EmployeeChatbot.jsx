import React, { useState } from 'react';
import Card from '../../components/Card';
import { Icon } from '../../components/Icon';

export default function EmployeeChatbot() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    const newMessages = [...messages, { from: 'user', text: userMessage }];
    
    // Simulate bot response based on user input
    let botResponse = '';
    const lowerInput = userMessage.toLowerCase();
    
    if (lowerInput.includes('leave') || lowerInput.includes('vacation')) {
      botResponse = 'I can help you with leave requests! You can apply for leave using the form on your dashboard. What type of leave are you looking for?';
    } else if (lowerInput.includes('policy') || lowerInput.includes('policies')) {
      botResponse = 'You can find all company policies in the Document Library section. Is there a specific policy you\'re looking for?';
    } else if (lowerInput.includes('payroll') || lowerInput.includes('salary')) {
      botResponse = 'For payroll inquiries, please check the Payroll section in your dashboard or contact HR directly.';
    } else if (lowerInput.includes('help') || lowerInput.includes('support')) {
      botResponse = 'I\'m here to help! You can ask me about leave policies, company procedures, or general HR questions.';
    } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      botResponse = 'Hello! How can I assist you today? I can help with leave requests, policies, payroll questions, and more.';
    } else {
      botResponse = `I understand you're asking about "${userMessage}". For specific inquiries, please contact HR or check the relevant section in your dashboard.`;
    }
    
    setMessages([...newMessages, { from: 'bot', text: botResponse }]);
    setInput('');
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">HR Chatbot</h2>
      <div className="h-64 overflow-y-auto mb-4 space-y-2 p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-3 py-2 rounded-lg ${m.from === 'user' ? 'bg-indigo-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100'}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input 
          type="text" 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          placeholder="Type your message..." 
          className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg focus:outline-none"
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
          <Icon as="Send" size={16} />
        </button>
      </div>
    </Card>
  );
}
