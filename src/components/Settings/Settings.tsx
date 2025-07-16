import React, { useState } from 'react';
import { User, Bell, Shield, Globe, Palette, Save } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Palette },
    { id: 'language', label: 'Language', icon: Globe },
  ];

  const ProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
          <span className="text-white font-medium text-2xl">JS</span>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">John Smith</h3>
          <p className="text-gray-600 dark:text-gray-400">Administrator</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            defaultValue="John Smith"
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address
          </label>
          <input
            type="email"
            defaultValue="john@company.com"
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            defaultValue="+1 (555) 123-4567"
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Department
          </label>
          <select className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white">
            <option>IT</option>
            <option>Sales</option>
            <option>Marketing</option>
            <option>Support</option>
          </select>
        </div>
      </div>
    </div>
  );

  const NotificationsTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email Notifications</h3>
        
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <span className="text-gray-700 dark:text-gray-300">New contact assignments</span>
          </label>
          
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <span className="text-gray-700 dark:text-gray-300">Task reminders</span>
          </label>
          
          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <span className="text-gray-700 dark:text-gray-300">Weekly reports</span>
          </label>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Push Notifications</h3>
        
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <span className="text-gray-700 dark:text-gray-300">Urgent tasks</span>
          </label>
          
          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
            <span className="text-gray-700 dark:text-gray-300">New messages</span>
          </label>
        </div>
      </div>
    </div>
  );

  const SecurityTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Change Password</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              New Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</h3>
        
        <div className="flex items-center gap-3">
          <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
          <span className="text-gray-700 dark:text-gray-300">Enable two-factor authentication</span>
        </div>
      </div>
    </div>
  );

  const PreferencesTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Display</h3>
        
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input type="radio" name="theme" value="light" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
            <span className="text-gray-700 dark:text-gray-300">Light mode</span>
          </label>
          
          <label className="flex items-center gap-3">
            <input type="radio" name="theme" value="dark" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
            <span className="text-gray-700 dark:text-gray-300">Dark mode</span>
          </label>
          
          <label className="flex items-center gap-3">
            <input type="radio" name="theme" value="system" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
            <span className="text-gray-700 dark:text-gray-300">System default</span>
          </label>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Time Zone</h3>
        
        <select className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white">
          <option>UTC-05:00 (Eastern Time)</option>
          <option>UTC-06:00 (Central Time)</option>
          <option>UTC-07:00 (Mountain Time)</option>
          <option>UTC-08:00 (Pacific Time)</option>
        </select>
      </div>
    </div>
  );

  const LanguageTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Language</h3>
        
        <select className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white">
          <option>English</option>
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
          <option>Arabic</option>
        </select>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Text Direction</h3>
        
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input type="radio" name="direction" value="ltr" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
            <span className="text-gray-700 dark:text-gray-300">Left to Right (LTR)</span>
          </label>
          
          <label className="flex items-center gap-3">
            <input type="radio" name="direction" value="rtl" className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" />
            <span className="text-gray-700 dark:text-gray-300">Right to Left (RTL)</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return <ProfileTab />;
      case 'notifications': return <NotificationsTab />;
      case 'security': return <SecurityTab />;
      case 'preferences': return <PreferencesTab />;
      case 'language': return <LanguageTab />;
      default: return <ProfileTab />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Save size={20} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="lg:col-span-1">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;