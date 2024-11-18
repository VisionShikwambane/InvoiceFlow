import { createContext, useContext, useState } from 'react';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { ButtonProps } from '@/components/ui/button';

interface DialogProviderProps {
  children: React.ReactNode;
}

interface ConfirmDialogState {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  variant?: ButtonProps['variant'];
}

interface DialogContextValue {
  confirm: (props: Omit<ConfirmDialogState, 'open'>) => void;
}

const DialogContext = createContext<DialogContextValue | undefined>(undefined);

export function DialogProvider({ children }: DialogProviderProps) {
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>({
    open: false,
    title: '',
    description: '',
    onConfirm: () => {},
  });

  const confirm = (props: Omit<ConfirmDialogState, 'open'>) => {
    setConfirmDialog({ ...props, open: true });
  };

  const handleOpenChange = (open: boolean) => {
    setConfirmDialog((prev) => ({ ...prev, open }));
  };

  return (
    <DialogContext.Provider value={{ confirm }}>
      {children}
      <ConfirmDialog
        open={confirmDialog.open}
        onOpenChange={handleOpenChange}
        title={confirmDialog.title}
        description={confirmDialog.description}
        confirmText={confirmDialog.confirmText}
        cancelText={confirmDialog.cancelText}
        onConfirm={confirmDialog.onConfirm}
        variant={confirmDialog.variant}
      />
    </DialogContext.Provider>
  );
}

export function useConfirmDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useConfirmDialog must be used within a DialogProvider');
  }
  return context;
}