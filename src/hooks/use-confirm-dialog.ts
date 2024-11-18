import { useState } from 'react';

interface ConfirmDialogState {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  variant?: 'default' | 'destructive';
}

export function useConfirmDialog() {
  const [dialog, setDialog] = useState<ConfirmDialogState>({
    open: false,
    title: '',
    description: '',
    onConfirm: () => {},
  });

  const confirm = ({
    title,
    description,
    confirmText,
    cancelText,
    onConfirm,
    variant,
  }: Omit<ConfirmDialogState, 'open'>) => {
    setDialog({
      open: true,
      title,
      description,
      confirmText,
      cancelText,
      onConfirm,
      variant,
    });
  };

  const onOpenChange = (open: boolean) => {
    setDialog((prev) => ({ ...prev, open }));
  };

  return {
    dialog,
    confirm,
    onOpenChange,
  };
}