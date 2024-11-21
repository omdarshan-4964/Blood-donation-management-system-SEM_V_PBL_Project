const Notification = require('../models/Notification');

// Send notifications to eligible donors (already implemented)
const sendNotificationToDonors = async (req, res) => {
    try {
        const { requestId } = req.params;

        const bloodRequest = await BloodRequest.findById(requestId).populate('hospital', 'name');
        if (!bloodRequest) {
            return res.status(404).json({ message: 'Blood request not found.' });
        }

        const eligibleDonors = await User.find({
            role: 'Donor',
            bloodType: bloodRequest.bloodType,
            location: bloodRequest.location
        });

        if (eligibleDonors.length === 0) {
            return res.status(200).json({ message: 'No eligible donors found for this blood request.' });
        }

        const notifications = eligibleDonors.map(donor => ({
            bloodRequest: bloodRequest._id,
            recipient: donor._id,
            message: `Urgent request! ${bloodRequest.hospital.name} needs ${bloodRequest.bloodType} blood. Please contact the hospital if you can donate.`,
            status: 'Unread'
        }));
        await Notification.insertMany(notifications);

        res.status(200).json({
            message: 'Notifications sent to eligible donors.',
            donorCount: eligibleDonors.length
        });
    } catch (error) {
        console.error('Error sending notifications:', error);
        res.status(500).json({ message: 'Error sending notifications' });
    }
};

// Get all notifications for a specific recipient
const getNotifications = async (req, res) => {
    try {
        const { recipientId } = req.params;

        const notifications = await Notification.find().populate('bloodRequest', 'bloodType','location');
        if (!notifications || notifications.length === 0) {
            return res.status(404).json({ message: 'No notifications found for this recipient.' });
        }

        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Error fetching notifications' });
    }
};

// Update notification status (e.g., mark as read)
const updateNotificationStatus = async (req, res) => {
    try {
        const { notificationId } = req.params;

        const notification = await Notification.findByIdAndUpdate(
            notificationId,
            { status: 'Read' },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found.' });
        }

        res.status(200).json({ message: 'Notification marked as read.', notification });
    } catch (error) {
        console.error('Error updating notification:', error);
        res.status(500).json({ message: 'Error updating notification' });
    }
};

// Delete a notification by ID
const deleteNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;

        const notification = await Notification.findByIdAndDelete(notificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found.' });
        }

        res.status(200).json({ message: 'Notification deleted successfully.' });
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ message: 'Error deleting notification' });
    }
};

module.exports = {
    sendNotificationToDonors,
    getNotifications,
    updateNotificationStatus,
    deleteNotification
};
