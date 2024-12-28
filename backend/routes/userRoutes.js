const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// authentication routes
router.post('/signup', userController.signup);
router.post('/login', userController.login);


// get user profile
router.get('/me', 
  authMiddleware.protect, 
  (req, res) => {
    res.status(200).json({
      status: 'success',
      data: { user: req.user }
    });
  }
);

// enrolling in a course
router.post('/enroll/:courseId',
    authMiddleware.protect,
    userController.enrollInCourse
);

// get enrolled courses
router.get('/enrolled-courses',
    authMiddleware.protect,
    userController.getEnrolledCourses
);


module.exports = router;