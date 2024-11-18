import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ModernTemplate } from './InvoiceTemplates/ModernTemplate';
import { MinimalTemplate } from './InvoiceTemplates/MinimalTemplate';
import { Invoice } from '@/types';
import { Eye } from 'lucide-react';

interface InvoiceTemplateCustomizerProps {
  invoice?: Partial<Invoice>;
  onSave: () => void;
}

export function InvoiceTemplateCustomizer({ invoice, onSave }: InvoiceTemplateCustomizerProps) {
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [companyLogo, setCompanyLogo] = useState<string>();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [companyDetails, setCompanyDetails] = useState({
    name: 'Your Company Name',
    address: '123 Business Street\nCity, State 12345',
    email: 'contact@company.com',
    phone: '+1 (555) 123-4567',
    website: 'www.company.com',
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanyLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompanyDetailChange = (key: keyof typeof companyDetails, value: string) => {
    setCompanyDetails((prev) => ({ ...prev, [key]: value }));
  };

  // Create a mock invoice if none is provided
  const previewInvoice: Invoice = {
    id: invoice?.id || 'preview',
    number: invoice?.number || 'PREVIEW-001',
    clientId: invoice?.clientId || 'preview',
    clientName: invoice?.clientName || 'Preview Client',
    items: invoice?.items || [
      {
        id: 'preview-1',
        description: 'Sample Item',
        quantity: 1,
        rate: 100,
        amount: 100,
      }
    ],
    subtotal: invoice?.subtotal || 100,
    taxRate: invoice?.taxRate || 10,
    taxAmount: invoice?.taxAmount || 10,
    total: invoice?.total || 110,
    status: invoice?.status || 'Unpaid',
    dueDate: invoice?.dueDate || new Date().toISOString(),
    createdAt: invoice?.createdAt || new Date().toISOString(),
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Template Settings</h3>
          <Button onClick={() => setIsPreviewOpen(true)} variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview Template
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Template Style</Label>
            <Select
              value={selectedTemplate}
              onValueChange={setSelectedTemplate}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="modern">Modern Template</SelectItem>
                <SelectItem value="minimal">Minimal Template</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Company Logo</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Company Name</Label>
            <Input
              value={companyDetails.name}
              onChange={(e) => handleCompanyDetailChange('name', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Company Address</Label>
            <Input
              value={companyDetails.address}
              onChange={(e) => handleCompanyDetailChange('address', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={companyDetails.email}
              onChange={(e) => handleCompanyDetailChange('email', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Phone</Label>
            <Input
              value={companyDetails.phone}
              onChange={(e) => handleCompanyDetailChange('phone', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Website</Label>
            <Input
              value={companyDetails.website}
              onChange={(e) => handleCompanyDetailChange('website', e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <Button onClick={onSave} className="w-full">
          Save Template
        </Button>
      </div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-[850px] w-[90vw]">
          <DialogHeader>
            <DialogTitle>Invoice Preview</DialogTitle>
          </DialogHeader>
          <div className="max-h-[80vh] overflow-y-auto p-6 bg-white rounded-lg">
            {selectedTemplate === 'modern' ? (
              <ModernTemplate
                invoice={previewInvoice}
                companyLogo={companyLogo}
                companyDetails={companyDetails}
              />
            ) : (
              <MinimalTemplate
                invoice={previewInvoice}
                companyLogo={companyLogo}
                companyDetails={companyDetails}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}