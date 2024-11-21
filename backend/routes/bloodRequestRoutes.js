const express = require('express');
const { verifyRole, verifyToken, isHospital} = require('../middlewares/authMiddlewares');
const {
    sendBloodRequest,
    acceptBloodRequest,
    getAllBloodRequests,
    getBloodRequestById,
    updateBloodRequestStatus,
    deleteBloodRequest
} = require('../controller/bloodrequestController');


const router = express.Router();

// Routes
// Create a new blood request (Hospitals only)
router.post('/blood-requests', sendBloodRequest);

// Accept a blood request (Donors only)
router.post('/blood-requests/:requestId/accept', acceptBloodRequest);

// Get all blood requests (Admins & Hospitals)
router.get('/blood-requests', getAllBloodRequests);

// Get a specific blood request by ID (Admins, Hospitals, Donors)
router.get('/blood-requests/:id',getBloodRequestById);

// Update a blood request's status (Admins only)
router.put('/blood-requests/:id/status', verifyToken, verifyRole(['Admin']), updateBloodRequestStatus);

// Delete a blood request (Admins only)
router.delete('/blood-requests/:id', verifyToken, verifyRole(['Admin']), deleteBloodRequest);

module.exports = router;
