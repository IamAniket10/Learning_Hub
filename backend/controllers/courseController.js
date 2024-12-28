const Course = require('../models/Course');

// Get all courses
exports.getAllCourses = async (req, res) => {
    try{
        const courses = await Course.find();
        res.status(200).json({
            status: 'success',
            results: courses.length,
            data: {courses}
        });
    } catch (error){
        res.status(500).json({
            status: 'error',
            message: 'Could not fetch courses',
            error: error.message
        });
    }
};


// Create new course
exports.createCourse = async (req, res) => {
    try {
        const newCourse = await Course.create({
            title: req.body.title,
            description: req.body.description,
            duration: req.body.duration,
            instructor: req.body.instructor
        });

        res.status(201).json({
            status: 'success',
            data: { course: newCourse }
        });
    } catch(error){
        res.status(400).json({
            status: 'error',
            message: 'Could not create course',
            error: error.message
        });
    }
};


// Update a course
exports.updateCourse = async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );

        if(!updatedCourse){
            return res.status(404).json({
                status: 'error',
                message: 'No course found with that ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { course: updatedCourse}
        });
    } catch (error){
        res.status(400).json({
            status: 'error',
            message: 'Could not update course',
            error: error.message
        });
    }
};


// Delete a course
exports.deleteCourse =async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);

        if(!course) {
            return res.status(404).json({
                status: 'error',
                message: 'No course found with that ID'
            });
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error){
        res.status(400).json({
            status: 'error',
            message: 'Could not delete course',
            error: error.message
        });
    }
};

// Get a single course
exports.getCourse = async (req, res) => {
    try{
        const course = await Course.findById(req.params.id);

        if(!course){
            return res.status(404).json({
                status: 'error',
                message: 'No course found with that ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { course }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Could not fetch course',
            error: error.message
        });
    }
};