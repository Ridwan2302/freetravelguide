import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useNotificationStore } from '../../store/notificationStore';

const config = {
  success: { icon: CheckCircle, bg: 'bg-emerald-50', border: 'border-emerald-200/80', text: 'text-emerald-800', icon_color: 'text-emerald-500' },
  error:   { icon: XCircle,     bg: 'bg-red-50',     border: 'border-red-200/80',     text: 'text-red-800',     icon_color: 'text-red-500' },
  warning: { icon: AlertTriangle, bg: 'bg-amber-50',  border: 'border-amber-200/80',   text: 'text-amber-800',   icon_color: 'text-amber-500' },
  info:    { icon: Info,        bg: 'bg-blue-50',    border: 'border-blue-200/80',    text: 'text-blue-800',    icon_color: 'text-blue-500' },
};

interface AlertProps {
  type: keyof typeof config;
  title: string;
  message: string;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ type, title, message, onClose }) => {
  const { bg, border, text, icon_color, icon: Icon } = config[type];
  return (
    <div className={`flex items-start gap-3 p-4 rounded-2xl border ${bg} ${border}`}>
      <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${icon_color}`} />
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold ${text}`}>{title}</p>
        <p className={`text-sm ${text} opacity-75 mt-0.5`}>{message}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className={`${text} opacity-50 hover:opacity-100 transition-opacity`}>
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotificationStore();
  return (
    <div className="fixed top-5 right-5 z-[100] space-y-2 w-full max-w-sm">
      {notifications.map((notif) => (
        <div key={notif.id} className="slide-right">
          <Alert
            type={notif.type}
            title={notif.title}
            message={notif.message}
            onClose={() => removeNotification(notif.id)}
          />
        </div>
      ))}
    </div>
  );
};
