const { Router } = require('express');
const router = Router();
const DonationRoutes = require('./userDonations');

router.use('/donate', DonationRoutes);

const userController = require('../controllers/Users');
const CommentRoutes = require('./comment');
const LogRoutes = require('./campaignLog');
const StatusRoutes = require('./status');
const auth = require('../middlewares/auth');
const stat = require('../middlewares/status');
const { userUpload } = require('../middlewares/multer');

router.use('/comment', CommentRoutes);
router.use('/campaignLog', LogRoutes);
router.use('/status', StatusRoutes);

router.post('/', stat.status, userController.register);
router.post('/login', stat.status, userController.login);
router.get('/allusers', stat.status, userController.getAllUsers);
router.put('/', stat.status, auth.authentication, userController.updateUser);
router.delete('/', stat.status, auth.authentication, userController.deleteUser);
router.put(
  '/image',
  auth.authentication,
  userUpload.single('photo'),
  stat.status,
  userController.updateUserImage
);
router.get(
  '/formuser',
  stat.status,
  auth.authentication,
  userController.editFormUser
);

//category
const categoryRoutes = require('./category');
router.use('/category', categoryRoutes);

//campaign create
const campaignRoutes = require('./campaign');
router.use('/campaign', campaignRoutes);

//discover campaign
const campaignController = require('../controllers/Campaign');
router.get(
  '/discover/all/:page',
  stat.status,
  campaignController.getApprovedCampaign
);
// router.get("/discover/approved",stat.status, campaignController.getApprovedCampaign);
router.get(
  '/discover/category/:CategoryId/:page',
  stat.status,
  campaignController.getByCategory
);
router.get(
  'discover/category/:CategoryId/:page',
  stat.status,
  campaignController.sortingCategory
);

router.get('/discover/search', stat.status, campaignController.getBySearch);
router.get('/discover/trending', stat.status, campaignController.getTrending);
router.post(
  '/discover/share/:campaignId',
  stat.status,
  campaignController.share
);

//admin control
const adminController = require('../controllers/AdminCampaign');
router.get(
  '/discover/allcampaign/:page',
  stat.status,
  adminController.getAllCampaign
);

router.put(
  '/discover/approve/:id',
  stat.status,
  auth.authentication,
  adminController.approveCampaign
);
router.put(
  '/discover/reject/:id',
  stat.status,
  auth.authentication,
  adminController.rejectCampaign
);
router.get(
  '/discover/admin',
  stat.status,
  auth.authentication,
  adminController.adminCampaignFilter
);

// router.get("/discover/admin", stat.status, adminController.adminCampaignFilter)

const old = require('../controllers/oldCampaign');
router.get('/discover/search/:search/:page', stat.status, old.getBySearch);

exports.router = router;
