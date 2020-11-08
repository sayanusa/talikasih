const { Router } = require('express');
const router = Router();
const CommentController = require('../controllers/UserComment');
const auth = require('../middlewares/auth');
const stat = require('../middlewares/status');

router.get('/', stat.status, CommentController.getComment);
router.post(
  '/add/:id',
  stat.status,
  auth.authentication,
  CommentController.addComment
);
router.delete(
  '/:id',
  stat.status,
  auth.authentication,
  CommentController.deleteComment
);
router.put(
  '/:id',
  stat.status,
  auth.authentication,
  CommentController.editComment
);
router.get('/:CampaignId', stat.status, CommentController.allComment);
router.get('/:CampaignId/:page', stat.status, CommentController.findByCampaign);

module.exports = router;
