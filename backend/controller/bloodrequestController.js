const BloodRequest = require('../models/BloodRequest');
const Notification = require('../models/Notification');
const User = require('../models/User');


const sendBloodRequest = async (req, res) => {
    try {
        const { hospitalId, bloodType, location, unitsNeeded } = req.body;

        const hospital = await User.findById(hospitalId);
        if (!hospital || hospital.role !== 'Hospital') {
            return res.status(400).json({ message: 'Invalid hospital ID' });
        }

        const bloodRequest = new BloodRequest({
            hospital: hospitalId,
            bloodType,
            location,
            unitsNeeded,
            status: 'Pending'
        });
        await bloodRequest.save();

        const nearbyDonors = await User.find({
            role: 'Donor',
            bloodType: bloodType,
            location: location
        });

        const notifications = nearbyDonors.map(donor => ({
            bloodRequest: bloodRequest._id,
            recipient: donor._id,
            message: `Urgent! ${hospital.name} needs ${bloodType} blood at ${location}. Please contact them if available.`,
            status: 'Unread'
        }));
        await Notification.insertMany(notifications);

        res.status(201).json({
            message: 'Blood request created and notifications sent to nearby donors',
            bloodRequestId: bloodRequest._id
        });
    } catch (error) {
        console.error('Error sending blood request:', error);
        res.status(500).json({ message: 'Error creating blood request' });
    }
};

const acceptBloodRequest = async (req, res) => {
    try {
        const { requestId } = req.params;
        const donorId = req.body.donorId;

        const bloodRequest = await BloodRequest.findById(requestId);
        if (!bloodRequest) {
            return res.status(404).json({ message: 'Blood request not found.' });
        }

        if (bloodRequest.status === 'Accepted') {
            return res.status(400).json({ message: 'Blood request has already been accepted.' });
        }

        bloodRequest.status = 'Accepted';
        bloodRequest.acceptedBy = donorId;
        await bloodRequest.save();

        res.status(200).json({ message: `Blood request ${requestId} accepted by Donor ${donorId}` });
    } catch (error) {
        console.error('Error accepting blood request:', error);
        res.status(500).json({ message: 'Error accepting blood request' });
    }
};

const updateDonationHistory = async (req, res) => {
    try {
      
        const { donorId } = req.params;
        const { requestId } = req.body;

        const donor = await User.findById(donorId);
        if (!donor || donor.role !== 'Donor') {
            return res.status(404).json({ message: 'Donor not found.' });
        }

        donor.donationHistory.push(requestId);
        await donor.save();

        res.status(200).json({ message: `Donation history updated for Donor ${donorId} with request ${requestId}` });
    } catch (error) {
        console.error('Error updating donation history:', error);
        res.status(500).json({ message: 'Error updating donation history' });
    }
};

module.exports = { sendBloodRequest, acceptBloodRequest, updateDonationHistory};