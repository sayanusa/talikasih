require('dotenv').config()
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const axios = require('axios');
const qs = require('querystring')

const { UserDonations, Users, Campaigns } = require("../models");

class UserDonationController {
  // User donation dengan validasi
  static async donate(req, res, next) {
    const UserId = req.userData.id;
    const CampaignId = req.params.id;
    const { amount, share, comment } = req.body;
    try {
      //Validasi apakah Campaigns ada
      const validCampaign = await Campaigns.findOne({
        where: {
          id: CampaignId,
        },
      });
      if (validCampaign) {
        //Validasi apakah goals sudah tercapai
        if (validCampaign.raised < validCampaign.goal) {
          //pengecekan sisa yang dibutuhkan
          const expected = validCampaign.goal - validCampaign.raised;
          if (expected == 0) {
            res.status(400)({
              Success: false,
              message: "This Campaign's goal has been acheived",
            });
          } else {
            if (amount > expected) {
              res.status(400).json({
                Success: false,
                message: `This Campaign only need Rp. ${expected} more, please use the rest of your money for other Campaigns`,
              });
            } else {
              const add = await UserDonations.create({
                UserId,
                CampaignId,
                amount,
                share,
                comment,
              });
              const raisedData = await Campaigns.findOne({
                where: {
                  id: CampaignId,
                },
              });
              const raisedBefore = raisedData.raised;
              const raisedAfter = raisedBefore + amount;
              const addRaised = await Campaigns.update(
                {
                  raised: raisedAfter,
                },
                {
                  where: {
                    id: CampaignId,
                  },
                }
              );
              res.status(400).json({
                Success: true,
                message: `Thank you for donating Rp. ${amount} for this campaign`,
              });
            }
          }
        }
      } else {
        res.status(404).json({
          Success: false,
          message: "Campaign not Found",
        });
      }
    } catch (err) {
      next(err);
    }
  }
  // user donation tanpa validasi
  static async _donate(req, res, next) {
    const UserId = req.userData.id;
    const CampaignId = req.params.id;
    const { amount, share, comment } = req.body;
    try {
      // let data = await axios.get("")
      const validCampaign = await Campaigns.findOne({
        where: {
          id: CampaignId,
        },
      });
      if (validCampaign) {
        const add = await UserDonations.create({
          UserId,
          CampaignId,
          amount,
          share,
          comment,
        });
        //Menambahkan amount ke campaign.raised
        const raisedBefore = Number(validCampaign.raised);
        const raisedAfter = raisedBefore + Number(amount);
        const PrevPoint = Number(validCampaign.point);
        const updatePoint = PrevPoint + 2;
        const countBefore = Number(validCampaign.donationCount);
        const after = countBefore + 1;
        const addRaised = await Campaigns.update(
          {
            raised: raisedAfter,
            point: updatePoint,
            donationCount: after,
          },
          {
            where: {
              id: CampaignId,
            },
          }
        );
        res.status(200).json({
          Success: true,
          message: `Thank you for donating Rp. ${amount} for this campaign`,
          data: add,
        });
      } else {
        res.status(404).json({
          Success: false,
          message: "Campaign not Found",
        });
      }
    } catch (err) {
      next(err);
    }
  }
  static async getUserDonationData(req, res, next) {
    const UserId = req.userData.id;
    try {
      const found = await UserDonations.findAll({
        where: {
          UserId: UserId,
        },
        include: [Campaigns],
      });
      res.status(200).json({
        Success: true,
        UserId: UserId,
        name: req.userData.name,
        Result: found,
      });
    } catch (err) {
      next(err);
    }
  }
  static async getDonationByCampaign(req, res, next) {
    const { campaignId } = req.params;
    const getAll = await UserDonations.findAll({
      where: {
        CampaignId: campaignId, 
      }, include:{
        model: Users,
        attributes: ["name","photo"],
      }
    });
    let all = getAll.map(x => {
      if(x.share == false){
        x.User.name = "anonym"
      } return x    
    })
    res.status(200).json(all)
  }
  static async _donateStripe (req, res, next) {
    const CampaignId = req.params.id;
    const { amount, share, comment,currency,card_number, exp_month, exp_year, cvc } = req.body;
    const { name, email } = req.userData
    const UserId = req.userData.id
  try {
      const validCampaign = await Campaigns.findOne({
        where: {
          id: CampaignId,
        },
      });
      if (validCampaign) {
          const token = await stripe.tokens.create({
            card: {
              number: card_number,
              exp_month: exp_month,
              exp_year: exp_year,
              cvc: cvc,
            },
          });
          const centToDollars = Number(amount) * 100
          const data = {
              source: `${token.id}`,
              amount: `${centToDollars}`,
              currency: `${currency}`,
            };
          const headers = {        
              Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
              "Content-Type": "application/x-www-form-urlencoded"
            }
          const datas = await axios.post("https://api.stripe.com/v1/charges",qs.stringify(data),{headers:headers}
          )
          if(datas){
            const receipt = datas.data.receipt_url
            const amount = Number(req.body.amount)
            const add = await UserDonations.create({
              UserId,
              CampaignId,
              amount,
              share,
              comment,
              receipt
            });
            //Menambahkan amount ke campaign.raised
            const raisedBefore = Number(validCampaign.raised);
            const raisedAfter = raisedBefore + Number(amount);
            const PrevPoint = Number(validCampaign.point);
            const updatePoint = PrevPoint + 2;
            const countBefore = Number(validCampaign.donationCount);
            const after = countBefore + 1;
            const addRaised = await Campaigns.update(
              {
                raised: raisedAfter,
                point: updatePoint,
                donationCount: after,
              },
              {
                where: {
                  id: CampaignId,
                },
              }
            );
            res.status(200).json({
              Success: true,
              message: `Thank you for donating USD ${amount} for this campaign`,
              data: add,
            });
          } else {
            res.status(404).json({
              Success: false,
              message: "Campaign not Found",
            });
          }
          }else {
            res.status(400).json({
              status: 400,
              success: false,
              msg: "payment failed"
            })
          }   
    } catch (err) {
      next(err);
    }
  }
  static async email (req, res, next) {
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: 'permata.ngaliyan@gmail.com', // Change to your recipient
      from: 'admin@talikasih.page', // Change to your verified sender
      subject: 'Tali Kasih',
      text: 'Thank you for your donation for the campaign',
      html: '<strong>Thank you for your donation for the campaign</strong>',
    }
    sgMail
      .send(msg)
      .then(() => {
        res.status(200).json({
          status: 'success',
          msg:msg
        })
        console.log('Email sent')
      })
    .catch((error) => {
      next(error)
      console.error(error)
    })
  }
  static async _donateMidtrans (req,res, next) {
    try {
      const UserId = req.userData.id;
      const name = req.userData.name;
      const CampaignId = req.params.id;
      const { card_number,card_exp_month,card_exp_year,card_cvv,amount, share, comment } = req.body;
      const token_cli = process.env.CLIENT
      const validCampaign = await Campaigns.findOne({
        where: {
          id: CampaignId,
        },
      });
      if (validCampaign) {
        const add = await UserDonations.create({
          UserId,
          CampaignId,
          amount,
          share,
          comment,
        });
        //Menambahkan amount ke campaign.raised
        const raisedBefore = Number(validCampaign.raised);
        const raisedAfter = raisedBefore + Number(amount);
        const PrevPoint = Number(validCampaign.point);
        const updatePoint = PrevPoint + 2;
        const countBefore = Number(validCampaign.donationCount);
        const after = countBefore + 1;
        const addRaised = await Campaigns.update(
          {
            raised: raisedAfter,
            point: updatePoint,
            donationCount: after,
          },
          {
            where: {
              id: CampaignId,
            },
          }
        );

          //get token to proceed payment
          const headers = { 
              'Accept': 'application/json', 
              'Content-Type': 'application/json', 
              'Authorization': 'Basic U0ItTWlkLXNlcnZlci01NVR2MnBoUDVUWDVWeXFTUEpKbHBXS0Y6'
            }
          const url_token = `${process.env.BASE_MID}/v2/token?client_key=${token_cli}&card_number=${card_number}&card_exp_month=${card_exp_month}&card_exp_year=${card_exp_year}24&card_cvv=${card_cvv}`;
          const token = await axios.get(`${url_token}`,{headers:headers})
          let tokId = token.data.token_id
          let orderId = tokId.substring(10,23)
          let date = new Date()
          //charge the card
          const body = {
            "payment_type": "credit_card",
            "transaction_details": {
              "order_id": `${add.id}`,
              "gross_amount": amount
            },
            "credit_card": {
              "token_id": `${tokId}`,
              "authentication": true,
            },
            "customer_details": {
              "first_name": `${name}`,
            }
          } 
          var charge = await axios.post(`${process.env.BASE_MID}/v2/charge`,body,{headers:headers})
        } else {
      res.status(404).json({
        Success: false,
        message: "Campaign not Found",
      });
    }
      res.status(200).json(charge.data)
    } catch (e) {
        console.log(e);
        next(e)
    }    
  }
  static async notification (req, res, next) {
    try {
      const data = req.body
      const id = data.order_id
      const amount = data.gross_amount
      if (data.transaction_status === 'deny' || data.transaction_status === 'cancel' || data.transaction_status ==='refund' || data.transaction_status ==='expire') {
        const user_donation = await UserDonations.findOne({
          where: {
            id: id,
          }
        })
        const campId = user_donation.CampaignId
        const Campaign = await Campaigns.findOne({
          where:{
            id : campId
          }
        })
        const raisedBefore = Number(Campaign.raised)
        const new_amount = raisedBefore - Number(amount)
        console.log('=== Amount ==='+new_amount);
        const rollbackRaised = await Campaigns.update({
          raised:new_amount},
          {where:{id:id}
        })
        const rollback = await UserDonations.destroy({
          where: {
            id: id,
          }
        })
        res.status(202)
      } else {
        console.log(data);
        res.status(200)
      }
    } catch (error) {
      next(error)
    }
  }
  static async confirmed (req, res, next) {
    // const UserId = req.userData.id;
    const CampaignId = req.params.id;
    const { card_number,card_exp_month,card_exp_year,card_cvv,amount, share, comment } = req.body;
    try {
      const validCampaign = await Campaigns.findOne({
        where: {
          id: CampaignId,
        },
      });
      if (validCampaign) {
        await _donateMidtrans({
          req :{
            body :{
              "card_number" : `${card_number}`,
              "card_exp_month" : `${card_exp_month}`,
              "card_exp_year": `${card_exp_year}`,
              "card_cvv": `${card_cvv}`,
              "amount": `${amount}`,
            }
          }
        })
        const add = await UserDonations.create({
          UserId,
          CampaignId,
          amount,
          share,
          comment,
        });
        //Menambahkan amount ke campaign.raised
        const raisedBefore = Number(validCampaign.raised);
        const raisedAfter = raisedBefore + Number(amount);
        const PrevPoint = Number(validCampaign.point);
        const updatePoint = PrevPoint + 2;
        const countBefore = Number(validCampaign.donationCount);
        const after = countBefore + 1;
        const addRaised = await Campaigns.update(
          {
            raised: raisedAfter,
            point: updatePoint,
            donationCount: after,
          },
          {
            where: {
              id: CampaignId,
            },
          }
        );
        res.status(200).json({
          Success: true,
          message: `Thank you for donating Rp. ${amount} for this campaign`,
          data: add,
        });
      } else {
        res.status(404).json({
          Success: false,
          message: "Campaign not Found",
        });
      }
    } catch (err) {
      next(err);
    }
  }
}
module.exports = UserDonationController;
