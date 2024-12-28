const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    //check if token exists
    let token;
    if(
        req.headers.authorization && 
        req.headers.authorization?.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if(!token) {
        return res.status(401).json({
            status: 'error',
            message: 'You are not logged in. Please log in to get access.'
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // find user and attach to request
        const currentUser = await User.findById(decoded.id);

        if(!currentUser) {
            return res.status(401).json({
                status: 'error',
                message: 'The user belonging to this token no longer exists.'
            });
        }

        // attach user to request object
        req.user = currentUser;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid token. Please log in again.'
        });
    }
};


//Role based authentication
exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        // Check if user exists and has required role
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'error',
                message: 'You do not have permission to perform this action'
            });
        }

        next();
    };
};