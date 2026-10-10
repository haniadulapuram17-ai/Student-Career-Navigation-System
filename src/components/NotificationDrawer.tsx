import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Bell, 
  Calendar, 
  Briefcase, 
  MessageSquare, 
  Check, 
  Trash2,
  ExternalLink
} from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, clearAllNotifications, setActiveTab } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900">Notifications & Recruiter Alerts</h2>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-xs border border-emerald-200">
              {notifications.filter(n => !n.read).length} Unread
            </span>
          </div>

          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <button
                onClick={clearAllNotifications}
                className="text-[11px] text-slate-400 hover:text-rose-600 flex items-center gap-1"
                title="Clear all alerts"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2.5">
          {notifications.map((notif) => {
            const isInterview = notif.type === 'interview';
            const isDrive = notif.type === 'drive';

            return (
              <div
                key={notif.id}
                onClick={() => {
                  markNotificationRead(notif.id);
                  if (notif.actionUrl) {
                    setActiveTab(notif.actionUrl);
                    onClose();
                  }
                }}
                className={`p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                  !notif.read
                    ? 'border-emerald-200 bg-emerald-50/30 hover:bg-emerald-50/60 shadow-2xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50 opacity-80'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-1.5">
                    {isInterview ? (
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    ) : isDrive ? (
                      <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <MessageSquare className="w-3.5 h-3.5 text-purple-600" />
                    )}
                    <h3 className="font-bold text-slate-900 leading-tight">
                      {notif.title}
                    </h3>
                  </div>

                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0"></span>
                  )}
                </div>

                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {notif.message}
                </p>

                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                  <span>{new Date(notif.timestamp).toLocaleDateString()}</span>
                  <span className="text-emerald-700 font-semibold hover:underline">
                    View Details →
                  </span>
                </div>
              </div>
            );
          })}

          {notifications.length === 0 && (
            <div className="py-16 text-center text-slate-400 space-y-2">
              <Bell className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs font-medium">All caught up! No notifications.</p>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-3 border-t border-slate-200 bg-slate-50 text-center text-[11px] text-slate-500">
          Digital Employment Exchange of Telangana (DEET) · Live Notification Feed
        </div>

      </div>
    </div>
  );
};
