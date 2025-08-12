const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  medicineName: { type: String, required: true },
  quantity: { type: Number, required: true },
  pricePerUnit: { type: Number, required: true },
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
