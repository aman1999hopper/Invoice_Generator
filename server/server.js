// server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const invoiceRoutes = require('./routes/invoiceRoutes');
const app = express();
const PORT = 5000;
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/invoices', invoiceRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
