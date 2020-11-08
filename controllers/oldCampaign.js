const { Campaigns, Category, UserComments } = require("../models");
const { Users } = require("../models");
const Sequelize = require("sequelize");
const { where } = require("sequelize");
const Op = Sequelize.Op;

class Old{
  // static async deleteCampaign(req, res, next) {
  //   const id = req.params.id;
  //   try {
  //     const search = await Campaigns.destroy({ where: { id } });
  //     if (search) {
  //       res.status(200).json({ message: "campaign deleted" });
  //     } else {
  //       next({ message: "campaign deleted failed" });
  //     }
  //   } catch (err) {
  //     next(err);
  //   }
  // }

    static async getBySearch(req, res, next) {
    const success = req.test.success;
    const page = req.params.page;
    const { search } = req.params;
    try {
      const found = await Campaigns.findAll({
        order: [["id", "DESC"]],
        where: {
          title: {
            [Op.iLike]: "%" + search + "%",
          },
        },
      });
      if (found == "") {
        next({ message: "campaign not found!" });
      } else {
        //res.status(200).json(found)
        const options = {
          page,
          paginate: 12,
          order: [["id", "DESC"]],
          where: {
            title: {
              [Op.iLike]: "%" + search + "%",
            },
          },
          include: {
            model: Category,
            attributes: ["name", "image"],
          },
        };
        const { docs, pages, total } = await Campaigns.paginate(options);

        if (page > pages) {
          res.status(404).json({ message: "page not found" });
        } else {
          res.status(200).json({
            status: success,
            on_page: page,
            total_data: total,
            total_pages: pages,
            document: docs,
          });
        }
      }
    } catch (err) {
      next(err);
    }
  }


  static async getBySearchPopular(req, res, next) {
    const success = req.test.success;
    const page = req.params.page;
    const { search } = req.params;
    try {
      const found = await Campaigns.findAll({
        order: [["id", "DESC"]],
        where: {
          title: {
            [Op.iLike]: "%" + search + "%",
          },
        },
      });
      if (found == "") {
        next({ message: "campaign not found!" });
      } else {
        //res.status(200).json(found)
        const options = {
          page,
          paginate: 12,
          order: [["point", "DESC"]],
          where: {
            title: {
              [Op.iLike]: "%" + search + "%",
            },
          },
          include: {
            model: Category,
            attributes: ["name", "image"],
          },
        };
        const { docs, pages, total } = await Campaigns.paginate(options);

        if (page > pages) {
          res.status(404).json({ message: "page not found" });
        } else {
          res.status(200).json({
            status: success,
            on_page: page,
            total_data: total,
            total_pages: pages,
            document: docs,
          });
        }
      }
    } catch (err) {
      next(err);
    }
  }

  static async getBySearchLess(req, res, next) {
    const success = req.test.success;
    const page = req.params.page;
    const { search } = req.params;
    try {
      const found = await Campaigns.findAll({
        order: [["id", "DESC"]],
        where: {
          title: {
            [Op.iLike]: "%" + search + "%",
          },
        },
      });
      if (found == "") {
        next({ message: "campaign not found!" });
      } else {
        //res.status(200).json(found)
        const options = {
          page,
          paginate: 12,
          order: [["raised", "ASC"]],
          where: {
            title: {
              [Op.iLike]: "%" + search + "%",
            },
          },
          include: {
            model: Category,
            attributes: ["name", "image"],
          },
        };
        const { docs, pages, total } = await Campaigns.paginate(options);

        if (page > pages) {
          res.status(404).json({ message: "page not found" });
        } else {
          res.status(200).json({
            status: success,
            on_page: page,
            total_data: total,
            total_pages: pages,
            document: docs,
          });
        }
      }
    } catch (err) {
      next(err);
    }
  }

  static async getBySearchUrgent(req, res, next) {
    const success = req.test.success;
    const page = req.params.page;
    const { search } = req.params;
    try {
      const found = await Campaigns.findAll({
        order: [["id", "DESC"]],
        where: {
          title: {
            [Op.iLike]: "%" + search + "%",
          },
        },
      });
      if (found == "") {
        next({ message: "campaign not found!" });
      } else {
        //res.status(200).json(found)
        const options = {
          page,
          paginate: 12,
          order: [["due_date", "ASC"]],
          where: {
            title: {
              [Op.iLike]: "%" + search + "%",
            },
          },
          include: {
            model: Category,
            attributes: ["name", "image"],
          },
        };
        const { docs, pages, total } = await Campaigns.paginate(options);

        if (page > pages) {
          res.status(404).json({ message: "page not found" });
        } else {
          res.status(200).json({
            status: success,
            on_page: page,
            total_data: total,
            total_pages: pages,
            document: docs,
          });
        }
      }
    } catch (err) {
      next(err);
    }
  }

  //Discover Campaign by Category, sort by (most urgent, popular, less donation)
  static async categoryPopular(req, res, next) {
    const success = req.test.success;
    const CategoryId = req.params.CategoryId;
    const { page } = req.params;
    try {
      const rank = await Campaigns.findAll({
        where: {
          CategoryId,
        },
      });
      if (rank) {
        const options = {
          page,
          paginate: 12,
          order: [["point", "DESC"]],
          where: { CategoryId },
          include: [Category],
        };
        const { docs, pages, total } = await Campaigns.paginate(options);
        if (page <= pages) {
          res.status(200).json({
            status: success,
            on_page: page,
            total_data: total,
            total_pages: pages,
            ranked: docs,
          });
        } else {
          res.status(404).json({
            msg: "Page not found",
          });
        }
      } else {
        res.status(404).json({
          msg: "no campaign available",
        });
      }
    } catch (err) {
      next(err);
    }
  }
  static async categoryUrgent(req, res, next) {
    const success = req.test.success;
    const CategoryId = req.params.CategoryId;
    const page = req.params.page;
    try {
      const urgent = await Campaigns.findAll({
        where: {
          CategoryId,
        },
      });
      if (urgent) {
        const options = {
          page,
          paginate: 12,
          order: [["due_date", "ASC"]],
          where: { CategoryId },
          include: [Category],
        };
        const { docs, pages, total } = await Campaigns.paginate(options);
        if (page <= pages) {
          res.status(200).json({
            status: success,
            on_page: page,
            total_data: total,
            total_pages: pages,
            urgent: docs,
          });
        } else {
          res.status(404).json({
            msg: "Page not found",
          });
        }
      } else {
        res.status(404).json({
          msg: "no campaign available",
        });
      }
    } catch (err) {
      next(err);
    }
  }
  static async categoryLess(req, res, next) {
    const success = req.test.success;
    const CategoryId = req.params.CategoryId;
    const page = req.params.page;
    try {
      const urgent = await Campaigns.findAll({
        where: {
          CategoryId,
        },
      });
      if (urgent) {
        const options = {
          page,
          paginate: 12,
          order: [["raised", "ASC"]],
          where: { CategoryId },
          include: [Category],
        };
        const { docs, pages, total } = await Campaigns.paginate(options);
        if (page <= pages) {
          res.status(200).json({
            status: success,
            on_page: page,
            total_data: total,
            total_pages: pages,
            less: docs,
          });
        } else {
          res.status(404).json({
            msg: "Page not found",
          });
        }
      } else {
        res.status(404).json({
          msg: "no campaign available",
        });
      }
    } catch (err) {
      next(err);
    }
  }

}

module.exports = Old