import { NextFunction, Request, Response } from "express";
import InvoiceService from "../services/invoice.service"; // Adjust the path based on your project structure
import { createInvoiceDto } from "../dtos/create-invoice.dto"; // Adjust the path for your DTO

class InvoiceController {

    static async addInvoice(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const invoiceData: createInvoiceDto = req.body;
          const invoice = await InvoiceService.addInvoice(invoiceData);
    
          res.status(201).json({
            isSuccess: true,
            message: "Invoice created successfully",
            data: invoice,
          });
        } catch (error) {
          next(error); // Pass the error to Express's error-handling middleware
        }
      }

    static async getUserInvoices(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = parseInt(req.params.userId);
            
            if (isNaN(userId)) {
                res.status(400).json({
                    isSuccess: false,
                    message: "Invalid user ID provided"
                });
                return;
            }

            const invoices = await InvoiceService.getUserInvoices(userId);
            
            res.status(200).json({
                isSuccess: true,
                message: "Invoices retrieved successfully",
                data: invoices
            });
        } catch (error: any) {
            next(error);
        }
    }

}

export default InvoiceController;
