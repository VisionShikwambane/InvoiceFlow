// app.js
const express = require('express');
const cors = require('cors');
const invoiceRoutes = require('./routes/invoiceDetails.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/api', invoiceRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
