import { format } from 'date-fns';
import { Invoice } from '@/types';

interface ModernTemplateProps {
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

export function ModernTemplate({ invoice, companyLogo, companyDetails }: ModernTemplateProps) {
  return (
    <div className="bg-white p-8 text-black">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          {companyLogo ? (
            <img src={companyLogo} alt="Company Logo" className="h-16 w-auto object-contain" />
          ) : (
            <h1 className="text-3xl font-bold">{companyDetails.name}</h1>
          )}
          <div className="mt-2 text-sm text-gray-600">
            <p>{companyDetails.address}</p>
            <p>{companyDetails.phone}</p>
            <p>{companyDetails.email}</p>
            {companyDetails.website && <p>{companyDetails.website}</p>}
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-bold text-gray-800">INVOICE</h2>
          <p className="mt-2 text-gray-600">#{invoice.number}</p>
          <p className="text-gray-600">
            Date: {format(new Date(invoice.createdAt), 'MMM dd, yyyy')}
          </p>
          <p className="text-gray-600">
            Due Date: {format(new Date(invoice.dueDate), 'MMM dd, yyyy')}
          </p>
        </div>
      </div>

      {/* Client Info */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800">Bill To:</h3>
        <div className="mt-2">
          <p className="font-medium">{invoice.clientName}</p>
          <p className="text-gray-600">[Client Address]</p>
          <p className="text-gray-600">[Client Email]</p>
        </div>
      </div>

      {/* Invoice Items */}
      <div className="mt-8">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200 text-left">
              <th className="pb-4 text-gray-600">Description</th>
              <th className="pb-4 text-gray-600">Quantity</th>
              <th className="pb-4 text-gray-600">Rate</th>
              <th className="pb-4 text-right text-gray-600">Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="py-4">{item.description}</td>
                <td className="py-4">{item.quantity}</td>
                <td className="py-4">${item.rate.toFixed(2)}</td>
                <td className="py-4 text-right">${item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="mt-8 flex justify-end">
        <div className="w-64">
          <div className="flex justify-between border-b border-gray-100 py-2">
            <span className="font-medium">Subtotal:</span>
            <span>${invoice.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 py-2">
            <span className="font-medium">Tax ({invoice.taxRate}%):</span>
            <span>${invoice.taxAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2 text-lg font-bold">
            <span>Total:</span>
            <span>${invoice.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="mt-8 border-t border-gray-200 pt-8">
        <h4 className="font-semibold text-gray-800">Notes:</h4>
        <p className="mt-2 text-gray-600">
          Thank you for your business. Please make payment within {format(new Date(invoice.dueDate), 'MMM dd, yyyy')}.
        </p>
      </div>

      {/* Payment Info */}
      <div className="mt-8">
        <h4 className="font-semibold text-gray-800">Payment Details:</h4>
        <div className="mt-2 text-sm text-gray-600">
          <p>Bank: [Bank Name]</p>
          <p>Account: [Account Number]</p>
          <p>SWIFT: [SWIFT Code]</p>
        </div>
      </div>
    </div>
  );
}