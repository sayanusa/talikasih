const { Campaigns, Category, UserComments } = require("../models");
const { Users } = require("../models");
const Sequelize = require("sequelize");
const { where } = require("sequelize");
const Op = Sequelize.Op;

class adminController {
    static async getAllCampaign(req, res, next) {
        const success = req.test.success;
        const page = req.params.page;
        try {
          const found = await Campaigns.findAll({});
          if (found) {
            const options = {
              page,
              paginate: 12,
              order: [["id", "DESC"]],
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
          } else {
            next({ message: "failed to retrieve campaign" });
          }
        } catch (err) {
          next(err);
        }
      }

      static async adminCampaignFilter(req, res, next) {
        const success = req.test.success;
        const { CategoryId, page, filter, search } = req.query;
        var options = {};
        try {
            const found = await Campaigns.findOne({
                where: { CategoryId }
            })
            if(found){
            switch (filter) {
                case 'title':
                    var options = {
                        page,
                        paginate: 4,
                        order: [['title', 'ASC']],
                        where: { CategoryId },
                        attributes: ["id", "title", "raised", "UserId", "CategoryId", "StatId", "donationCount"],
                        include: {
                            model: Users,
                            attributes: ["name"],
                          },
                    }
                    break;
                
                case 'status':
                    
                    break;

                case 'donation':
                    
                    break;

                case 'update':
                    
                    break;

                case 'search':
                    var options = {
                        page,
                        paginate: 4,
                        order: [['id', 'DESC']],
                        where: { CategoryId, 
                            title: {
                                [Op.iLike]: "%" + search + "%",
                              }},
                        attributes: ["id", "title", "raised", "UserId", "CategoryId", "StatId", "donationCount"],
                        include: {
                            model: Users,
                            attributes: ["name"],
                          },
                    }
                    break;

                default:
                    var options = {
                        page,
                        paginate: 4,
                        order: [['id', 'DESC']],
                        where: { CategoryId },
                        attributes: ["id", "title", "raised", "UserId", "CategoryId", "StatId", "donationCount"],
                        include: {
                            model: Users,
                            attributes: ["name"],
                          },
                    }
                    break;
            }

                const { docs, pages, total } = await Campaigns.paginate(options)
    
                if(page > pages){
                    res.status(404).json({message: "page not found"})
                } else{
                    res.status(200).json({
                        status: success,
                        on_page: page,
                        total_data: total,
                        total_pages: pages,
                        document: docs,
                    })
                }
            } else{
                next({message: "campaign not found!"})
            }
        } catch (err) {
            next(err)
        }
      }

    static async approveCampaign(req, res, next){
        const success = req.test.success;
        const id = req.params.id;
        if(req.userData.role !== "admin"){
          next({ message: "not authorized"})
        }else{
            try{
              const update = await Campaigns.update(
                {
                  StatId: 2
                },
                {
                  where: { id },
                }
              )
              if (update) {
                const found = await Campaigns.findOne({ where: { id } });
                res.status(200).json({success,found});
              }
            }catch (err) {
              console.log();
              next(err)
          }
        }
      }
      
      static async rejectCampaign(req, res, next){
        const success = req.test.success;
        const id = req.params.id;
        if(req.userData.role !== "admin"){
          next({ message: "not authorized"})
        }else{
            try{
              const update = await Campaigns.update(
                {
                  StatId: 4
                },
                {
                  where: { id },
                }
              )
            if (update) {
              const found = await Campaigns.findOne({ where: { id } });
              res.status(200).json({success,found});
            }
            }catch (err) {
              next(err)
          }
        }
      }


}

module.exports = adminController;