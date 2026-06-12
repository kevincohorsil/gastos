const { z } = require('zod');

const activitySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  status: z.enum(['ACTIVO', 'FINALIZADO']).optional(),
  profitPercentage: z.preprocess((val) => (val === '' || val == null) ? undefined : Number(val), z.number().min(0).max(100).optional())
});

const validateActivity = (req, res, next) => {
  try {
    req.body = activitySchema.parse(req.body);
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      data: error.errors
    });
  }
};

module.exports = { validateActivity };
