const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const transactionRoutes = require('./routes/transaction.routes');
const activityRoutes = require('./routes/activity.routes');
const partnerRoutes = require('./routes/partner.routes');
const bankAccountRoutes = require('./routes/bankAccount.routes');
const { errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for uploads
app.use('/uploads', express.static('uploads'));

app.use('/api/transactions', transactionRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/bank-accounts', bankAccountRoutes);

app.use(errorHandler);

module.exports = app;
