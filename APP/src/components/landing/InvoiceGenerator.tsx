import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InvoiceForm } from '@/components/invoices/InvoiceForm';
import { ModernTemplate } from '@/components/invoices/InvoiceTemplates/ModernTemplate';
import { MinimalTemplate } from '@/components/invoices/InvoiceTemplates/MinimalTemplate';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface InvoiceGeneratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InvoiceGenerator({ open, onOpenChange }: InvoiceGeneratorProps) {
  const [invoice, setInvoice] = useState({
    id: 'preview',
    number: 'INV-001',
    clientId: 'preview',
    clientName: 'John Doe',
    items: [
      {
        id: '1',
        description: 'Web Development',
        quantity: 1,
        rate: 100,
        amount: 100,
      },
    ],
    subtotal: 100,
    taxRate: 10,
    taxAmount: 10,
    total: 110,
    status: 'Unpaid',
    dueDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  });

  const [template, setTemplate] = useState('modern');
  const [downloading, setDownloading] = useState(false);

  const handleSubmit = (data: any) => {
    setInvoice((prev) => ({
      ...prev,
      ...data,
      items: data.items.map((item: any) => ({
        ...item,
        amount: parseFloat(item.quantity) * parseFloat(item.rate),
      })),
    }));
  };

  const downloadPDF = async () => {
    setDownloading(true);
    try {
      const element = document.getElementById('invoice-preview');
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`invoice-${invoice.number}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
    setDownloading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1000px] w-[95vw]">
        <DialogHeader>
          <DialogTitle>Free Invoice Generator</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Edit Invoice</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="edit">
            <InvoiceForm
              initialData={invoice}
              clients={[{ id: 'preview', name: 'John Doe' }]}
              onSubmit={handleSubmit}
              onCancel={() => onOpenChange(false)}
            />
          </TabsContent>

          <TabsContent value="preview" className="relative">
            <div className="mb-4 flex items-center justify-between">
              <select
                className="rounded-md border p-2"
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
              >
                <option value="modern">Modern Template</option>
                <option value="minimal">Minimal Template</option>
              </select>
              <Button onClick={downloadPDF} disabled={downloading}>
                <Download className="mr-2 h-4 w-4" />
                {downloading ? 'Generating PDF...' : 'Download PDF'}
              </Button>
            </div>

            <div
              id="invoice-preview"
              className="max-h-[600px] overflow-y-auto rounded-lg border bg-white p-8"
            >
              {template === 'modern' ? (
                <ModernTemplate
                  invoice={invoice}
                  companyDetails={{
                    name: 'Your Company Name',
                    address: '123 Business Street\nCity, State 12345',
                    email: 'contact@company.com',
                    phone: '+1 (555) 123-4567',
                    website: 'www.company.com',
                  }}
                />
              ) : (
                <MinimalTemplate
                  invoice={invoice}
                  companyDetails={{
                    name: 'Your Company Name',
                    address: '123 Business Street\nCity, State 12345',
                    email: 'contact@company.com',
                    phone: '+1 (555) 123-4567',
                    website: 'www.company.com',
                  }}
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}