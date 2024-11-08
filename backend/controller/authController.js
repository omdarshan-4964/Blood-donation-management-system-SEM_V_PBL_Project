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

        res.json({
            message: 'Login successful', token
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

module.exports = { registerUser, loginUser};