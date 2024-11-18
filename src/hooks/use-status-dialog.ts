import { useState } from 'react';

interface StatusDialogState {
  open: boolean;
  title: string;
  description: string;
  type: 'success' | 'error';
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function useStatusDialog() {
  const [dialog, setDialog] = useState<StatusDialogState>({
    open: false,
    title: '',
    description: '',
    type: 'success',
  });

  const showSuccess = (title: string, description: string, action?: StatusDialogState['action']) => {
    setDialog({
      open: true,
      title,
      description,
      type: 'success',
      action,
    });
  };

  const showError = (title: string, description: string, action?: StatusDialogState['action']) => {
    setDialog({
      open: true,
      title,
      description,
      type: 'error',
      action,
    });
  };

  const onOpenChange = (open: boolean) => {
    setDialog((prev) => ({ ...prev, open }));
  };

  return {
    dialog,
    showSuccess,
    showError,
    onOpenChange,
  };
}