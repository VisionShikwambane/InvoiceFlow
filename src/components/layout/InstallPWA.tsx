import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { usePWA } from '@/hooks/use-pwa';

export function InstallPWA() {
  const { canInstall, installApp } = usePWA();

  if (!canInstall) return null;

  return (
    <Button
      variant="outline"
      size="sm"
      className="hidden md:flex"
      onClick={installApp}
    >
      <Download className="mr-2 h-4 w-4" />
      Install App
    </Button>
  );
}