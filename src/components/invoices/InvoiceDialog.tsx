import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { InvoiceForm } from './InvoiceForm';
import { InvoiceTemplateCustomizer } from './InvoiceTemplateCustomizer';
import { Invoice } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface InvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<Invoice>;
  clients: Array<{ id: string; name: string }>;
  onSubmit: (data: any) => void;
}

export function InvoiceDialog({
  open,
  onOpenChange,
  initialData,
  clients,
  onSubmit,
}: InvoiceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {initialData?.id ? 'Edit Invoice' : 'Create Invoice'}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Invoice Details</TabsTrigger>
            <TabsTrigger value="template">Template</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-4">
            <InvoiceForm
              initialData={initialData}
              clients={clients}
              onSubmit={onSubmit}
              onCancel={() => onOpenChange(false)}
            />
          </TabsContent>

          <TabsContent value="template" className="mt-4">
            <InvoiceTemplateCustomizer
              invoice={initialData as Invoice}
              onSave={() => onSubmit(initialData)}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}