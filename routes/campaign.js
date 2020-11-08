const { Router } = require('express');
const router = Router();
const campaignController = require('../controllers/Campaign');
const auth = require('../middlewares/auth');
const { uploader } = require('../middlewares/multer');
const stat = require('../middlewares/status');

//CRUD
router.post(
  '/add',
  stat.status,
  auth.authentication,
  uploader.single('header_img'),
  campaignController.addCampaign
);
router.get(
  '/edit/:id',
  stat.status,
  auth.authentication,
  campaignController.editFormCampaign
);
router.put(
  '/edit/:id',
  stat.status,
  auth.authentication,
  auth.authoCampaign,
  campaignController.editCampaign
);
router.put(
  '/edit/image/:id',
  stat.status,
  auth.authentication,
  auth.authoCampaign,
  uploader.single('header_img'),
  campaignController.editCampaignImage
);
router.delete(
  '/delete/:id',
  stat.status,
  auth.authentication,
  auth.authoCampaign,
  campaignController.deleteCampaign
); //untuk user dan admin

// Search category by filter
// router.get(
//   '/category/:CategoryId/:page:/:filter',
//   stat.status,
//   campaignController.sortingCAtegory
// );

//search
router.get(
  '/user',
  stat.status,
  auth.authentication,
  campaignController.getByUserId
);
router.get('/popular/:page', stat.status, campaignController.sortByPopularity);
router.get('/raised', stat.status, campaignController.sortByraised);
router.get('/urgent', stat.status, campaignController.sortByUrgency);

//get campaign by category and category sorting by
const old = require('../controllers/oldCampaign');
router.get(
  '/categoryPopular/:CategoryId/:page',
  stat.status,
  old.categoryPopular
);
router.get(
  '/categoryUrgent/:CategoryId/:page',
  stat.status,
  old.categoryUrgent
);
router.get('/categoryLess/:CategoryId/:page', stat.status, old.categoryLess);
router.get(
  '/search/popular/:search/:page',
  stat.status,
  old.getBySearchPopular
);
router.get(
  '/search/lessdonate/:search/:page',
  stat.status,
  old.getBySearchLess
);
router.get('/search/urgent/:search/:page', stat.status, old.getBySearchUrgent);

router.get(
  '/relate/:CategoryId/:id',
  stat.status,
  campaignController.getRelated
);
router.get('/:id', stat.status, campaignController.getCampaign);

module.exports = router;
