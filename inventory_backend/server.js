const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const inventoryRoutes = require('./routes/inventory');
const invoiceRoutes = require('./routes/invoice');
const userRoutes = require('./routes/user');
const mostUsedRoutes = require('./routes/mostUsed');
const salesRoutes = require('./routes/sales');


require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());



mongoose.connect(process.env.URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('MongoDB Error:', err));

app.use('/api/inventory', inventoryRoutes);
app.use('/api/invoice', invoiceRoutes);
app.use('/api/user', userRoutes);
app.use('/api/most-used', mostUsedRoutes);
app.use('/api/sales', salesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
