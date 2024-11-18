import { format } from 'date-fns';
import { Invoice } from '@/types';

interface MinimalTemplateProps {
  invoice: Invoice;
  companyLogo?: string;
  companyDetails: {
    name: string;
    address: string;
    email: string;
    phone: string;
    website?: string;
  };
}

export function MinimalTemplate({ invoice, companyLogo, companyDetails }: MinimalTemplateProps) {
  return (
    <div className="bg-white p-8 text-black">
      {/* Header */}
      <div className="border-b border-gray-200 pb-8">
        <div className="flex justify-between">
          <div>
            {companyLogo ? (
              <img src={companyLogo} alt="Company Logo" className="h-12 w-auto object-contain" />
            ) : (
              <h1 className="text-2xl font-medium">{companyDetails.name}</h1>
            )}
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-medium">Invoice #{invoice.number}</h2>
            <p className="mt-1 text-sm text-gray-600">
              {format(new Date(invoice.createdAt), 'MMMM dd, yyyy')}
            </p>
          </div>
        </div>
      </div>

      {/* Addresses */}
      <div className="mt-8 grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-xs font-medium uppercase text-gray-500">From</h3>
          <div className="mt-2 text-sm">
            <p>{companyDetails.name}</p>
            <p className="mt-1 text-gray-600">{companyDetails.address}</p>
            <p className="text-gray-600">{companyDetails.phone}</p>
            <p className="text-gray-600">{companyDetails.email}</p>
            {companyDetails.website && (
              <p className="text-gray-600">{companyDetails.website}</p>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-xs font-medium uppercase text-gray-500">Bill To</h3>
          <div className="mt-2 text-sm">
            <p>{invoice.clientName}</p>
            <p className="mt-1 text-gray-600">[Client Address]</p>
            <p className="text-gray-600">[Client Email]</p>
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="mt-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-y border-gray-200 text-left text-xs uppercase text-gray-500">
              <th className="py-3">Description</th>
              <th className="py-3">Qty</th>
              <th className="py-3">Rate</th>
              <th className="py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <tr key={item.id}>
                <td className="py-4">{item.description}</td>
                <td className="py-4">{item.quantity}</td>
                <td className="py-4">${item.rate.toFixed(2)}</td>
                <td className="py-4 text-right">${item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-gray-200">
              <td colSpan={3} className="py-4 text-right">Subtotal</td>
              <td className="py-4 text-right">${invoice.subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan={3} className="py-4 text-right">Tax ({invoice.taxRate}%)</td>
              <td className="py-4 text-right">${invoice.taxAmount.toFixed(2)}</td>
            </tr>
            <tr className="font-medium">
              <td colSpan={3} className="py-4 text-right">Total</td>
              <td className="py-4 text-right">${invoice.total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Payment Terms */}
      <div className="mt-8 text-sm">
        <h4 className="font-medium">Payment Terms</h4>
        <p className="mt-2 text-gray-600">
          Please pay within {format(new Date(invoice.dueDate), 'MMMM dd, yyyy')}
        </p>
      </div>

      {/* Bank Details */}
      <div className="mt-8 text-sm">
        <h4 className="font-medium">Bank Details</h4>
        <div className="mt-2 text-gray-600">
          <p>Bank: [Bank Name]</p>
          <p>Account: [Account Number]</p>
          <p>SWIFT: [SWIFT Code]</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 border-t border-gray-200 pt-8 text-center text-xs text-gray-600">
        <p>Thank you for your business!</p>
      </div>
    </div>
  );
}