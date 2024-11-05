const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = async (req, res) => {
    const { username, email, password, bio, profilePicture } = req.body;
    try {
        const newUser = new User({ username, email, password, bio, profilePicture });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Error creating user', error: err });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id },process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};

exports.profile = async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json(user);
};

exports.logout = (req, res) => {
    res.json({ message: 'User logged out' });
};


exports.updateProfile = async (req, res) => {

    const { bio, profilePicture, email, username } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { bio, profilePicture, email, username },
            { new: true, runValidators: true }
        ).select('-password'); 

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

