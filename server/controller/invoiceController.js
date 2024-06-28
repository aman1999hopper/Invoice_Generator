// server/controllers/invoiceController.js
const Invoice = require('../models/Invoice');
const PDFDocument = require('pdfkit');
const num2words = require('num2words');

exports.createInvoice = async (req, res) => {
  const invoiceData = req.body;

  // Save invoice data to MongoDB
  const invoice = new Invoice(invoiceData);
  await invoice.save();

  // Generate PDF
  const doc = new PDFDocument({ margin: 50 });
  doc.pipe(res);

  // Define styles
  const headingFontSize = 20;
  const subheadingFontSize = 12;
  const textFontSize = 10;
  const lineHeight = 14;

  // Add the invoice details to the PDF
  doc.fontSize(headingFontSize).text('Invoice', { align: 'center' });

  doc.moveDown(2);

  // Seller details
  doc.fontSize(subheadingFontSize).text('Seller Details', { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(textFontSize).text(`Name: ${invoice.sellerDetails.name}`);
  doc.text(`Address: ${invoice.sellerDetails.address}`);
  doc.text(`City, State, Pincode: ${invoice.sellerDetails.cityStatePincode}`);
  doc.text(`PAN: ${invoice.sellerDetails.pan}`);
  doc.text(`GST: ${invoice.sellerDetails.gst}`);

  doc.moveDown();

  // Place of supply
  doc.fontSize(subheadingFontSize).text('Place of Supply', { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(textFontSize).text(invoice.placeOfSupply);

  doc.moveDown();

  // Billing details
  doc.fontSize(subheadingFontSize).text('Billing Details', { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(textFontSize).text(`Name: ${invoice.billingDetails.name}`);
  doc.text(`Address: ${invoice.billingDetails.address}`);
  doc.text(`City, State, Pincode: ${invoice.billingDetails.cityStatePincode}`);
  doc.text(`State Code: ${invoice.billingDetails.stateCode}`);

  doc.moveDown();

  // Shipping details
  doc.fontSize(subheadingFontSize).text('Shipping Details', { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(textFontSize).text(`Name: ${invoice.shippingDetails.name}`);
  doc.text(`Address: ${invoice.shippingDetails.address}`);
  doc.text(`City, State, Pincode: ${invoice.shippingDetails.cityStatePincode}`);
  doc.text(`State Code: ${invoice.shippingDetails.stateCode}`);

  doc.moveDown();

  // Place of delivery
  doc.fontSize(subheadingFontSize).text('Place of Delivery', { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(textFontSize).text(invoice.placeOfDelivery);

  doc.moveDown();

  // Order details
  doc.fontSize(subheadingFontSize).text('Order Details', { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(textFontSize).text(`Order No: ${invoice.orderDetails.orderNo}`);
  doc.text(`Order Date: ${invoice.orderDetails.orderDate}`);

  doc.moveDown();

  // Items table
  doc.fontSize(subheadingFontSize).text('Items', { underline: true });
  doc.moveDown(0.5);
  doc.fontSize(textFontSize);

  const tableTop = doc.y;
  const itemDescriptionX = 50;
  const itemUnitPriceX = 200;
  const itemQuantityX = 300;
  const itemDiscountX = 350;
  const itemNetAmountX = 400;
  const itemTotalAmountX = 400;

  doc.text('Description', itemDescriptionX, tableTop);
  doc.text('Unit Price', itemUnitPriceX, tableTop);
  doc.text('Quantity', itemQuantityX, tableTop);
  doc.text('Discount', itemDiscountX, tableTop);
  doc.text('Net Amount', itemNetAmountX, tableTop);

  doc.moveDown(0.5);

  invoice.items.forEach((item, i) => {
    const y = tableTop + (i + 1) * lineHeight;
    doc.text(item.description, itemDescriptionX, y);
    doc.text(item.unitPrice, itemUnitPriceX, y);
    doc.text(item.quantity, itemQuantityX, y);
    doc.text(item.discount, itemDiscountX, y);
    doc.text((item.unitPrice * item.quantity - item.discount).toFixed(2), itemNetAmountX, y);
  });

  doc.moveDown(2);
  // Display total amount
  const totalAmountY = tableTop + (invoice.items.length + 2) * lineHeight;
  doc.fontSize(subheadingFontSize).text('Total Amount', itemDescriptionX, totalAmountY);
  doc.text(`${invoice.totalAmount.toFixed(2)}`, itemNetAmountX, totalAmountY);
  // Add signature section
  doc.moveDown(4);
  doc.fontSize(subheadingFontSize).text('Signature', { underline: true });
  doc.moveDown(0.5);

  // Save the PDF and send as response
  doc.end();
};
