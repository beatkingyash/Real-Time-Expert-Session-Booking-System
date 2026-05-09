const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();
connectDB();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
cors: { origin: '*' }
});
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {

req.io = io;
next();
});
app.use('/api/experts', require('./routes/expertRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
server.listen(process.env.PORT, () => {
console.log(`Server running on port ${process.env.PORT}`);
});