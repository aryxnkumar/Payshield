import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Mail, Calendar, Shield, Bell, Lock, Palette,
  LogOut, CheckCircle2, Moon, Sun,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'appearance'>('profile');
  const [notifPrefs, setNotifPrefs] = useState({ email: true, push: true, disputes: true, transactions: false });
  const [appearance, setAppearance] = useState<'light' | 'dark'>('light');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const tabs = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'security' as const, label: 'Security', icon: Lock },
    { id: 'appearance' as const, label: 'Appearance', icon: Palette },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-900">Profile & Settings</h1>
        <p className="text-sm text-gray-500">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Sidebar tabs */}
        <div className="card p-4">
          <div className="flex gap-2 overflow-x-auto lg:flex-col">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-electric-50 text-electric-700' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-red-600 transition-all hover:bg-red-50 whitespace-nowrap"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'profile' && (
            <div className="card p-6 animate-fade-in">
              <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-electric-500 to-electric-700 text-2xl font-bold text-white">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-navy-900">{user?.name}</h2>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ProfileField icon={User} label="Full Name" value={user?.name || '-'} />
                <ProfileField icon={Mail} label="Email" value={user?.email || '-'} />
                <ProfileField icon={Shield} label="Account Type" value="Customer" />
                <ProfileField icon={Calendar} label="Member Since" value={user?.memberSince || '-'} />
              </div>
              <div className="mt-6 flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-sm text-green-700">Your account is verified and active</span>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card p-6 animate-fade-in">
              <h2 className="text-lg font-bold text-navy-900">Notification Preferences</h2>
              <p className="mt-1 text-sm text-gray-500">Choose what you want to be notified about</p>
              <div className="mt-6 space-y-4">
                {[
                  { key: 'email' as const, label: 'Email Notifications', desc: 'Receive notifications via email' },
                  { key: 'push' as const, label: 'Push Notifications', desc: 'Receive push notifications in browser' },
                  { key: 'disputes' as const, label: 'Dispute Updates', desc: 'Get notified when your dispute status changes' },
                  { key: 'transactions' as const, label: 'Transaction Alerts', desc: 'Get notified about new transactions' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
                    <div>
                      <p className="text-sm font-medium text-navy-900">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifPrefs({ ...notifPrefs, [item.key]: !notifPrefs[item.key] })}
                      className={`relative h-6 w-11 rounded-full transition-colors ${notifPrefs[item.key] ? 'bg-electric-500' : 'bg-gray-300'}`}
                    >
                      <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${notifPrefs[item.key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card p-6 animate-fade-in">
              <h2 className="text-lg font-bold text-navy-900">Security</h2>
              <p className="mt-1 text-sm text-gray-500">Manage your account security</p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-electric-500" />
                    <div>
                      <p className="text-sm font-medium text-navy-900">Change Password</p>
                      <p className="text-xs text-gray-500">Last changed 3 months ago</p>
                    </div>
                  </div>
                  <button className="btn-secondary">Change</button>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium text-navy-900">Two-Factor Authentication</p>
                      <p className="text-xs text-gray-500">Add an extra layer of security</p>
                    </div>
                  </div>
                  <button className="btn-primary">Enable</button>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm font-medium text-navy-900">Account Verification</p>
                      <p className="text-xs text-gray-500">Your account is verified</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-green-600">Verified</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="card p-6 animate-fade-in">
              <h2 className="text-lg font-bold text-navy-900">Appearance</h2>
              <p className="mt-1 text-sm text-gray-500">Customize how PayShield looks</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  onClick={() => setAppearance('light')}
                  className={`rounded-xl border-2 p-6 text-center transition-all ${appearance === 'light' ? 'border-electric-500 bg-electric-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <Sun className="mx-auto h-8 w-8 text-amber-500" />
                  <p className="mt-2 text-sm font-medium text-navy-900">Light Mode</p>
                  <p className="text-xs text-gray-500">Bright and clean</p>
                </button>
                <button
                  onClick={() => setAppearance('dark')}
                  className={`rounded-xl border-2 p-6 text-center transition-all ${appearance === 'dark' ? 'border-electric-500 bg-electric-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <Moon className="mx-auto h-8 w-8 text-navy-700" />
                  <p className="mt-2 text-sm font-medium text-navy-900">Dark Mode</p>
                  <p className="text-xs text-gray-500">Easy on the eyes</p>
                </button>
              </div>
              <p className="mt-4 text-xs text-gray-400">Note: Dark mode is a demo preference and does not change the app theme in this preview.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileField({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-gray-400" />
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400">{label}</p>
      </div>
      <p className="mt-1 text-sm font-semibold text-navy-900">{value}</p>
    </div>
  );
}
