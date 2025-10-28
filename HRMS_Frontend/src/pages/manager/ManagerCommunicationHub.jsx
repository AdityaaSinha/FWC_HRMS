import React, { useState } from 'react';
import { 
  MessageSquare, Send, Bell, Megaphone, Users, Search, 
  Filter, Plus, MoreVertical, Pin, Archive, Star, 
  Clock, CheckCircle, AlertCircle, Info, Video, Phone 
} from 'lucide-react';

const ManagerCommunicationHub = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      name: 'Development Team',
      type: 'group',
      lastMessage: 'The new feature is ready for testing',
      timestamp: '2 min ago',
      unread: 3,
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150',
      online: true,
      participants: 8
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      type: 'direct',
      lastMessage: 'Can we schedule a meeting for tomorrow?',
      timestamp: '15 min ago',
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      online: true
    },
    {
      id: 3,
      name: 'Project Alpha Team',
      type: 'group',
      lastMessage: 'Budget approval received',
      timestamp: '1 hour ago',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150',
      online: false,
      participants: 12
    },
    {
      id: 4,
      name: 'Mike Chen',
      type: 'direct',
      lastMessage: 'Thanks for the feedback on the proposal',
      timestamp: '3 hours ago',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      online: false
    }
  ];

  // Mock data for messages
  const messages = [
    {
      id: 1,
      sender: 'Sarah Johnson',
      content: 'Hi team, I wanted to discuss the Q1 performance metrics with everyone.',
      timestamp: '10:30 AM',
      type: 'text',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
    },
    {
      id: 2,
      sender: 'You',
      content: 'Great idea! The numbers look promising this quarter.',
      timestamp: '10:32 AM',
      type: 'text',
      isOwn: true
    },
    {
      id: 3,
      sender: 'Mike Chen',
      content: 'I can prepare the detailed breakdown by department.',
      timestamp: '10:35 AM',
      type: 'text',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    {
      id: 4,
      sender: 'You',
      content: 'Perfect! Let\'s schedule a meeting for tomorrow at 2 PM.',
      timestamp: '10:37 AM',
      type: 'text',
      isOwn: true
    }
  ];

  // Mock data for announcements
  const announcements = [
    {
      id: 1,
      title: 'Q1 Performance Review Results',
      content: 'Congratulations to all teams for exceeding our quarterly targets. Detailed results will be shared in the upcoming all-hands meeting.',
      author: 'HR Department',
      timestamp: '2024-01-15 09:00',
      priority: 'high',
      category: 'Performance',
      views: 156,
      likes: 23
    },
    {
      id: 2,
      title: 'New Remote Work Policy',
      content: 'Updated remote work guidelines are now in effect. Please review the new policies in the employee handbook.',
      author: 'Management',
      timestamp: '2024-01-14 14:30',
      priority: 'medium',
      category: 'Policy',
      views: 89,
      likes: 12
    },
    {
      id: 3,
      title: 'Team Building Event - March 2024',
      content: 'Save the date! Our annual team building event is scheduled for March 15-16. More details to follow.',
      author: 'Events Team',
      timestamp: '2024-01-13 11:15',
      priority: 'low',
      category: 'Events',
      views: 234,
      likes: 45
    }
  ];

  // Mock data for notifications
  const notifications = [
    {
      id: 1,
      type: 'message',
      title: 'New message from Development Team',
      content: 'The new feature is ready for testing',
      timestamp: '2 min ago',
      read: false,
      icon: MessageSquare,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      type: 'meeting',
      title: 'Meeting reminder',
      content: 'Project review meeting in 30 minutes',
      timestamp: '28 min ago',
      read: false,
      icon: Clock,
      color: 'bg-orange-500'
    },
    {
      id: 3,
      type: 'approval',
      title: 'Leave request approved',
      content: 'Sarah Johnson\'s leave request has been approved',
      timestamp: '1 hour ago',
      read: true,
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Budget threshold reached',
      content: 'Project Alpha has reached 80% of allocated budget',
      timestamp: '2 hours ago',
      read: true,
      icon: AlertCircle,
      color: 'bg-red-500'
    }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage('');
    }
  };

  const ConversationItem = ({ conversation, isActive, onClick }) => (
    <div
      onClick={onClick}
      className={`p-4 cursor-pointer transition-colors ${
        isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img
            src={conversation.avatar}
            alt={conversation.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          {conversation.online && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white truncate">
              {conversation.name}
              {conversation.type === 'group' && (
                <span className="ml-2 text-xs text-gray-400">({conversation.participants})</span>
              )}
            </h3>
            <span className="text-xs text-gray-400">{conversation.timestamp}</span>
          </div>
          <p className="text-sm text-gray-400 truncate">{conversation.lastMessage}</p>
        </div>
        {conversation.unread > 0 && (
          <div className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
            {conversation.unread}
          </div>
        )}
      </div>
    </div>
  );

  const MessageBubble = ({ message }) => (
    <div className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${message.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {!message.isOwn && (
          <img
            src={message.avatar}
            alt={message.sender}
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
        <div>
          <div className={`px-4 py-2 rounded-lg ${
            message.isOwn 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 text-white'
          }`}>
            <p className="text-sm">{message.content}</p>
          </div>
          <p className="text-xs text-gray-400 mt-1 px-2">
            {!message.isOwn && `${message.sender} • `}{message.timestamp}
          </p>
        </div>
      </div>
    </div>
  );

  const AnnouncementCard = ({ announcement }) => (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            announcement.priority === 'high' ? 'bg-red-500' :
            announcement.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
          }`}></div>
          <span className="text-sm font-medium text-gray-400">{announcement.category}</span>
        </div>
        <button className="text-gray-400 hover:text-gray-200">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{announcement.title}</h3>
      <p className="text-gray-300 mb-4">{announcement.content}</p>
      <div className="flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center space-x-4">
          <span>By {announcement.author}</span>
          <span>{announcement.timestamp}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <Star className="h-4 w-4" />
            <span>{announcement.likes}</span>
          </span>
          <span>{announcement.views} views</span>
        </div>
      </div>
    </div>
  );

  const NotificationItem = ({ notification }) => (
    <div className={`p-4 border-b border-gray-700 hover:bg-gray-700 transition-colors ${
      !notification.read ? 'bg-gray-800' : ''
    }`}>
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-full ${notification.color}`}>
          <notification.icon className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-white">{notification.title}</h4>
          <p className="text-sm text-gray-300">{notification.content}</p>
          <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
        </div>
        {!notification.read && (
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Communication Hub</h1>
          <p className="text-gray-400">Stay connected with your team and organization</p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gray-800 rounded-lg shadow-md mb-6">
          <div className="flex border-b border-gray-700">
            {[
              { id: 'messages', label: 'Messages', icon: MessageSquare },
              { id: 'announcements', label: 'Announcements', icon: Megaphone },
              { id: 'notifications', label: 'Notifications', icon: Bell }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center px-6 py-4 font-medium transition-colors ${
                  activeTab === id
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <div className="lg:col-span-1">
              <div className="bg-gray-800 rounded-lg shadow-md">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">Conversations</h2>
                    <button className="p-2 text-blue-400 hover:bg-gray-700 rounded-lg">
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                    />
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {conversations.map((conversation) => (
                    <ConversationItem
                      key={conversation.id}
                      conversation={conversation}
                      isActive={selectedConversation?.id === conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-lg shadow-md h-96 flex flex-col">
                {selectedConversation ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={selectedConversation.avatar}
                          alt={selectedConversation.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-white">{selectedConversation.name}</h3>
                          <p className="text-sm text-gray-400">
                            {selectedConversation.online ? 'Online' : 'Last seen 2 hours ago'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:bg-gray-700 rounded-lg">
                          <Phone className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:bg-gray-700 rounded-lg">
                          <Video className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:bg-gray-700 rounded-lg">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto">
                      {messages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-gray-700">
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          className="flex-1 px-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                        />
                        <button
                          onClick={handleSendMessage}
                          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          <Send className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">Select a conversation to start messaging</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Announcements Tab */}
        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search announcements..."
                    className="pl-10 pr-4 py-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  />
                </div>
                <button className="flex items-center px-4 py-2 border border-gray-600 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
              </div>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                New Announcement
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {announcements.map((announcement) => (
                <AnnouncementCard key={announcement.id} announcement={announcement} />
              ))}
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="bg-gray-800 rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Notifications</h2>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  Mark all as read
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-700">
              {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerCommunicationHub;