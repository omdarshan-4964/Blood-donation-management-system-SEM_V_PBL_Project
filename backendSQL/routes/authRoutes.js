const express = require('express');
const router = express.Router();

const { registerUser, 
        loginUser,
        getAllUsers,
        getUserById,
        updateUserDetails,
        deleteUser } = require('../controller/authController');

router.post('/register', registerUser);

router.post('/login', loginUser);

// Get all users
router.get('/', getAllUsers);

// Get a user by ID
router.get('/:id', getUserById);

// Update user details
router.put('/:id', updateUserDetails);

// Delete user
router.delete('/:id', deleteUser);

module.exports = router;