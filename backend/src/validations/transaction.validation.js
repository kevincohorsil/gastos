const { z } = require('zod');

const transactionSchema = z.object({
  type: z.enum(['INGRESO', 'GASTO', 'APORTACION', 'RETIRO_SOCIO', 'TRANSFERENCIA']),
  amount: z.string().or(z.number()),
  description: z.string().min(1, 'Description is required'),
  date: z.string().min(1, 'Date is required'),
  category: z.string().min(1, 'Category is required'),
  clientOrSupplier: z.string().optional(),
  activityId: z.string().or(z.number()).optional(),
  bankAccountId: z.string().or(z.number()).optional(),
  partnerId: z.string().or(z.number()).optional(),
});

const validateTransaction = (req, res, next) => {
  try {
    transactionSchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      data: error.errors
    });
  }
};

module.exports = { validateTransaction };
