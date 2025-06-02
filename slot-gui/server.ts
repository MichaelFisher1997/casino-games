const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the "dist" folder (Vite build output)
app.use(express.static(path.join(__dirname, 'dist')));

// React Router fallback: always serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

