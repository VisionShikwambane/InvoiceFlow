// app.js
const express = require('express');
const cors = require('cors');
const clientRoutes = require('./routes/client.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/api', clientRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
