import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingPaneProps {
  className?: string;
  message?: string;
}

export function LoadingPane({ className, message = 'Loading...' }: LoadingPaneProps) {
  return (
    <div className={cn(
      'flex min-h-[400px] flex-col items-center justify-center gap-2',
      'rounded-lg border border-dashed',
      className
    )}>
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}