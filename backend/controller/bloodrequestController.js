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
        const { requestId } = req.params; // Blood request ID
        const donorId = req.body.donorId; // Donor ID from request body

        // Fetch the blood request by ID
        const bloodRequest = await BloodRequest.findById(requestId);
        if (!bloodRequest) {
            return res.status(404).json({ message: 'Blood request not found.' });
        }

        // Check if the blood request has already been accepted
        if (bloodRequest.status === 'Accepted') {
            return res.status(400).json({ message: 'Blood request has already been accepted.' });
        }

        // Fetch the donor details from the User model
        const donor = await User.findById(donorId);
        if (!donor) {
            return res.status(404).json({ message: 'Donor not found.' });
        }

        // Validate location: Ensure donor's location matches the blood request's location
        if (bloodRequest.location.toLowerCase() !== donor.location.toLowerCase()) {
            return res.status(400).json({
                message: 'Donor location does not match the request location.',
            });
        }

        // Blood compatibility validation
        const compatibleBloodTypes = {
            'A+': ['A+', 'AB+'],
            'O+': ['O+', 'A+', 'B+', 'AB+'],
            'B+': ['B+', 'AB+'],
            'AB+': ['AB+'],
            'A-': ['A+', 'A-', 'AB+', 'AB-'],
            'O-': ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
            'B-': ['B+', 'B-', 'AB+', 'AB-'],
            'AB-': ['AB+', 'AB-'],
        };

        const donorBloodType = donor.bloodType;
        const requestBloodType = bloodRequest.bloodType;

        // Check if the donor's blood type is compatible with the requested blood type
        if (
            !compatibleBloodTypes[donorBloodType] ||
            !compatibleBloodTypes[donorBloodType].includes(requestBloodType)
        ) {
            return res.status(400).json({
                message: `Donor blood type (${donorBloodType}) is not compatible with request blood type (${requestBloodType}).`,
            });
        }

        // Update the blood request to 'Accepted' status
        bloodRequest.status = 'Accepted';
        bloodRequest.acceptedBy = donorId;
        await bloodRequest.save();

        // Add to the donor's donation history
        donor.donationHistory.push({
            bloodRequestId: bloodRequest._id,
            hospitalId: bloodRequest.hospitalId, // Assuming the blood request contains the hospital ID
            unitsDonated: bloodRequest.unitsNeeded, // Assuming 'unitsNeeded' refers to the number of units requested
            dateOfDonation: new Date(),
        });
        await donor.save();

        res.status(200).json({
            message: `Blood request ${requestId} accepted by Donor ${donorId}`,
        });
    } catch (error) {
        console.error('Error accepting blood request:', error);
        res.status(500).json({ message: 'Error accepting blood request' });
    }
};

// Get all blood requests
const getAllBloodRequests = async (req, res) => {
    try {
        const bloodRequests = await BloodRequest.find()
        .populate('hospital');
        
        res.status(200).json(bloodRequests);
    } catch (error) {
        console.error('Error fetching blood requests:', error);
        res.status(500).json({ message: 'Error fetching blood requests' });
    }
};

// Get a blood request by ID
const getBloodRequestById = async (req, res) => {
    const { id } = req.params;
    try {
        const bloodRequest = await BloodRequest.findById(id)
        .populate('hospital');
    
        if (!bloodRequest) {
            return res.status(404).json({ message: 'Blood request not found' });
        }
        res.status(200).json(bloodRequest);
    } catch (error) {
        console.error('Error fetching blood request:', error);
        res.status(500).json({ message: 'Error fetching blood request' });
    }
};

// Update blood request status
const updateBloodRequestStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Accepted', 'Completed'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        const bloodRequest = await BloodRequest.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        if (!bloodRequest) {
            return res.status(404).json({ message: 'Blood request not found' });
        }
        res.status(200).json({ message: 'Status updated successfully', bloodRequest });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ message: 'Error updating status' });
    }
};

// Delete a blood request
const deleteBloodRequest = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBloodRequest = await BloodRequest.findByIdAndDelete(id);
        if (!deletedBloodRequest) {
            return res.status(404).json({ message: 'Blood request not found' });
        }
        res.status(200).json({ message: 'Blood request deleted successfully' });
    } catch (error) {
        console.error('Error deleting blood request:', error);
        res.status(500).json({ message: 'Error deleting blood request' });
    }
};

module.exports = {
    sendBloodRequest,
    acceptBloodRequest,
    getAllBloodRequests,
    getBloodRequestById,
    updateBloodRequestStatus,
    deleteBloodRequest
};