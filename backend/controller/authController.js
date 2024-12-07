const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
    const { name, email, password, role, bloodType, location, contactNumber } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role,
            bloodType: role === 'Donor' ? bloodType: null,
            location,
            contactNumber
        });

        await user.save();
        res.status(201).json({
            message: 'User registered successfully'
        });
    }  catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role},
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

     const role = user.role;
     const id = user._id;
     const location = user.location;
        res.json({
            message: 'Login successful', token, role, id,location
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password for security
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    const { id } = req.headers;
    try {
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update user details
const updateUserDetails = async (req, res) => {
    const { id } = req.params;
    const updates = req.body; // Expect updated fields in the request body
    try {
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUsersByLocation = async (req, res) => {
    const { location } = req.params;  // Get the location from the URL parameters
  
    try {
      // Find Donors and Hospitals in the specified location
      const users = await User.find({
        location: location,
        $or: [{ role: 'Donor' }, { role: 'Hospital' }] // Filter by Donor or Hospital role
      });
  
      // If no users are found, return a 404 error
      if (users.length === 0) {
        return res.status(404).json({ message: 'No Donors or Hospitals found in this location' });
      }
  
      // Return the list of users (Donors and Hospitals)
      return res.status(200).json(users);
    } catch (error) {
      // Handle errors (e.g., database issues)
      console.error('Error fetching users:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  module.exports = {
    getUsersByLocation,
  };


module.exports = { 
    registerUser,
    loginUser, 
    getAllUsers,
    getUserById,
    updateUserDetails,
    deleteUser,
    getUsersByLocation
};