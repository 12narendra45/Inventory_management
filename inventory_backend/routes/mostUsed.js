const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');

router.get('/', async (req, res) => {
  try {
    const result = await Invoice.aggregate([
      {
        $group: {
          _id: '$medicineName',
          totalUsed: { $sum: '$quantity' }
        }
      },
      { $sort: { totalUsed: -1 } },
      { $limit: 10 }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
