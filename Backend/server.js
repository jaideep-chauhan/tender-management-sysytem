const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const connectDB = require('./src/config/db');
const tenderRoutes = require('./src/routes/tenderRoutes');
const bidRoutes = require('./src/routes/bidRoutes');
const errorMiddleware = require('./src/middlewares/errorMiddleware');
const { initializeSocket } = require('./src/utils/socketUtils');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tenders', tenderRoutes);
app.use('/api/bids', bidRoutes);

// Error middleware
app.use(errorMiddleware);

// Create server and attach Socket.IO
const server = http.createServer(app);
initializeSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
