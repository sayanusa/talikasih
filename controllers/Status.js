const { Status } = require('../models');

class StatusController {
  static async getStatus(req, res, next) {
    const success = req.test.success;
    try {
      const statuses = await Status.findAll({
        order: [['id', 'ASC']],
      });
      res.status(200).json({ success, statuses });
    } catch (err) {
      next(err);
    }
  }
  static async addStatus(req, res, next) {
    const success = req.test.success;
    const { name } = req.body;
    try {
      const add = await Status.create({
        name,
      });
      res.status(201).json({ success, add });
    } catch (err) {
      next(err);
    }
  }
  static async deleteStatus(req, res, next) {
    const success = req.test.success;
    const id = req.params.id;
    try {
      const del = await Status.destroy({
        where: {
          id,
        },
      });
      res.status(300).json({ success, msg: 'Deleted' });
    } catch (err) {
      next(err);
    }
  }
  static async editStatus(req, res, next) {
    const success = req.test.success;
    const id = req.params.id;
    const { name } = req.params.body;
    try {
      const edit = await Status.update({
        name,
        where: {
          id,
        },
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = StatusController;
