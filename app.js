const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Import routes
const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');
const categoryRoutes = require('./routes/category');

app.use(morgan('dev'));
// Body Parser
app.use(express.json());

app.use(cors());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/auth', analyticsRoutes);
app.use('/api/v1/auth', orderRoutes);
app.use('/api/v1/auth', positionRoutes);
app.use('/api/v1/auth', categoryRoutes);

// PORT
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listen on port: ${port} `));

module.exports = app;
