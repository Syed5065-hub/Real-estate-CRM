import React, { useState, useRef } from 'react';
import { User, Bell, Shield, Palette, Building, Mail, Phone, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Settings: React.FC = () => {
  const { user, tenant, portal } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Palette },
    ...(portal === 'admin' ? [{ id: 'company', label: 'Company', icon: Building }] : []),
  ];

  const ProfileTab = () => {
    const [photo, setPhoto] = useState<string>(() => localStorage.getItem('profilePhoto') || '');
    const fileInputRef = useRef<HTMLInputElement>(null);

    React.useEffect(() => {
      const savedPhoto = localStorage.getItem('profilePhoto');
      if (savedPhoto) setPhoto(savedPhoto);
    }, []);

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];
      if (selectedFile) {
        const reader = new FileReader();
        reader.onload = (ev: ProgressEvent<FileReader>) => {
          const result = ev.target?.result;
          if (typeof result === 'string') {
            setPhoto(result);
            localStorage.setItem('profilePhoto', result);
          }
        };
        reader.readAsDataURL(selectedFile);
      }
    };
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [department, setDepartment] = useState('');
    const [bio, setBio] = useState('');
    React.useEffect(() => {
      const saved = localStorage.getItem('profileData');
      if (saved) {
        const data = JSON.parse(saved);
        setName(data.name || user?.name || '');
        setEmail(data.email || user?.email || '');
        setPhone(data.phone || '+1 (555) 123-4567');
        setDepartment(data.department || 'Sales');
        setBio(data.bio || 'Experienced real estate professional with over 5 years in the industry.');
      } else {
        setName(user?.name || '');
        setEmail(user?.email || '');
        setPhone('+1 (555) 123-4567');
        setDepartment('Sales');
        setBio('Experienced real estate professional with over 5 years in the industry.');
      }
    }, [user]);
    const [success, setSuccess] = useState(false);

    const handleSave = () => {
      const profileData = { name, email, phone, department, bio };
      localStorage.setItem('profileData', JSON.stringify(profileData));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-6">
        <div className="avatar avatar-lg">
          {photo ? (
            <img src={photo} alt="Profile" className="w-16 h-16 rounded-full object-cover" />
          ) : (
            name.charAt(0)
          )}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
          <p className="text-gray-600 capitalize">{user?.role} • {tenant?.name}</p>
          <button
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium mt-1"
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            Change Photo
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>
      </div>
          <button
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-md font-semibold transition-colors hover:bg-blue-700"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>
        {success && (
          <div className="text-green-600 font-semibold mt-2">Changes saved!</div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Department
            </label>
            <select
              value={department}
              onChange={e => setDepartment(e.target.value)}
              className="form-input"
            >
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Support">Support</option>
              <option value="Administration">Administration</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              rows={4}
              className="form-input"
              placeholder="Tell us about yourself..."
              value={bio}
              onChange={e => setBio(e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  };

  const NotificationsTab = () => (
    <div className="space-y-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Email Notifications</h3>
        
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <div className="font-medium text-gray-900">New leads assigned</div>
              <div className="text-sm text-gray-500">Get notified when new leads are assigned to you</div>
            </div>
            <input type="checkbox" defaultChecked className="toggle" />
          </label>
          
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <div className="font-medium text-gray-900">Property updates</div>
              <div className="text-sm text-gray-500">Notifications about property status changes</div>
            </div>
            <input type="checkbox" defaultChecked className="toggle" />
          </label>
          
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <div className="font-medium text-gray-900">Meeting reminders</div>
              <div className="text-sm text-gray-500">Reminders for upcoming meetings and appointments</div>
            </div>
            <input type="checkbox" className="toggle" />
          </label>

          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <div className="font-medium text-gray-900">Weekly reports</div>
              <div className="text-sm text-gray-500">Weekly performance and activity summaries</div>
            </div>
            <input type="checkbox" className="toggle" />
          </label>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Push Notifications</h3>
        
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <div className="font-medium text-gray-900">Urgent messages</div>
              <div className="text-sm text-gray-500">High priority messages and alerts</div>
            </div>
            <input type="checkbox" defaultChecked className="toggle" />
          </label>
          
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <div className="font-medium text-gray-900">Client responses</div>
              <div className="text-sm text-gray-500">When clients respond to your messages</div>
            </div>
            <input type="checkbox" className="toggle" />
          </label>
        </div>
      </div>
    </div>
  );

    const SecurityTab = () => (
    <div className="space-y-8">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
        
        <div className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Password
            </label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter current password"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter new password"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className="form-input"
              placeholder="Confirm new password"
            />
          </div>

          <button className="btn-primary">
            Update Password
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h3>
        
        <div className="p-4 bg-gray-50 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Enable 2FA</div>
              <div className="text-sm text-gray-500">Add an extra layer of security to your account</div>
            </div>
            <input type="checkbox" className="toggle" />
          </div>
        </div>

        <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <div className="font-medium text-amber-800">Security Recommendation</div>
              <div className="text-sm text-amber-700 mt-1">
                Enable two-factor authentication to secure your account with an additional verification step.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PreferencesTab = () => (
    <div className="space-y-8">
      {/* Appearance section removed, now in sidebar */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Language & Region</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Language
            </label>
            <select className="form-input">
              <option>English (US)</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Time Zone
            </label>
            <select className="form-input">
              <option>UTC-05:00 (Eastern Time)</option>
              <option>UTC-06:00 (Central Time)</option>
              <option>UTC-07:00 (Mountain Time)</option>
              <option>UTC-08:00 (Pacific Time)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Data & Privacy</h3>
        
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <div className="font-medium text-gray-900">Analytics tracking</div>
              <div className="text-sm text-gray-500">Help improve our service with usage analytics</div>
            </div>
            <input type="checkbox" defaultChecked className="toggle" />
          </label>
          
          <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div>
              <div className="font-medium text-gray-900">Marketing emails</div>
              <div className="text-sm text-gray-500">Receive updates about new features and tips</div>
            </div>
            <input type="checkbox" className="toggle" />
          </label>
        </div>
      </div>
    </div>
  );

  const [companyLogo, setCompanyLogo] = useState<string | null>(() => {
    return localStorage.getItem('companyLogo') || null;
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        setCompanyLogo(result);
        localStorage.setItem('companyLogo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const CompanyTab = () => (
    <div className="space-y-8">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Company Name
            </label>
            <input
              type="text"
              defaultValue={tenant?.name}
              className="form-input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Business Type
            </label>
            <select className="form-input">
              <option>Real Estate Agency</option>
              <option>Property Management</option>
              <option>Real Estate Investment</option>
              <option>Commercial Real Estate</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Mail className="inline w-4 h-4 mr-1" />
              Business Email
            </label>
            <input
              type="email"
              defaultValue="info@premierrealestate.com"
              className="form-input"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <Phone className="inline w-4 h-4 mr-1" />
              Business Phone
            </label>
            <input
              type="tel"
              defaultValue="+1 (555) 123-4567"
              className="form-input"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <MapPin className="inline w-4 h-4 mr-1" />
              Business Address
            </label>
            <textarea
              rows={3}
              className="form-input"
              defaultValue="123 Business District, Suite 100&#10;New York, NY 10001&#10;United States"
            />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Branding</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Primary Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                defaultValue="#3B82F6"
                className="w-12 h-12 rounded-lg border border-gray-300"
              />
              <input
                type="text"
                defaultValue="#3B82F6"
                className="form-input flex-1"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Company Logo
            </label>
            <div className="flex flex-row gap-6 min-h-[80px]" style={{alignItems: 'center'}}>
              {companyLogo ? (
                <img
                  src={companyLogo}
                  alt="Company Logo"
                  className="w-20 h-20 object-cover rounded-xl border-2 border-indigo-400 bg-white shadow"
                />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center rounded-xl border-2 border-dashed border-indigo-400 bg-indigo-50">
                  <Building className="w-10 h-10 text-indigo-400" />
                </div>
              )}
              <button
                type="button"
                className="bg-blue-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-md font-semibold transition-colors hover:bg-blue-700"
                style={{ minWidth: 140, alignSelf: 'center' }}
                onClick={() => fileInputRef.current?.click()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Upload Logo
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleLogoUpload}
              />
            </div>
            {companyLogo && (
              <button
                type="button"
                className="text-xs text-red-500 mt-2 underline"
                onClick={() => {
                  setCompanyLogo(null);
                  localStorage.removeItem('companyLogo');
                }}
              >
                Remove Logo
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Portal Access</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-indigo-900">Admin Portal</div>
                <div className="text-sm text-indigo-700">Full system administration access</div>
              </div>
              <div className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                Enabled
              </div>
            </div>
          </div>

          <div className="p-4 bg-violet-50 border border-violet-200 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-violet-900">Realtor Portal</div>
                <div className="text-sm text-violet-700">Agent tools and client management</div>
              </div>
              <div className="px-3 py-1 bg-violet-100 text-violet-800 rounded-full text-sm font-medium">
                Enabled
              </div>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-emerald-900">Client Portal</div>
                <div className="text-sm text-emerald-700">Property browsing and communication</div>
              </div>
              <div className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium">
                Enabled
              </div>
            </div>
          </div>
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
      case 'company': return <CompanyTab />;
      default: return <ProfileTab />;
    }
  };

  return (
    <div className="h-full bg-white overflow-auto">
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tabs */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                        : 'text-gray-700 hover:bg-gray-50'
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
            <div className="card p-8">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;