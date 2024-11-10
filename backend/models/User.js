const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,

        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Donor', 'Admin', 'Hospital'],
        required: true
    },
    bloodType: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        required: function() {
            return this.role === 'Donor';
        }
    },
    location: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true
    },
    donationHistory: [
        {
            bloodRequestId: { type: mongoose.Schema.Types.ObjectId, ref: 'BloodRequest' },
            hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital' },
            unitsDonated: { type: Number, required: true },
            dateOfDonation: { type: Date, required: true }
        }
    ]
});

module.exports = mongoose.model('User', userSchema);