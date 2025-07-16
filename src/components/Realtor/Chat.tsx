import React, { useState } from 'react';
import { Search, Send, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react';

const Chat: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string>('1');
  const [message, setMessage] = useState('');

  const chats = [
    {
      id: '1',
      clientName: 'Alice Cooper',
      lastMessage: 'Thanks for the property details!',
      timestamp: '2 min ago',
      unread: 2,
      avatar: 'AC',
      status: 'online',
      property: 'Downtown Apartment'
    },
    {
      id: '2',
      clientName: 'Bob Martinez',
      lastMessage: 'When can we schedule a viewing?',
      timestamp: '15 min ago',
      unread: 0,
      avatar: 'BM',
      status: 'offline',
      property: 'Suburban Villa'
    },
    {
      id: '3',
      clientName: 'Carol White',
      lastMessage: 'I love the marina location!',
      timestamp: '1 hour ago',
      unread: 1,
      avatar: 'CW',
      status: 'online',
      property: 'Marina Condo'
    },
    {
      id: '4',
      clientName: 'Dan Brown',
      lastMessage: 'What about the financing options?',
      timestamp: '2 hours ago',
      unread: 0,
      avatar: 'DB',
      status: 'offline',
      property: 'Heritage Townhouse'
    }
  ];

  const messages = [
    {
      id: '1',
      senderId: 'client',
      senderName: 'Alice Cooper',
      message: 'Hi! I saw the downtown apartment listing. Can you tell me more about it?',
      timestamp: '10:30 AM',
      type: 'text'
    },
    {
      id: '2',
      senderId: 'realtor',
      senderName: 'You',
      message: 'Hello Alice! I\'d be happy to help. The downtown apartment is a beautiful 2-bedroom, 2-bathroom unit with modern amenities.',
      timestamp: '10:32 AM',
      type: 'text'
    },
    {
      id: '3',
      senderId: 'realtor',
      senderName: 'You',
      message: 'It features a fully equipped kitchen, in-unit laundry, and a private balcony with city views.',
      timestamp: '10:32 AM',
      type: 'text'
    },
    {
      id: '4',
      senderId: 'client',
      senderName: 'Alice Cooper',
      message: 'That sounds perfect! What about parking?',
      timestamp: '10:35 AM',
      type: 'text'
    },
    {
      id: '5',
      senderId: 'realtor',
      senderName: 'You',
      message: 'Great question! The unit comes with one assigned parking space in the secure underground garage.',
      timestamp: '10:36 AM',
      type: 'text'
    },
    {
      id: '6',
      senderId: 'client',
      senderName: 'Alice Cooper',
      message: 'Thanks for the property details!',
      timestamp: '10:38 AM',
      type: 'text'
    }
  ];

  const selectedChatData = chats.find(chat => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage('');
    }
  };

  return (
    <div className="h-full bg-white flex">
      {/* Chat List */}
      <div className="w-80 border-r border-gray-100 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search conversations..."
              className="form-input pl-10"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-50 ${
                selectedChat === chat.id ? 'bg-indigo-50 border-indigo-100' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="avatar avatar-md">
                    {chat.avatar}
                  </div>
                  {chat.status === 'online' && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 truncate">{chat.clientName}</h3>
                    <span className="text-xs text-gray-500">{chat.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate mb-1">{chat.lastMessage}</p>
                  <p className="text-xs text-gray-500">{chat.property}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
                    {chat.unread}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedChatData ? (
          <>
            {/* Chat Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="avatar avatar-md">
                    {selectedChatData.avatar}
                  </div>
                  {selectedChatData.status === 'online' && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedChatData.clientName}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedChatData.status === 'online' ? 'Online' : 'Last seen 2 hours ago'} • {selectedChatData.property}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  <Phone size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                  <Video size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === 'realtor' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md ${
                    msg.senderId === 'realtor' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  } rounded-2xl px-4 py-3`}>
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${
                      msg.senderId === 'realtor' ? 'text-indigo-200' : 'text-gray-500'
                    }`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-6 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <Paperclip size={20} />
                </button>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="form-input pr-12"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    <Smile size={20} />
                  </button>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="btn-primary p-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a client to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;