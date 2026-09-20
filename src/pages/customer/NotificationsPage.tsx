import { Link } from 'react-router-dom';
import { Bell, CheckCheck, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useAppData } from '@/context/AppDataContext';

export function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppData();
  const unreadCount = notifications.filter((n) => !n.read).length;

  const iconMap = {
    info: Info,
    success: CheckCircle2,
    warning: AlertTriangle,
  };

  const colorMap = {
    info: 'bg-electric-50 text-electric-500',
    success: 'bg-green-50 text-green-500',
    warning: 'bg-amber-50 text-amber-500',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-900">Notifications</h1>
          <p className="text-sm text-gray-500">
            {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllNotificationsRead} className="btn-secondary">
            <CheckCheck className="h-4 w-4" />
            Mark all as read
          </button>
        )}
      </div>

      <div className="card divide-y divide-gray-50">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Bell className="h-12 w-12 text-gray-300" />
            <p className="mt-4 text-sm text-gray-500">No notifications yet</p>
          </div>
        ) : (
          notifications.map((n) => {
            const Icon = iconMap[n.type];
            return (
              <button
                key={n.id}
                onClick={() => markNotificationRead(n.id)}
                className={`flex w-full items-start gap-4 p-5 text-left transition-colors hover:bg-gray-50 ${
                  !n.read ? 'bg-electric-50/30' : ''
                }`}
              >
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${colorMap[n.type]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-navy-900">{n.title}</p>
                    {!n.read && <span className="h-2 w-2 rounded-full bg-electric-500" />}
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{n.message}</p>
                  <p className="mt-1 text-xs text-gray-400">{n.date}</p>
                </div>
              </button>
            );
          })
        )}
      </div>

      <div className="text-center">
        <Link to="/app/dashboard" className="text-sm font-medium text-electric-600 hover:text-electric-700">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
