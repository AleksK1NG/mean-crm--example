const express = require('express');

const app = express();

// Import routes
const authRoutes = require('./routes/auth');

// Body Parser
app.use(express.json());


// Routes
app.use('/api/v1/auth', authRoutes);


// PORT
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listen on port: ${port} `));

module.exports = app;
