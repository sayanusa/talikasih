const { Router } = require('express');
const router = Router();
const StatusController = require('../controllers/Status');
const stat = require('../middlewares/status');

router.get('/', stat.status, StatusController.getStatus);
router.post('/', stat.status, StatusController.addStatus);
router.delete('/:id', stat.status, StatusController.deleteStatus);
router.put('/:id', stat.status, StatusController.editStatus);

module.exports = router;
