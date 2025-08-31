// 1. Import the express library
const express = require('express');

// 2. Create an instance of an Express application
const app = express();

// This line tells Express to serve files from the 'public' directory
app.use(express.static('public'));


// Start server
const PORT = process.env.PORT || 3000;

// Tell the app to listen for connections
app.listen(PORT, () => {
    console.log(`FaceFlow AI backend running at http://localhost:${PORT}`);
});
