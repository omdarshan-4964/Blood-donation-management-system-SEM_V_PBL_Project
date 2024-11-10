const User = require('../models/User');
const BloodRequest = require('../models/BloodRequest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const addUser = async (req, res) => {
    try {
        const { name, email, password, role, bloodType, location, contactNumber } = req.body;

        if (!name || !email || !password || !role || !location || !contactNumber) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (role === 'Donor' && !bloodType) {
            return res.status(400).json({ message: 'Blood type is required for Donors' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            bloodType: role === 'Donor' ? bloodType : null,
            location,
            contactNumber,
        });

        await newUser.save();
        res.status(201).json({ message: 'User added successfully', userId: newUser._id });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'Error adding user' });
    }
};


const removeUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User removed successfully' });
    } catch (error) {
        console.error('Error removing user:', error);
        res.status(500).json({ message: 'Error removing user' });
    }
};

const updateDonationHistory = async (req, res) => {
    try {
        const { donorId } = req.params;
        const { bloodRequestId, hospitalId, dateOfDonation, unitsDonated } = req.body;

        if (!unitsDonated || unitsDonated <= 0) {
            return res.status(400).json({ message: 'Units donated must be a positive number' });
        }

        const parsedDate = new Date(dateOfDonation);
        if (isNaN(parsedDate)) {
            return res.status(400).json({ message: 'Invalid date of donation' });
        }

        const donor = await User.findById(donorId);
        if (!donor || donor.role !== 'Donor') {
            return res.status(404).json({ message: 'Donor not found' });
        }

        const bloodRequest = await BloodRequest.findById(bloodRequestId);
        if (!bloodRequest) {
            return res.status(404).json({ message: 'Blood request not found' });
        }

        const hospital = await User.findById(hospitalId);
        if (!hospital || hospital.role !== 'Hospital') {
            return res.status(404).json({ message: 'Hospital not found.' });
        }

        donor.donationHistory.push({
            bloodRequestId: bloodRequest._id,
            hospitalId: hospital._id,
            unitsDonated: unitsDonated,
            dateOfDonation: parsedDate
        });
        await donor.save();

        bloodRequest.status = 'Completed';
        await bloodRequest.save();

        res.status(200).json({ message: 'Donation history updated successfully' });
    } catch (error) {
        console.error('Error updating donation history:', error);
        res.status(500).json({ message: 'Error updating donation history' });
    }
};

module.exports = { addUser, removeUser, updateDonationHistory }
