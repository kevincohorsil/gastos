const activityRepository = require('../repositories/activity.repository');
const transactionRepository = require('../repositories/transaction.repository');

class ActivityService {
  async getAllActivities() {
    const activities = await activityRepository.findAll();
    
    // Calculate summary per activity
    const transactions = await transactionRepository.findAllRaw();
    
    const activitiesWithSummary = activities.map(act => {
      const actId = act.id;
      const actTransactions = transactions.filter(t => t.activityId === actId);
      
      let totalIngresos = 0;
      let totalGastos = 0;
      
      actTransactions.forEach(t => {
        const amount = parseFloat(t.amount);
        if (t.type === 'INGRESO') totalIngresos += amount;
        else totalGastos += amount;
      });
      
      return {
        ...act.toJSON(),
        totalIngresos,
        totalGastos,
        balance: totalIngresos - totalGastos,
        transactions: actTransactions
      };
    });
    
    return activitiesWithSummary;
  }

  async getActivityById(id) {
    const activity = await activityRepository.findById(id);
    if (!activity) throw new Error('Activity not found');
    return activity;
  }

  async createActivity(data) {
    return await activityRepository.create(data);
  }

  async updateActivity(id, data) {
    return await activityRepository.update(id, data);
  }

  async deleteActivity(id) {
    await activityRepository.delete(id);
    return { id };
  }
}

module.exports = new ActivityService();
