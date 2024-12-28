import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Course } from '@/types';
import { courseService } from '@/services/courseService';

export default function MyCourses() {
    const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router =  useRouter();

    useEffect(() => {
        fetchEnrolledCourses();
    }, []);

    const fetchEnrolledCourses = async () => {
        try {
            const response = await courseService.getEnrolledCourses();
            if (response.data && response.data.enrolledCourses) {
                setEnrolledCourses(response.data.enrolledCourses);
            }
        } catch (error) {
            console.error('Failed to fetch enrolled courses', error);
        } finally {
            setIsLoading(false);
        }
    };

    if(isLoading){
        return <div className='text-center py-10'>Loading...</div>
    }

    return (
        <ProtectedRoute>
            <div className='space-y-6'>
                <h1 className='text-2xl font-bold text-orange-500'>My Enrolled Courses</h1>
                {enrolledCourses.length === 0 ? (
                    <div className='text-center py-10'>
                        <p className='text-gray-600'>You haven't enrolled in any courses yet.</p>
                        <button
                            onClick={() => router.push('/courses')}
                            className='mt-4 text-primary-500 hover:text-primary-700'
                        >
                            Browse Courses
                        </button>
                    </div>
                ) : (
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {enrolledCourses.map((course) => (
                        <div
                            key={course._id}
                            className='bg-white rounded-lg shadow-md overflow-hidden'
                        >
                            <div className='p-6'>
                                <h2 className='text-xl font-semibold mb-2 text-orange-500'>{course.title}</h2>
                                <p className='text-gray-600 mb-4 line-clamp-3'>
                                    {course.description}
                                </p>
                                <div className='text-sm space-y-1 font-semibold text-black'>
                                    <p>Duration: {course.duration}</p>
                                    <p>Instructor: {course.instructor}</p>
                                </div>
                            </div>
                        </div>             
                        ))}    
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
}