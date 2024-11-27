import { NextFunction, Request, Response } from "express";
import InvoiceService from "../services/invoice.service"; // Adjust the path based on your project structure
import { createInvoiceDto } from "../dtos/create-invoice.dto"; // Adjust the path for your DTO

class InvoiceController {

    static async addInvoice(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
          const invoiceData: createInvoiceDto = req.body;
          const invoice = await InvoiceService.addInvoice(invoiceData);
    
          res.status(201).json({
            message: "Invoice created successfully",
            data: invoice,
          });
        } catch (error) {
          next(error); // Pass the error to Express's error-handling middleware
        }
      }

}

export default InvoiceController;
