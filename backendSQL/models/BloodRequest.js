const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema({
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    bloodType: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        required: true
    },
    location: {
        type: String,
        required: true 
    },
    unitsNeeded: {
        type: Number,
        required: true 
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Completed'],
        default: 'Pending'
    },
    acceptedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);
