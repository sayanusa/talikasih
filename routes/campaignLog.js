const { Router } = require('express');
const router = Router();
const LogController = require('../controllers/CampaignLog');
const auth = require('../middlewares/auth');
const stat = require('../middlewares/status');

router.get('/', stat.status, LogController.getLog);
router.post(
  '/:CampaignId',
  stat.status,
  auth.authentication,
  LogController.addLog
);
router.delete(
  '/:id',
  stat.status,
  auth.authentication,
  LogController.deleteLog
);
router.put('/:id', stat.status, auth.authentication, LogController.editLog);
router.get(
  '/desc/:CampaignId/:page',
  stat.status,
  LogController.findByCampaignDesc
);
router.get('/:CampaignId/:page', stat.status, LogController.findByCampaign);

module.exports = router;
