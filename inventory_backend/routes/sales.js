const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

router.get('/monthly', async (req, res) => {
  const { month, year } = req.query;
  if (!month || !year) return res.status(400).json({ message: 'Month and year required' });

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);

  try {
    const invoices = await Invoice.find({
      date: { $gte: start, $lt: end }
    });

   
    const dailySales = {};

    invoices.forEach(inv => {
      const day = inv.date.getDate();
      dailySales[day] = (dailySales[day] || 0) + inv.total;
    });

    const daysInMonth = new Date(year, month, 0).getDate();
    const labels = [];
    const salesData = [];
    let totalSales = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      labels.push(day.toString());
      const sales = dailySales[day] || 0;
      salesData.push(sales);
      totalSales += sales;
    }

   
    res.json({ 
      totalSales, 
      count: invoices.length, 
      labels, 
      salesData,
      invoices 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
