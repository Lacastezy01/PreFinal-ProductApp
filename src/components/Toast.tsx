import React, { useEffect } from 'react';
import { ToastNotification } from '../types/product';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export interface ToastProps {
  notifications: ToastNotification[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ notifications, onDismiss }) => {
  return (
    <div className="toast-container" aria-live="assertive">
      {notifications.map((item) => (
        <ToastItem key={item.id} notification={item} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ notification: ToastNotification; onDismiss: (id: string) => void }> = ({
  notification,
  onDismiss
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(notification.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [notification.id, onDismiss]);

  const icons = {
    success: <CheckCircle2 size={20} strokeWidth={3} className="text-green" />,
    error: <AlertCircle size={20} strokeWidth={3} className="text-pink" />,
    warning: <AlertTriangle size={20} strokeWidth={3} className="text-orange" />,
    info: <Info size={20} strokeWidth={3} className="text-cyan" />
  };

  return (
    <div className={`toast-card toast--${notification.type}`}>
      <span className="toast-icon">{icons[notification.type]}</span>
      <p className="toast-message">{notification.message}</p>
      <button
        type="button"
        onClick={() => onDismiss(notification.id)}
        className="toast-close"
        aria-label="Dismiss notification"
      >
        <X size={16} strokeWidth={3} />
      </button>
    </div>
  );
};
