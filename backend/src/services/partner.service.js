const partnerRepository = require('../repositories/partner.repository');

class PartnerService {
  async getAllPartners() {
    return await partnerRepository.findAll();
  }

  async getPartnerById(id) {
    const partner = await partnerRepository.findById(id);
    if (!partner) throw new Error('Partner not found');
    return partner;
  }

  async createPartner(data) {
    return await partnerRepository.create(data);
  }

  async updatePartner(id, data) {
    return await partnerRepository.update(id, data);
  }

  async deletePartner(id) {
    await partnerRepository.delete(id);
    return { id };
  }

  async getContributionsSummary() {
    return await partnerRepository.getContributionsSummary();
  }
}

module.exports = new PartnerService();
