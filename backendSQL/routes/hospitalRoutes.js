const express = require('express');
const {
    addUser,
    removeUser,
    updateDonationHistory,
    getDonationHistory
} = require('../controller/hospitalController');

const { isHospital } = require('../middlewares/authMiddlewares');

const router = express.Router();


router.post('/add-user', isHospital, addUser);
router.delete('/remove-user/:userId', isHospital, removeUser);
router.put('/:donorId/update-donation-history', updateDonationHistory);
//isHospital
// Route to get donation history
router.get('/:donorId/donation-history',getDonationHistory);

module.exports = router;
