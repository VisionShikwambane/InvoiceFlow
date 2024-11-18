import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Invoice } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InvoiceTemplateCustomizer } from './InvoiceTemplateCustomizer';
import { Plus, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

const invoiceItemSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  quantity: z.string().min(1, 'Quantity is required'),
  rate: z.string().min(1, 'Rate is required'),
});

const formSchema = z.object({
  number: z.string().min(1, 'Invoice number is required'),
  clientId: z.string().min(1, 'Client is required'),
  items: z.array(invoiceItemSchema).min(1, 'At least one item is required'),
  taxRate: z.string().default('0'),
  status: z.enum(['Paid', 'Unpaid', 'Overdue']),
  dueDate: z.string().min(1, 'Due date is required'),
});

interface InvoiceFormProps {
  initialData?: Partial<Invoice>;
  clients: Array<{ id: string; name: string }>;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  onCancel: () => void;
}

export function InvoiceForm({ initialData, clients, onSubmit, onCancel }: InvoiceFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      number: '',
      clientId: '',
      items: [{ description: '', quantity: '1', rate: '0' }],
      taxRate: '0',
      status: 'Unpaid',
      dueDate: new Date().toISOString().split('T')[0],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const calculateSubtotal = () => {
    return fields.reduce((sum, item, index) => {
      const quantity = parseFloat(form.watch(`items.${index}.quantity`) || '0');
      const rate = parseFloat(form.watch(`items.${index}.rate`) || '0');
      return sum + (quantity * rate);
    }, 0);
  };

  const calculateTax = (subtotal: number) => {
    const taxRate = parseFloat(form.watch('taxRate') || '0');
    return (subtotal * taxRate) / 100;
  };

  const subtotal = calculateSubtotal();
  const taxAmount = calculateTax(subtotal);
  const total = subtotal + taxAmount;

  const mockInvoice: Invoice = {
    id: '1',
    number: form.watch('number') || 'PREVIEW-001',
    clientId: form.watch('clientId'),
    clientName: clients.find(c => c.id === form.watch('clientId'))?.name || 'Preview Client',
    items: fields.map((field, index) => ({
      id: field.id,
      description: form.watch(`items.${index}.description`) || '',
      quantity: parseFloat(form.watch(`items.${index}.quantity`) || '0'),
      rate: parseFloat(form.watch(`items.${index}.rate`) || '0'),
      amount: parseFloat(form.watch(`items.${index}.quantity`) || '0') * 
              parseFloat(form.watch(`items.${index}.rate`) || '0'),
    })),
    subtotal,
    taxRate: parseFloat(form.watch('taxRate') || '0'),
    taxAmount,
    total,
    status: form.watch('status') as Invoice['status'],
    dueDate: form.watch('dueDate'),
    createdAt: new Date().toISOString(),
  };

  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="details">Invoice Details</TabsTrigger>
        <TabsTrigger value="template">Template</TabsTrigger>
      </TabsList>

      <TabsContent value="details">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Invoice Number</FormLabel>
                    <FormControl>
                      <Input placeholder="INV-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select client" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Card className="p-4">
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                      <FormField
                        control={form.control}
                        name={`items.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-2">
                      <FormField
                        control={form.control}
                        name={`items.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                              <Input type="number" min="1" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-3">
                      <FormField
                        control={form.control}
                        name={`items.${index}.rate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Rate</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" step="0.01" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="col-span-1 flex items-end">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="mb-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => append({ description: '', quantity: '1', rate: '0' })}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="taxRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Rate (%)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="100" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Card className="p-4">
              <div className="space-y-2 text-right">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax ({form.watch('taxRate')}%):</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </Card>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="template" className="h-[800px] overflow-y-auto">
        <InvoiceTemplateCustomizer
          invoice={mockInvoice}
          onSave={() => form.handleSubmit(onSubmit)()}
        />
      </TabsContent>
    </Tabs>
  );
}