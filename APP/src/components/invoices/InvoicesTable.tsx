import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Send, Trash2, FileCheck, Eye, ChevronRight } from 'lucide-react';
import { Invoice } from '@/types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useState } from 'react';
import { PaymentProofDialog } from './PaymentProofDialog';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface InvoicesTableProps {
  invoices: Invoice[];
  onEdit: (invoice: Invoice) => void;
  onDelete: (invoice: Invoice) => void;
  onSendReminder: (invoice: Invoice) => void;
  onVerifyPaymentProof?: (
    invoice: Invoice,
    status: 'verified' | 'rejected',
    notes: string
  ) => void;
  isAdmin?: boolean;
}

export function InvoicesTable({
  invoices,
  onEdit,
  onDelete,
  onSendReminder,
  onVerifyPaymentProof,
  isAdmin = false,
}: InvoicesTableProps) {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isPaymentProofOpen, setIsPaymentProofOpen] = useState(false);

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Unpaid':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Overdue':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getProofStatusColor = (status?: string) => {
    switch (status) {
      case 'verified':
        return 'text-green-600 dark:text-green-400';
      case 'rejected':
        return 'text-red-600 dark:text-red-400';
      case 'pending':
        return 'text-yellow-600 dark:text-yellow-400';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handlePaymentProofClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsPaymentProofOpen(true);
  };

  const handleVerifyProof = (status: 'verified' | 'rejected', notes: string) => {
    if (selectedInvoice && onVerifyPaymentProof) {
      onVerifyPaymentProof(selectedInvoice, status, notes);
    }
  };

  if (invoices.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed">
        <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
          <h3 className="mt-4 text-lg font-semibold">No invoices found</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            Create your first invoice to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile View */}
      <div className="space-y-4 md:hidden">
        {invoices.map((invoice) => (
          <motion.div
            key={invoice.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Invoice #{invoice.number}</h3>
                  <p className="text-sm text-muted-foreground">{invoice.clientName}</p>
                </div>
                <Badge className={getStatusColor(invoice.status)}>
                  {invoice.status}
                </Badge>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-medium">{formatCurrency(invoice.total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Due Date:</span>
                  <span>{format(new Date(invoice.dueDate), 'MMM dd, yyyy')}</span>
                </div>
                {invoice.paymentProof && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Payment Proof:</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn("h-8 px-2", getProofStatusColor(invoice.paymentProof.status))}
                      onClick={() => handlePaymentProofClick(invoice)}
                    >
                      <Eye className="mr-1 h-3 w-3" />
                      View
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(invoice)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                {invoice.status !== 'Paid' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSendReminder(invoice)}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(invoice)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Proof</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.number}</TableCell>
                  <TableCell>{invoice.clientName}</TableCell>
                  <TableCell>{formatCurrency(invoice.total)}</TableCell>
                  <TableCell>
                    {format(new Date(invoice.dueDate), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {invoice.paymentProof ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn("h-8", getProofStatusColor(invoice.paymentProof.status))}
                        onClick={() => handlePaymentProofClick(invoice)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Proof
                      </Button>
                    ) : (
                      <span className="text-sm text-muted-foreground">No proof uploaded</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(invoice)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      {invoice.status !== 'Paid' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onSendReminder(invoice)}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(invoice)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <PaymentProofDialog
        open={isPaymentProofOpen}
        onOpenChange={setIsPaymentProofOpen}
        paymentProof={selectedInvoice?.paymentProof}
        onVerify={handleVerifyProof}
        isAdmin={isAdmin}
      />
    </>
  );
}