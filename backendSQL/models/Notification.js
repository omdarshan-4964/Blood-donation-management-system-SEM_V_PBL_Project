const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    bloodRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BloodRequest', 
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Unread', 'Read'],
        default: 'Unread'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notification', notificationSchema);
