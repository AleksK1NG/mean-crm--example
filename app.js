const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const connect = require('./db');

connect();
const app = express();

// Import routes
const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');
const categoryRoutes = require('./routes/category');

app.use(passport.initialize());
require('./middlewares/passport')(passport);

app.use(morgan('dev'));
// Body Parser
app.use(express.json());

app.use(cors());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/position', positionRoutes);
app.use('/api/v1/category', categoryRoutes);

// PORT
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listen on port: ${port} `));

module.exports = app;
