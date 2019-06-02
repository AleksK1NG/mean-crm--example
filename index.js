const express = require('express');

const app = express();

// Body Parser
app.use(express.json());

// PORT
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listen on port: ${port} `));
