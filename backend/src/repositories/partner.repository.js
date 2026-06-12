const Partner = require('../models/Partner');
const Transaction = require('../models/Transaction');

class PartnerRepository {
  async findAll() {
    return await Partner.findAll({
      order: [['name', 'ASC']]
    });
  }

  async findById(id) {
    return await Partner.findByPk(id);
  }

  async create(data) {
    return await Partner.create(data);
  }

  async update(id, data) {
    await Partner.update(data, { where: { id } });
    return await this.findById(id);
  }

  async delete(id) {
    return await Partner.destroy({ where: { id } });
  }

  async getContributionsSummary() {
    const partners = await Partner.findAll();
    const transactions = await Transaction.findAll({
      where: {
        type: ['APORTACION', 'RETIRO_SOCIO']
      }
    });

    const summary = partners.map(p => {
      const partnerTxs = transactions.filter(t => t.partnerId === p.id);
      const totalAportado = partnerTxs.filter(t => t.type === 'APORTACION').reduce((sum, t) => sum + parseFloat(t.amount), 0);
      const totalRetirado = partnerTxs.filter(t => t.type === 'RETIRO_SOCIO').reduce((sum, t) => sum + parseFloat(t.amount), 0);
      return {
        ...p.toJSON(),
        totalContributions: totalAportado - totalRetirado
      };
    });

    return summary;
  }
}

module.exports = new PartnerRepository();
