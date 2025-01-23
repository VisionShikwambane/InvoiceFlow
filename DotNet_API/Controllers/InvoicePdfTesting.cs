using Microsoft.AspNetCore.Mvc;
using PuppeteerSharp;
using PuppeteerSharp.Media;
using System.Threading.Tasks;

namespace DotNet_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicePdfController : ControllerBase
    {
        [HttpGet("generate-pdf")]
        public async Task<IActionResult> GeneratePdf()
        {
            // Download the Chromium browser if not already available
            var browserFetcher = new BrowserFetcher();
            await browserFetcher.DownloadAsync();

            using var browser = await Puppeteer.LaunchAsync(new LaunchOptions { Headless = true });
            using var page = await browser.NewPageAsync();

            // Navigate to the Angular app route
            await page.GoToAsync("http://localhost:4200/template/morderntemplate", WaitUntilNavigation.Networkidle0);

            // Wait for Angular to render the `.invoice-content` element
            await page.WaitForSelectorAsync(".invoice-content");

            // Optional: Add an extra delay to ensure rendering is complete
            await Task.Delay(2000);

            // Take a screenshot for debugging (optional)
            await page.ScreenshotAsync("debug-screenshot.png");

            // Generate the PDF
            var pdfStream = await page.PdfStreamAsync(new PdfOptions
            {
                Format = PaperFormat.A4,
                PrintBackground = true
            });

            return File(pdfStream, "application/pdf", "Invoice.pdf");
        }
    }
}
