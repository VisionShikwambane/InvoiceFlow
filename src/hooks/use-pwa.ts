import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function usePWA() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    const handleOnlineStatus = () => {
      setIsOnline(true);
      toast.success('You are back online!');
    };

    const handleOfflineStatus = () => {
      setIsOnline(false);
      toast.error('You are offline. Some features may be limited.');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOfflineStatus);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOfflineStatus);
    };
  }, []);

  const installApp = async () => {
    if (!installPrompt) return;

    const result = await installPrompt.prompt();
    if (result.outcome === 'accepted') {
      setInstallPrompt(null);
      toast.success('Thank you for installing FreelanceFlow!');
    }
  };

  return {
    canInstall: !!installPrompt,
    isOnline,
    installApp,
  };
}