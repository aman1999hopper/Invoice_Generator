// server/routes/invoiceRoutes.js
const express = require('express');
const router = express.Router();
const invoiceController = require('../controller/invoiceController');

router.post('/', invoiceController.createInvoice);

module.exports = router;
