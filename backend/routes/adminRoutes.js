const express = require('express');
const {
    addUser,
    removeUser,
    updateDonationHistory
} = require('../controller/adminsController');

const { isAdmin } = require('../middlewares/authMiddlewares');

const router = express.Router();

router.post('/add-user', isAdmin, addUser);
router.delete('/remove-user/:userId', isAdmin, removeUser);
router.put('/:donorId/update-donation-history', isAdmin, updateDonationHistory);

module.exports = router;
