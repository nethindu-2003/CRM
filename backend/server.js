require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { sequelize } = require('./models');

// Routes
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const leadRoutes = require('./routes/leadRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/leads', leadRoutes);

const PORT = process.env.PORT || 5001;

// Sync database and start server
sequelize.sync().then(() => {
  console.log('Database connected and models synced');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to sync database:', error);
});
