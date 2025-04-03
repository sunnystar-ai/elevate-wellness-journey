
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from "@/integrations/supabase/client";
import { Bell, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Notification {
  id: string;
  message: string;
  created_at: string;
  read: boolean;
  event_id?: string;
  event_title?: string;
}

const StoriesBar = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { isAuthenticated } = useAuth();

  // Function to fetch notifications
  const fetchNotifications = async () => {
    if (!isAuthenticated) return;

    try {
      // Fetch notifications (in a real app, you'd have a notifications table)
      // For now we'll simulate notifications from events
      const { data: events } = await supabase
        .from('community_events')
        .select('id, title, host_name, created_at')
        .order('created_at', { ascending: false })
        .limit(5);

      if (events) {
        // Transform events into notifications
        const notifications = events.map(event => ({
          id: event.id,
          message: `${event.host_name} created a new event: ${event.title}`,
          created_at: event.created_at,
          read: false,
          event_id: event.id,
          event_title: event.title
        }));

        setNotifications(notifications);
        setUnreadCount(notifications.filter(n => !n.read).length);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Set up listeners for event changes
  useEffect(() => {
    if (!isAuthenticated) return;

    fetchNotifications();

    // Subscribe to changes in the events table
    const channel = supabase
      .channel('event-changes')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'community_events' 
        }, 
        payload => {
          const newEvent = payload.new;
          const newNotification = {
            id: newEvent.id,
            message: `${newEvent.host_name} created a new event: ${newEvent.title}`,
            created_at: newEvent.created_at,
            read: false,
            event_id: newEvent.id,
            event_title: newEvent.title
          };
          
          setNotifications(prev => [newNotification, ...prev]);
          setUnreadCount(prev => prev + 1);
        }
      )
      .on('postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'community_events'
        },
        payload => {
          const updatedEvent = payload.new;
          const newNotification = {
            id: `${updatedEvent.id}-update-${Date.now()}`,
            message: `${updatedEvent.host_name} updated event: ${updatedEvent.title}`,
            created_at: new Date().toISOString(),
            read: false,
            event_id: updatedEvent.id,
            event_title: updatedEvent.title
          };
          
          setNotifications(prev => [newNotification, ...prev]);
          setUnreadCount(prev => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated]);

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  // Toggle notifications panel
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      markAllAsRead();
    }
  };

  // Remove a notification
  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    // Update unread count
    setUnreadCount(prev => notifications.filter(n => !n.read && n.id !== id).length);
  };

  return (
    <div className="w-full py-2 px-4 relative">
      <div className="flex justify-end">
        <button 
          onClick={toggleNotifications}
          className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white"
              variant="destructive"
            >
              {unreadCount}
            </Badge>
          )}
        </button>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="absolute right-4 top-12 w-80 max-h-96 bg-white dark:bg-gray-900 shadow-lg rounded-lg z-50 border overflow-hidden">
          <div className="flex justify-between items-center p-3 border-b">
            <h3 className="font-medium">Notifications</h3>
            <button 
              onClick={markAllAsRead} 
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Mark all as read
            </button>
          </div>
          
          <ScrollArea className="max-h-80">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              <div className="divide-y">
                {notifications.map(notification => (
                  <div key={notification.id} className="relative p-3 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <div className="pr-6">
                      <p className="text-sm">{notification.message}</p>
                      <span className="text-xs text-gray-500 mt-1 block">
                        {new Date(notification.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default StoriesBar;
