import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BackButton } from '@/components/ui/back-button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { InvoicesTable } from '@/components/invoices/InvoicesTable';
import { InvoiceDialog } from '@/components/invoices/InvoiceDialog';
import { Invoice, PaymentProof } from '@/types';
import { useToast } from '@/hooks/use-toast';

const pageAnimations = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function Invoices() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | undefined>();
  const { toast } = useToast();

  // Mock data - replace with actual data fetching
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      number: 'INV-001',
      clientId: '1',
      clientName: 'John Smith',
      items: [
        {
          id: '1',
          description: 'Website Development',
          quantity: 1,
          rate: 1500,
          amount: 1500,
        }
      ],
      subtotal: 1500,
      taxRate: 10,
      taxAmount: 150,
      total: 1650,
      status: 'Unpaid',
      dueDate: '2024-02-28',
      createdAt: new Date().toISOString(),
    },
  ]);

  const [clients] = useState([
    { id: '1', name: 'John Smith' },
    { id: '2', name: 'Jane Doe' },
  ]);

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.number.toLowerCase().includes(search.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' ? true : invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = (data: any) => {
    console.log(data);
    setIsDialogOpen(false);
    setSelectedInvoice(undefined);
    toast({
      title: 'Success',
      description: selectedInvoice
        ? 'Invoice updated successfully'
        : 'Invoice created successfully',
    });
  };

  const handleEdit = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsDialogOpen(true);
  };

  const handleDelete = (invoice: Invoice) => {
    setInvoices(invoices.filter((i) => i.id !== invoice.id));
    toast({
      title: 'Success',
      description: 'Invoice deleted successfully',
    });
  };

  const handleSendReminder = (invoice: Invoice) => {
    toast({
      title: 'Success',
      description: 'Payment reminder sent successfully',
    });
  };

  const handleUploadPaymentProof = async (
    invoice: Invoice,
    file: File,
    notes: string
  ) => {
    // In a real app, you would upload the file to a storage service
    // and get back a URL. Here we're creating a temporary URL.
    const fileUrl = URL.createObjectURL(file);

    const paymentProof: PaymentProof = {
      id: Date.now().toString(),
      invoiceId: invoice.id,
      fileUrl,
      fileName: file.name,
      fileType: file.type,
      uploadedAt: new Date().toISOString(),
      status: 'pending',
      notes,
    };

    setInvoices(
      invoices.map((i) =>
        i.id === invoice.id
          ? { ...i, paymentProof, status: 'Paid' }
          : i
      )
    );

    toast({
      title: 'Success',
      description: 'Payment proof uploaded successfully',
    });
  };

  const handleVerifyPaymentProof = (
    invoice: Invoice,
    status: 'verified' | 'rejected',
    notes: string
  ) => {
    setInvoices(
      invoices.map((i) =>
        i.id === invoice.id && i.paymentProof
          ? {
              ...i,
              status: status === 'verified' ? 'Paid' : 'Unpaid',
              paymentProof: {
                ...i.paymentProof,
                status,
                notes: notes || i.paymentProof.notes,
                verifiedAt: new Date().toISOString(),
              },
            }
          : i
      )
    );

    toast({
      title: 'Success',
      description: `Payment proof ${status}`,
    });
  };

  return (
    <motion.div
      variants={pageAnimations}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <BackButton className="md:hidden" />
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
            <p className="text-muted-foreground">
              Create and manage your client invoices.
            </p>
          </div>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} className="md:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      <motion.div variants={itemAnimation} className="flex flex-col gap-4 md:flex-row md:items-center">
        <Input
          placeholder="Search invoices..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:max-w-xs"
        />
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="md:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Paid">Paid</SelectItem>
            <SelectItem value="Unpaid">Unpaid</SelectItem>
            <SelectItem value="Overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div variants={itemAnimation}>
        <InvoicesTable
          invoices={filteredInvoices}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSendReminder={handleSendReminder}
          onUploadPaymentProof={handleUploadPaymentProof}
          onVerifyPaymentProof={handleVerifyPaymentProof}
          isAdmin={true} // Set this based on user role
        />
      </motion.div>

      <InvoiceDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        initialData={selectedInvoice}
        clients={clients}
        onSubmit={handleSubmit}
      />
    </motion.div>
  );
}