const express = require('express');
const { sendNotificationToDonors } = require('../controller/notificationController');

const router = express.Router();

router.post('/notifications/blood-request/:requestId', sendNotificationToDonors);

module.exports = router;
