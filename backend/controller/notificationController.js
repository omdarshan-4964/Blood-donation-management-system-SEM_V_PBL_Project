const Notification = require('../models/Notification');
const User = require('../models/User');
const BloodRequest = require('../models/BloodRequest');

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

module.exports = { sendNotificationToDonors };
