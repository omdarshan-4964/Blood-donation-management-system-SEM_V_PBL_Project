const express = require('express');

const {
    sendBloodRequest,
    acceptBloodRequest,
    updateDonationHistory
} = require('../controller/bloodrequestController');

const router = express.Router();

router.post('/blood-requests', sendBloodRequest);
router.post('/blood-requests/:requestId/accept', acceptBloodRequest);
router.put('/donation-history/:donorId', updateDonationHistory);

module.exports = router;
