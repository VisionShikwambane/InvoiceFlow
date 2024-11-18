import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ loading, children, className, disabled, variant, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        disabled={disabled || loading}
        variant={variant}
        className={cn(className)}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Button>
    );
  }
);