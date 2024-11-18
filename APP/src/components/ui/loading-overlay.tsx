import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingOverlayProps {
  loading: boolean;
  children: React.ReactNode;
  message?: string;
}

export function LoadingOverlay({ loading, children, message = 'Loading...' }: LoadingOverlayProps) {
  return (
    <div className="relative">
      {children}
      
      {loading && (
        <div className={cn(
          'absolute inset-0 z-50',
          'flex flex-col items-center justify-center',
          'bg-background/80 backdrop-blur-sm'
        )}>
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        </div>
      )}
    </div>
  );
}