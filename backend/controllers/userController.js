const Course = require('../models/Course');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// generating jwt token
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

// SEND TOKEN REPSONSE
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    // remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: { user }
    });
};

// user registration
exports.signup = async (req, res, next) => {
    try{
        // create new user
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role || 'user'
        });

        //generate token and response
        createSendToken(newUser, 201, res);
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'User resgistration failed',
            error: error.message
        });
    }
};

// user login
exports.login = async (req, res, next) => {
    try{
        const { email, password } = req.body;

        // check if email and password exists
        if(!email || !password){
            return res.status(400).json({
                status: 'error',
                message: 'Please provide email and password'
            });
        }

        // check if user exist and password is correct
        const user = await User.findOne({ email }).select('+password');

        if(!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({
                status: 'error',
                message: 'Incorrect email or password'
            });
        }

        // if everything is okay, send token
        createSendToken(user, 200, res);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Login failed',
            error: error.message
        });
    }
};


// method to enroll in course
exports.enrollInCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.user._id;

        // check if course exists
        const course = await Course.findById(courseId);
        if(!course) {
            return res.status(404).json({
                status: 'error',
                message: 'Course not found'
            });
        }

        // Check if already enrolled
        const user = await User.findById(userId);
        if (user.enrolledCourses.includes(courseId)) {
            return res.status(400).json({
                status: 'error',
                message: 'Already enrolled in this course'
            });
        }

        // Update user's enrolled courses
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { enrolledCourses: courseId } },
            { new: true }
        ).populate('enrolledCourses');

        res.status(200).json({
            status: 'success',
            data: {
                user: updatedUser,
                course
            }
        });
    } catch (error) {
        res.status(400).json({ 
            status: 'error',
            message: 'Enrollment failed',
            error: error.message
        });
    }
};

//method to get enrolled courses
exports.getEnrolledCourses = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('enrolledCourses');

        res.status(200).json({
            status: 'success',
            results: user.enrolledCourses.length,
            data: {
                enrolledCourses: user.enrolledCourses
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'failed to fetch enrolled courses',
            error: error.message
        });
    }
};