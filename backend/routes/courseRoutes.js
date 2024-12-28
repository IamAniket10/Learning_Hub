const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');


// Route for getting all courses (requires authentication)
router.route('/')
    .get(
        authMiddleware.protect,
        courseController.getAllCourses
    )
    // Create course (admin only)
    .post(
        authMiddleware.protect,
        authMiddleware.restrictTo('admin'),
        courseController.createCourse
    );


// Routes for specific course operations
router.route('/:id')
    .get(
        authMiddleware.protect,
        courseController.getCourse
    )
    // Update course
    .put(
        authMiddleware.protect,
        authMiddleware.restrictTo('admin'),
        courseController.updateCourse
    )
    // Delete course
    .delete(
        authMiddleware.protect,
        authMiddleware.restrictTo('admin'),
        courseController.deleteCourse
    );



module.exports = router;