const Activity = require('../models/Activity');

class ActivityRepository {
  async findAll() {
    return await Activity.findAll({ order: [['createdAt', 'DESC']] });
  }

  async findById(id) {
    return await Activity.findByPk(id);
  }

  async create(data) {
    return await Activity.create(data);
  }

  async update(id, data) {
    await Activity.update(data, { where: { id } });
    return await this.findById(id);
  }

  async delete(id) {
    return await Activity.destroy({ where: { id } });
  }
}

module.exports = new ActivityRepository();
