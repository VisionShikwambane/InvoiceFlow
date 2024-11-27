// const { Client } = require('../../../API_OLD/models');
// const ClientService = require('../../../API_OLD/services/ClientService');
// const puppeteer = require('puppeteer');

// const getAllClients = async (req, res) => {
//     const clients = await Client.findAll();
//     res.json(clients);
// };

// const addClient = async (req, res) => {
//     try {
//       const {id,  name, email, phone, status } = req.body;
//       const newClient = await ClientService.addClient({id, name, email, phone, status });
  
//       res.status(201).json({
//         isSuccess: true,
//         message: 'Client added successfully',
//         data: newClient,
//       });

//     } catch (error) {
//       res.status(500).json({
//         message: `Error adding client: ${error.message}`,
//       });
//     }
//   };

//   const deleteClient = async (req, res) => {
//     try {
//       const { id } = req.params; // Get client ID from URL params
//       const result = await ClientService.deleteClient(id);
  
//       res.status(200).json({
//         isSuccess: true,
//         message: result.message,
//       });
//     } catch (error) {
//       res.status(500).json({
//         message: `Error deleting client: ${error.message}`,
//       });
//     }
//   };


  
//   const generateClientsPDF = async (req, res) => {
//       try {
//           // Define the URL to navigate to
//           const invoiceURL = 'http://localhost:4200/template/morderntemplate';
  
//           // Launch Puppeteer
//           const browser = await puppeteer.launch({
//               headless: true,
//               args: ['--no-sandbox', '--disable-setuid-sandbox'],
//           });
//           const page = await browser.newPage();
  
//           console.log('Navigating to the URL...');
//           await page.goto(invoiceURL, {
//               waitUntil: 'networkidle2', // Wait until the page is fully loaded
//           });
  
//           console.log('Generating PDF...');
//           const pdfBuffer = await page.pdf({
//               format: 'A4',
//               printBackground: true,
//               margin: {
//                 top: '5mm',
//                 bottom: '5mm',
//                 left: '5mm',
//                 right: '5mm',
//             },
//           });
  
//           console.log('Saving PDF locally...');
//           require('fs').writeFileSync('debug.pdf', pdfBuffer);
  
//           console.log('Sending PDF response...');
//           res.set({
//               'Content-Type': 'application/pdf',
//               'Content-Disposition': 'inline; filename="Invoice_Report.pdf"',
//           });
//           res.send(pdfBuffer);
  
//           await browser.close();
//       } catch (error) {
//           console.error('Error generating PDF:', error);
//           res.status(500).send(`Failed to generate PDF: ${error.message}`);
//       }
//   };
  
//   module.exports = { generateClientsPDF };
  




  

// module.exports = { getAllClients, addClient, deleteClient, generateClientsPDF };