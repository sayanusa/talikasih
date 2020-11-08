const { Router } = require("express");
const router = Router();
const axios = require('axios')
const auth = require("../middlewares/auth");

const UserDonationController = require("../controllers/UserDonationsController");

// router.post('/add/:id',UserDonationController.donate)
router.post(
  "/campaign/:id",
  auth.authentication,
  UserDonationController._donate
);
router.get("/campaign",auth.authentication,UserDonationController.getUserDonationData);
router.get("/campaign/:campaignId",UserDonationController.getDonationByCampaign);
router.post("/payment/:id", auth.authentication,UserDonationController._donateStripe);
router.post('/midtran/:id',auth.authentication,UserDonationController._donateMidtrans)
router.post('/hook',UserDonationController.notification)
// router.post('/midtrans/:id',UserDonationController.confirmed)


module.exports = router;
