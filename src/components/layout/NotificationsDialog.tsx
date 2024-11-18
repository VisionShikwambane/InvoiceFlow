import { useState } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Bell,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  User,
  X,
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'payment' | 'invoice' | 'client' | 'task' | 'system';
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'payment',
    title: 'Payment Received',
    description: 'Client Acme Corp has paid invoice #INV-001',
    timestamp: new Date().toISOString(),
    read: false,
  },
  {
    id: '2',
    type: 'invoice',
    title: 'Invoice Overdue',
    description: 'Invoice #INV-002 for TechStart is overdue',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: '3',
    type: 'client',
    title: 'New Client',
    description: 'Design Co. has been added as a new client',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: '4',
    type: 'task',
    title: 'Task Due Soon',
    description: 'Website Redesign task is due in 2 days',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: '5',
    type: 'system',
    title: 'System Update',
    description: 'New features have been added to your account',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
];

interface NotificationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotificationsDialog({ open, onOpenChange }: NotificationsDialogProps) {
  const [notifications, setNotifications] = useState(mockNotifications);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'payment':
        return <DollarSign className="h-4 w-4" />;
      case 'invoice':
        return <FileText className="h-4 w-4" />;
      case 'client':
        return <User className="h-4 w-4" />;
      case 'task':
        return <Clock className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              Notifications
              {unreadCount > 0 && (
                <Badge variant="secondary">{unreadCount} new</Badge>
              )}
            </DialogTitle>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs"
              >
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Mark all as read
              </Button>
            )}
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <div className="flex h-32 items-center justify-center text-center text-sm text-muted-foreground">
                <p>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`relative rounded-lg border p-4 ${
                    notification.read ? 'bg-background' : 'bg-muted/50'
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`mt-0.5 rounded-full p-2 ${
                      notification.read ? 'bg-muted' : 'bg-primary/10'
                    }`}>
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-medium leading-none">
                            {notification.title}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {notification.description}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-2 flex items-center gap-4">
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(notification.timestamp), 'MMM dd, h:mm a')}
                        </p>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto px-2 py-1 text-xs"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}