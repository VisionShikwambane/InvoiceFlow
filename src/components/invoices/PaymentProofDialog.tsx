import { useState } from 'react';
import { format } from 'date-fns';
import { FileCheck, FileX, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PaymentProof } from '@/types';
import { cn } from '@/lib/utils';

interface PaymentProofDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentProof?: PaymentProof;
  onVerify?: (status: 'verified' | 'rejected', notes: string) => void;
  isAdmin?: boolean;
}

export function PaymentProofDialog({
  open,
  onOpenChange,
  paymentProof,
  onVerify,
  isAdmin = false,
}: PaymentProofDialogProps) {
  const [verificationNotes, setVerificationNotes] = useState('');

  const handleVerify = (status: 'verified' | 'rejected') => {
    if (onVerify) {
      onVerify(status, verificationNotes);
      setVerificationNotes('');
      onOpenChange(false);
    }
  };

  if (!paymentProof) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Proof</DialogTitle>
            <DialogDescription>
              No payment proof has been uploaded yet by the client.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Payment Proof</DialogTitle>
          <DialogDescription>
            View payment proof uploaded by the client
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{paymentProof.fileName}</span>
              </div>
              <Badge
                className={cn(
                  paymentProof.status === 'verified'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : paymentProof.status === 'rejected'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                )}
              >
                {paymentProof.status}
              </Badge>
            </div>
            
            <div className="mt-2 text-sm text-muted-foreground">
              Uploaded on {format(new Date(paymentProof.uploadedAt), 'PPP')}
            </div>
            
            {paymentProof.notes && (
              <div className="mt-2 text-sm">{paymentProof.notes}</div>
            )}

            {paymentProof.verifiedAt && (
              <div className="mt-2 text-sm text-muted-foreground">
                Verified on {format(new Date(paymentProof.verifiedAt), 'PPP')}
              </div>
            )}
          </div>

          {paymentProof.fileType.startsWith('image/') ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
              <img
                src={paymentProof.fileUrl}
                alt="Payment Proof"
                className="h-full w-full object-contain"
              />
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.open(paymentProof.fileUrl, '_blank')}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              View Document
            </Button>
          )}

          {isAdmin && paymentProof.status === 'pending' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Verification Notes</Label>
                <Textarea
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                  placeholder="Add notes about the verification..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="destructive"
                  onClick={() => handleVerify('rejected')}
                >
                  <FileX className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button onClick={() => handleVerify('verified')}>
                  <FileCheck className="mr-2 h-4 w-4" />
                  Verify
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}