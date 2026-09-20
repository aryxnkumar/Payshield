import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ArrowLeftRight, AlertCircle, User as UserIcon,
  Search, Bell, LogOut, Menu, X, ChevronDown,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useAppData } from '@/context/AppDataContext';
import { Logo } from '@/components/Logo';

const navItems = [
  { label: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
  { label: 'Transactions', href: '/app/transactions', icon: ArrowLeftRight },
  { label: 'My Disputes', href: '/app/disputes', icon: AlertCircle },
  { label: 'Profile & Settings', href: '/app/profile', icon: UserIcon },
];

export function CustomerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppData();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (href: string) => location.pathname === href || location.pathname.startsWith(href + '/');

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar - desktop */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-navy-950 transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-5 py-5">
            <Logo variant="dark" />
            <button onClick={() => setSidebarOpen(false)} className="text-navy-400 lg:hidden">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`sidebar-link ${isActive(item.href) ? 'sidebar-link-active' : ''}`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-navy-800 p-3">
            <div className="rounded-lg bg-navy-900 p-4">
              <p className="text-xs font-medium text-navy-400">Need help?</p>
              <p className="mt-1 text-sm text-navy-200">Contact our support team 24/7</p>
              <button className="mt-3 w-full rounded-lg bg-electric-600 px-3 py-2 text-xs font-semibold text-white hover:bg-electric-700">
                Get Support
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-navy-950/50 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:ml-64">
        {/* Topbar */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="text-navy-700 lg:hidden">
              <Menu className="h-6 w-6" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions, disputes..."
                className="w-64 rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-navy-900 placeholder-gray-400 focus:border-electric-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-electric-500/20"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                className="relative rounded-lg p-2 text-navy-600 transition-colors hover:bg-gray-100"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>
              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setNotifOpen(false)} />
                  <div className="absolute right-0 top-full z-40 mt-2 w-80 rounded-xl border border-gray-200 bg-white shadow-xl animate-slide-in-right">
                    <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                      <h3 className="font-semibold text-navy-900">Notifications</h3>
                      <button onClick={markAllNotificationsRead} className="text-xs font-medium text-electric-600 hover:text-electric-700">
                        Mark all read
                      </button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((n) => (
                        <button
                          key={n.id}
                          onClick={() => markNotificationRead(n.id)}
                          className={`flex w-full gap-3 border-b border-gray-50 px-4 py-3 text-left transition-colors hover:bg-gray-50 ${
                            !n.read ? 'bg-electric-50/50' : ''
                          }`}
                        >
                          <div className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${
                            n.type === 'success' ? 'bg-green-500' : n.type === 'warning' ? 'bg-amber-500' : 'bg-electric-500'
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-navy-900">{n.title}</p>
                            <p className="mt-0.5 text-xs text-gray-500">{n.message}</p>
                            <p className="mt-1 text-xs text-gray-400">{n.date}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                    <Link to="/app/notifications" onClick={() => setNotifOpen(false)} className="block border-t border-gray-100 px-4 py-3 text-center text-sm font-medium text-electric-600 hover:bg-gray-50">
                      View all notifications
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-gray-100"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-electric-500 to-electric-700 text-sm font-semibold text-white">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="hidden text-left sm:block">
                  <p className="text-sm font-semibold text-navy-900">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500">Customer</p>
                </div>
                <ChevronDown className="hidden h-4 w-4 text-gray-400 sm:block" />
              </button>
              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 top-full z-40 mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow-xl animate-slide-in-right">
                    <div className="border-b border-gray-100 px-4 py-3">
                      <p className="text-sm font-semibold text-navy-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <div className="py-2">
                      <Link to="/app/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-4 py-2 text-sm text-navy-700 hover:bg-gray-50">
                        <UserIcon className="h-4 w-4 text-gray-400" />
                        Profile & Settings
                      </Link>
                      <button onClick={handleLogout} className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="page-enter mx-auto max-w-7xl px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
