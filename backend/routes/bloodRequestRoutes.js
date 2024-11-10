const express = require('express');

const {
    sendBloodRequest,
    acceptBloodRequest,
} = require('../controller/bloodrequestController');

const router = express.Router();

router.post('/blood-requests', sendBloodRequest);
router.post('/blood-requests/:requestId/accept', acceptBloodRequest);

module.exports = router;
