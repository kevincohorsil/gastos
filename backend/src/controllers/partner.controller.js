const partnerService = require('../services/partner.service');

class PartnerController {
  async getAll(req, res, next) {
    try {
      const result = await partnerService.getAllPartners();
      res.status(200).json({ success: true, message: 'Partners retrieved', data: result });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const partner = await partnerService.getPartnerById(req.params.id);
      res.status(200).json({ success: true, message: 'Partner retrieved', data: partner });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const partner = await partnerService.createPartner(req.body);
      res.status(201).json({ success: true, message: 'Partner created', data: partner });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const partner = await partnerService.updatePartner(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Partner updated', data: partner });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await partnerService.deletePartner(req.params.id);
      res.status(200).json({ success: true, message: 'Partner deleted', data: null });
    } catch (error) {
      next(error);
    }
  }

  async getContributions(req, res, next) {
    try {
      const summary = await partnerService.getContributionsSummary();
      res.status(200).json({ success: true, message: 'Contributions summary retrieved', data: summary });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PartnerController();
