// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set MIME types for JavaScript modules
app.use((req, res, next) => {
  if (req.url.endsWith('.js')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});

// Serve static files from the dist directory first (obfuscated files)
app.use('/Employer_Side', express.static(path.join(__dirname, 'dist/Employer_Side')));
app.use('/User', express.static(path.join(__dirname, 'dist/User')));

// Then serve original files for anything not in dist
app.use('/Employer_Side', express.static(path.join(__dirname, 'Employer_Side')));
app.use('/User', express.static(path.join(__dirname, 'User')));

// Handle the case with space in URL
app.use('/Employer%20Side', (req, res) => {
  const correctedPath = req.url;
  res.redirect('/Employer_Side' + correctedPath);
});

// Handle POST requests to login pages
app.post('/Employer_Side/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Employer_Side', 'login.html'));
});

app.post('/User/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'User', 'login.html'));
});

// Explicitly serve HTML files
app.get('/Employer_Side/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Employer_Side', 'dashboard.html'));
});

app.get('/Employer_Side/jobs.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Employer_Side', 'jobs.html'));
});

app.get('/Employer_Side/applicants.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Employer_Side', 'applicants.html'));
});

app.get('/Employer_Side/profile.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Employer_Side', 'profile.html'));
});

app.get('/Employer_Side/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Employer_Side', 'login.html'));
});

// Default routes
app.get('/Employer_Side', (req, res) => {
  res.redirect('/Employer_Side/login.html');
});

app.get('/User', (req, res) => {
  res.redirect('/User/login.html');
});

app.get('/', (req, res) => {
  res.redirect('/User/login.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});