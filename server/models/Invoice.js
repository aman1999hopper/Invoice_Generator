// server/models/Invoice.js
const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  sellerDetails: {
    name: String,
    address: String,
    cityStatePincode: String,
    pan: String,
    gst: String,
  },
  placeOfSupply: String,
  billingDetails: {
    name: String,
    address: String,
    cityStatePincode: String,
    stateCode: String,
  },
  shippingDetails: {
    name: String,
    address: String,
    cityStatePincode: String,
    stateCode: String,
  },
  placeOfDelivery: String,
  orderDetails: {
    orderNo: String,
    orderDate: String,
  },
  invoiceDetails: {
    invoiceNo: String,
    invoiceDate: String,
  },
  reverseCharge: String,
items: [
    {
      description: String,
      unitPrice: Number,
      quantity: Number,
      discount: Number,
      taxRate: Number,
    },
  ],
  totalAmount: Number,
  signature: String,
});

module.exports = mongoose.model('Invoice', invoiceSchema);
