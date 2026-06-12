const activityService = require('../services/activity.service');

class ActivityController {
  async getAll(req, res, next) {
    try {
      const activities = await activityService.getAllActivities();
      res.status(200).json({ success: true, message: 'Activities retrieved', data: activities });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const activity = await activityService.getActivityById(req.params.id);
      res.status(200).json({ success: true, message: 'Activity retrieved', data: activity });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const activity = await activityService.createActivity(req.body);
      res.status(201).json({ success: true, message: 'Activity created', data: activity });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const activity = await activityService.updateActivity(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Activity updated', data: activity });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await activityService.deleteActivity(req.params.id);
      res.status(200).json({ success: true, message: 'Activity deleted', data: null });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ActivityController();
