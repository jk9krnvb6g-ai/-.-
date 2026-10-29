
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Handle uncaught exceptions to prevent server from crashing immediately
process.on('uncaughtException', (err) => {
    console.error('CRITICAL ERROR (Uncaught Exception):', err);
    console.error('The server is still running, but check the error above.');
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('CRITICAL ERROR (Unhandled Rejection):', reason);
});

const app = express();
const port = 3002;

// Middleware Global
app.use(cors({ origin: true, methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'], credentials: true }));
app.use(bodyParser.json());

// ==========================================
// 🚀 ROUTING HUB (API GATEWAY)
// ==========================================
// ตรงนี้คือจุดรวมระบบต่างๆ โดยใช้ Port 3002 Port เดียว

// 1. ระบบ Procurement (จัดซื้อ)
// URL: http://localhost:3002/api/procurement/...
const procurementRoutes = require('./routes/procurement');
app.use('/api/procurement', procurementRoutes);

// --- ROOT ROUTE ---
app.get('/', (req, res) => {
    res.send(`
        <h1>Backend Gateway v2.2 Online</h1>
        <p>Running on Port: ${port}</p>
        <p style="color:green">✔ Thai Language Support: Enforced (UTF8MB4)</p>
        <hr>
        <h3>Available Systems:</h3>
        <ul>
            <li><a href="/api/procurement/data">Procurement System</a> (/api/procurement)</li>
        </ul>
    `);
});

// Start Server
app.listen(port, () => {
    console.log(`🚀 API Gateway running on port ${port}`);
    console.log(`✅ Thai Language Support Patch Applied (v2.2)`);
    console.log(`   > Procurement System mounted at: http://localhost:${port}/api/procurement`);
});
