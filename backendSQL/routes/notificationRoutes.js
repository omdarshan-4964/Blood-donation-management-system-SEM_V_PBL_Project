const express = require('express');
const { sendNotificationToDonors, 
        getNotifications, 
        updateNotificationStatus, 
        deleteNotification 
    } = require('../controller/notificationController');

const router = express.Router();

// Route to send notifications to donors when a blood request is created
router.post('/send/:requestId', sendNotificationToDonors);

// Route to get all notifications for a specific recipient
router.get('/:recipientId', getNotifications);

// Route to update the status of a notification (e.g., mark as read)
router.put('/:notificationId', updateNotificationStatus);

// Route to delete a notification by ID
router.delete('/:notificationId', deleteNotification);

module.exports = router;
