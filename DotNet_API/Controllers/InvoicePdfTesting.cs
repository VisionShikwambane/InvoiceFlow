using Microsoft.AspNetCore.Mvc;
using DinkToPdf;
using DinkToPdf.Contracts;
using System.Drawing;

[Route("api/[controller]")]
[ApiController]
public class InvoicePdfTesting : ControllerBase
{
    private readonly IConverter _converter;

    public InvoicePdfTesting(IConverter converter)
    {
        _converter = converter;
    }

    [HttpGet("generate-pdf")]
    public IActionResult GeneratePdf()
    {
        var html = @"
        <html>
            <head>
                <style>
                    body { font-family: Arial; }
                    .invoice-box { max-width: 800px; margin: auto; padding: 30px; }
                    .header { text-align: center; font-size: 24px; margin-bottom: 30px; }
                    .info { margin-bottom: 20px; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { padding: 12px; text-align: left; border: 1px solid #ddd; }
                    th { background-color: #f8f9fa; }
                    .total { margin-top: 20px; font-weight: bold; text-align: right; }
                </style>
            </head>
            <body>
                <div class='invoice-box'>
                    <div class='header'>INVOICE</div>
                    <div class='info'>
                        <p><strong>Invoice #:</strong> INV-001</p>
                        <p><strong>Date:</strong> " + DateTime.Now.ToString("dd/MM/yyyy") + @"</p>
                        <p><strong>Customer:</strong> John Doe</p>
                    </div>
                    <table>
                        <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                        <tr>
                            <td>Product A</td>
                            <td>2</td>
                            <td>$50.00</td>
                            <td>$100.00</td>
                        </tr>
                    </table>
                    <div class='total'>Total Amount: $100.00</div>
                </div>
            </body>
        </html>";

        var doc = new HtmlToPdfDocument()
        {
            GlobalSettings = {
                ColorMode = ColorMode.Color,
                Orientation = Orientation.Portrait,
                PaperSize = PaperKind.A4,
                Margins = new MarginSettings { Top = 10, Bottom = 10 }
            },
            Objects = {
                new ObjectSettings() {
                    PagesCount = true,
                    HtmlContent = html,
                    WebSettings = { DefaultEncoding = "utf-8" }
                }
            }
        };

        byte[] pdf = _converter.Convert(doc);
        return File(pdf, "application/pdf", "invoice.pdf");
    }
}