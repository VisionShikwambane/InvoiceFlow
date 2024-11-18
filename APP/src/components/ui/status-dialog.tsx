import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

interface StatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  type: 'success' | 'error';
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function StatusDialog({
  open,
  onOpenChange,
  title,
  description,
  type,
  action,
}: StatusDialogProps) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      // Auto close after 3 seconds if no action is provided
      if (!action) {
        const timer = setTimeout(() => {
          onOpenChange(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [open, action, onOpenChange]);

  const handleAnimationComplete = () => {
    if (!open) {
      setShouldRender(false);
    }
  };

  if (!shouldRender) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <AnimatePresence mode="wait" onExitComplete={handleAnimationComplete}>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-4 p-6 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
                className={type === 'success' ? 'text-green-500' : 'text-destructive'}
              >
                {type === 'success' ? (
                  <CheckCircle2 className="h-12 w-12" />
                ) : (
                  <XCircle className="h-12 w-12" />
                )}
              </motion.div>

              <div className="space-y-2">
                <h2 className="text-lg font-semibold">{title}</h2>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>

              {action && (
                <Button
                  className="mt-2"
                  variant={type === 'success' ? 'default' : 'destructive'}
                  onClick={() => {
                    action.onClick();
                    onOpenChange(false);
                  }}
                >
                  {action.label}
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}