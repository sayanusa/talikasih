const { Campaigns, Category, UserComments } = require('../models');
const { Users } = require('../models');
const Sequelize = require('sequelize');
const { where } = require('sequelize');
const Op = Sequelize.Op;
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class campaignController {
  static async getApprovedCampaign(req, res, next) {
    const success = req.test.success;
    const page = req.params.page;
    try {
      const found = await Campaigns.findAll({});
      if (found) {
        const options = {
          page,
          paginate: 12,
          order: [['id', 'DESC']],
          where: { StatId: 2 },
          include: {
            model: Category,
            attributes: ['name', 'image'],
          },
        };
        const { docs, pages, total } = await Campaigns.paginate(options);

        if (page > pages) {
          res.status(404).json({ message: 'page not found' });
        } else {
          res.status(200).json({
            status: success,
            on_page: page,
            total_data: total,
            total_pages: pages,
            document: docs,
          });
        }
      } else {
        next({ message: 'failed to retrieve campaign' });
      }
    } catch (err) {
      next(err);
    }
  }

  //CRUD
  static async addCampaign(req, res, next) {
    const success = req.test.success;
    const raised = 0;
    const { title, goal, story, due_date, CategoryId } = req.body;
    const header_img = req.file.path;
    const UserId = req.userData.id;
    UserId == null ? next({ message: 'access token not found' }) : '';
    title == null ? next({ message: 'title field is required' }) : '';
    goal == null ? next({ message: 'goal field is required' }) : '';
    story == null ? next({ message: 'story field is required' }) : '';
    CategoryId == null ? next({ message: 'CategoryId field is required' }) : '';
    try {
      const search = await Campaigns.findOne({ where: { title } });
      if (search) {
        res.status(409).json({ message: 'campaign already exist!' });
      } else {
        const add = await Campaigns.create({
          title,
          goal,
          story,
          due_date,
          header_img,
          CategoryId,
          UserId,
          raised,
        });

        // find email's user
        const find = await Users.findOne({
          where: { id: UserId },
        });
        console.log(find.email);

        //sendGrid
        const msg = {
          to: `${find.email}`, // Change to your recipient
          from: 'admin@talikasih.page', // Change to your verified sender
          subject: `Pembuatan campaign dengan judul '${title}' telah berhasil!`,
          text:
            'Dear orang baik, terima kasih atas inisiatif mu untuk membantu orang-orang yang memang berhak mendapatkan kasih sayang dan kepedulian kita semua.',
        };
        sgMail
          .send(msg)
          .then(() => {
            res.status(200).json({
              status: 'success',
              msg: msg,
            });
            console.log('Email sent');
          })
          .catch((error) => {
            next(error);
            console.error(error);
          });

        res.status(200).json({ success, add });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async editFormCampaign(req, res, next) {
    const success = req.test.success;
    const id = req.params.id;
    try {
      const found = await Campaigns.findOne({
        where: { id },
      });
      res.status(200).json({ success, msg: 'ke form edit', data: found });
    } catch (err) {
      next(err);
    }
  }
  static async editCampaign(req, res, next) {
    const success = req.test.success;
    const id = req.params.id;
    const { title, goal, story, due_date, CategoryId, StatId } = req.body;
    try {
      const edit = await Campaigns.update(
        {
          title,
          goal,
          story,
          due_date,
          CategoryId,
          StatId,
        },
        {
          where: { id },
        }
      );
      if (edit) {
        const found = await Campaigns.findOne({ where: { id } });
        res.status(200).json({ success, found });
      }
    } catch (err) {
      next(err);
    }
  }

  static async editCampaignImage(req, res, next) {
    const success = req.test.success;
    const id = req.params.id;
    const header_img = req.file.path;
    try {
      const edit = await Campaigns.update(
        {
          header_img,
        },
        {
          where: { id },
        }
      );
      if (edit) {
        const found = await Campaigns.findOne({ where: { id } });
        res.status(200).json({ success, found });
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteCampaign(req, res, next) {
    const success = req.test.success;
    const id = req.params.id;
    const UserId = req.userData.id;
    try {
      const form = await Campaigns.findOne({ where: { id } });
      if (UserId == form.UserId || req.userData.role == 'admin') {
        const update = await Campaigns.update(
          {
            StatId: 5,
          },
          {
            where: { id },
          }
        );
        if (update) {
          const found = await Campaigns.findOne({ where: { id } });
          res.status(200).json({ success, found });
        }
      }
    } catch (err) {
      next(err);
    }
  }

  //Get Champaign by
  static async getByCategory(req, res, next) {
    const success = req.test.success;
    const CategoryId = req.params.CategoryId;
    const page = req.params.page;
    try {
      const found = await Campaigns.findOne({
        where: { CategoryId },
      });
      if (found) {
        const options = {
          page,
          paginate: 12,
          order: [['id', 'DESC']],
          where: { CategoryId, StatId: 2 },
          include: {
            model: Category,
            attributes: ['name'],
          },
        };
        const { docs, pages, total } = await Campaigns.paginate(options);

        if (page > pages) {
          res.status(404).json({ message: 'page not found' });
        } else {
          res.status(200).json({
            status: success,
            on_page: page,
            total_data: total,
            total_pages: pages,
            document: docs,
          });
        }
      } else {
        next({ message: 'campaign not found!' });
      }
    } catch (err) {
      next(err);
    }
  }

  static async sortByraised(req, res, next) {
    const success = req.test.success;
    try {
      const allCampaign = await Campaigns.findAll({
        order: [['raised', 'ASC']],
        where: { StatId: 2 },
        include: {
          model: Category,
          attributes: ['name', 'image'],
        },
      });
      res.status(200).json({
        status: success,
        Success: true,
        Result: allCampaign,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async sortByPopularity(req, res, next) {
    const success = req.test.success;
    const { page } = req.params;
    try {
      const rank = await Campaigns.findAll();
      if (rank) {
        const options = {
          page,
          paginate: 12,
          order: [['point', 'DESC']],
          where: { StatId: 2 },
          include: {
            model: Category,
            attributes: ['name', 'image'],
          },
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
            msg: 'Page not found',
          });
        }
      } else {
        res.status(404).json({
          msg: 'no campaign available',
        });
      }
    } catch (err) {
      next(err);
    }
  }
  static async sortByUrgency(req, res, next) {
    const success = req.test.success;
    try {
      const campaign = await Campaigns.findAll({
        order: [['due_date', 'ASC']],
        where: { StatId: 2 },
        include: {
          model: Category,
          attributes: ['name', 'image'],
        },
      });
      res.status(200).json({ success, campaign });
    } catch (err) {
      next(err);
    }
  }

  //Discover Campaign by Search, sort by (most urgent, popular, less donation)
  static async getBySearch(req, res, next) {
    const success = req.test.success;
    const { search, filter, page } = req.query;
    var options = {};
    try {
      const found = await Campaigns.findAll({
        order: [['id', 'DESC']],
        where: {
          title: {
            [Op.iLike]: '%' + search + '%',
          },
          StatId: 2,
        },
      });
      if (found == '') {
        next({ message: 'campaign not found!' });
      } else {
        switch (filter) {
          case 'popular':
            var options = {
              page,
              paginate: 12,
              order: [['point', 'DESC']],
              where: {
                title: {
                  [Op.iLike]: '%' + search + '%',
                },
                StatId: 2,
              },
              include: {
                model: Category,
                attributes: ['name', 'image'],
              },
            };
            break;
          case 'less':
            var options = {
              page,
              paginate: 12,
              order: [['raised', 'ASC']],
              where: {
                title: {
                  [Op.iLike]: '%' + search + '%',
                },
                StatId: 2,
              },
              include: {
                model: Category,
                attributes: ['name', 'image'],
              },
            };
            break;
          case 'urgent':
            var options = {
              page,
              paginate: 12,
              order: [['due_date', 'ASC']],
              where: {
                title: {
                  [Op.iLike]: '%' + search + '%',
                },
                StatId: 2,
              },
              include: {
                model: Category,
                attributes: ['name', 'image'],
              },
            };
            break;
          default:
            var options = {
              page,
              paginate: 12,
              order: [['id', 'DESC']],
              where: {
                title: {
                  [Op.iLike]: '%' + search + '%',
                },
                StatId: 2,
              },
              include: {
                model: Category,
                attributes: ['name', 'image'],
              },
            };
            break;
        }

        const { docs, pages, total } = await Campaigns.paginate(options);

        if (page > pages) {
          res.status(404).json({ message: 'page not found' });
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

  //search campaign by Id
  static async getCampaign(req, res, next) {
    const success = req.test.success;
    const id = req.params.id;
    try {
      const found = await Campaigns.findOne({
        where: { id },
        include: [Users, Category],
      });
      if (found) {
        res.status(200).json({ success, found });
      } else {
        next({ message: 'campaign not found!' });
      }
    } catch (err) {
      next(err);
    }
  }

  //get related exclude champaign that shown
  static async getRelated(req, res, next) {
    const success = req.test.success;
    const id = req.params.id;
    const CategoryId = req.params.CategoryId;
    try {
      const found = await Campaigns.findAll({
        where: { CategoryId, StatId: 2 },
        include: Category,
      });

      //cek di array mana
      for (let i = 0; i < found.length; i++) {
        if (found[i].id == id) {
          found.splice(i, 1);
          res.status(200).json({ success, found });
        }
      }
    } catch (err) {
      next(err);
    }
  }

  //trending
  static async getTrending(req, res, next) {
    const success = req.test.success;
    try {
      const trending = await Campaigns.findOne({
        order: [['point', 'DESC']],
        where: { StatId: 2 },
        include: [
          {
            model: Category,
            attributes: ['name', 'image'],
          },
          {
            model: Users,
            attributes: ['name', 'photo'],
          },
        ],
      });
      res.status(200).json({ success, trending });
    } catch (err) {
      next(err);
    }
  }

  //Get Champaign by UserId
  static async getByUserId(req, res, next) {
    const success = req.test.success;
    const UserId = req.userData.id;
    try {
      const found = await Campaigns.findAll({
        where: { UserId: UserId },
        include: {
          model: Category,
          attributes: ['name', 'image'],
        },
      });
      if (found) {
        let count = 0;
        found.forEach((el) => {
          count += 1;
        });
        res.status(200).json({
          status: success,
          success: true,
          campaign_created: count,
          result: found,
        });
      } else {
        res.status(404).json({ message: 'Campaign not found' });
      }
    } catch (err) {
      next(err);
    }
  }

  static async share(req, res, next) {
    const success = req.test.success;
    const campaignId = req.params.campaignId;
    try {
      const campaign = await Campaigns.findOne({
        where: {
          id: campaignId,
        },
      });
      if (campaign) {
        const idCampaign = campaign.id;
        const before = Number(campaign.shareCount);
        const after = before + 1;
        const PrevPoint = Number(campaign.point);
        const updatePoint = PrevPoint + 3;

        const updateShare = await Campaigns.update(
          {
            shareCount: after,
            point: updatePoint,
          },
          {
            where: {
              id: idCampaign,
            },
          }
        );
        res.status(200).json({
          status: success,
          msg: 'Thank you for spread the vibe',
        });
      } else {
        res.status(404).json({
          status: 404,
          success: false,
          msg: 'Campaign not found',
        });
      }
    } catch (err) {
      next(err);
    }
  }

  // Sorting category using 1 API
  static async sortingCategory(req, res, next) {
    const success = req.test.success;
    const CategoryId = req.params.CategoryId;
    const page = req.params.page;
    const filter = req.query;
    var options = {};
    try {
      const category = await Campaigns.findAll({
        where: {
          CategoryId,
        },
      });
      if (!category) {
        res.status(404).json({
          msg: 'no campaign available',
        });
      } else {
        switch (filter) {
          case 'newest':
            var options = {
              page,
              paginate: 12,
              order: [['id', 'DESC']],
              where: { CategoryId, StatId: 2 },
              include: {
                model: Category,
                attributes: ['name', 'image'],
              },
            };
            break;
          case 'urgent':
            var options = {
              page,
              paginate: 12,
              order: [['due_date', 'ASC']],
              where: { CategoryId, StatId: 2 },
              include: {
                model: Category,
                attributes: ['name', 'image'],
              },
            };
            break;
          case 'popular':
            var options = {
              page,
              paginate: 12,
              order: [['point', 'DESC']],
              where: { CategoryId, StatId: 2 },
              include: {
                model: Category,
                attributes: ['name', 'image'],
              },
            };
            break;
          case 'less':
            var options = {
              page,
              paginate: 12,
              order: [['raised', 'ASC']],
              where: { CategoryId, StatId: 2 },
              include: {
                model: Category,
                attributes: ['name', 'image'],
              },
            };
            break;
        }
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
            msg: 'Page not found',
          });
        }
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = campaignController;
