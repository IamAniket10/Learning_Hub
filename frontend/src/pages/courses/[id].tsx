import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { courseService } from '@/services/courseService';
import { Course } from '@/types';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';


export default function CourseDetail() {
    const [course, setCourse] = useState<Course | null> (null);
    const [isLoading, setIsLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);
    const router = useRouter();
    const { id } = router.query;
    const { user } = useAuth();
    
    const fetchCourses = useCallback(async () => {
        try {
            const response = await courseService.getCourse(id as string);
            setCourse(response.data.course);
        } catch (error) {
            const err = error as Error;
            console.error('Failed to fetch course:', err);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    useEffect(() => {
        if(id) {
            fetchCourses();
        }
    }, [id, fetchCourses]);


    const handleEnroll = async () => {
        if(!course) return;
        setEnrolling(true);
        try {
            const token = localStorage.getItem('token');
            console.log('Token available:', !!token); // For debugging
            if (!token) {
                router.push('/login');
                return;
            }
            
            const response = await courseService.enrollInCourse(course._id);
            console.log('Enrollment response:', response); // For debugging
            
            router.push('/courses/my-courses');
        } catch (error: unknown) {
            const err = error as Error;
            if (axios.isAxiosError(err)) {
                console.error('Enrollment error:', err.response?.data || err.message);
                if (err.response?.status === 401) {
                    // If unauthorized, redirect to login
                    router.push('/login');
                } else {
                    alert(err.response?.data?.message || 'Failed to enroll in course');
                }
            } else {
                console.error('Enrollment error:', err.message);
                alert('Failed to enroll in course');
            }
        } finally {
            setEnrolling(false);
        }
    };

    if(isLoading) {
        return <div className='text-center py-10'>Loading...</div>
    }

    if(!course){
        return <div className='text-center py-10'>Course not found</div>
    }

    return (
        <ProtectedRoute>
            <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8'>
                <h1 className='text-3xl font-bold mb-6 text-orange-500'>{course.title}</h1>
                <div className='space-y-6'>
                    <div>
                        <h2 className='text-xl font-semibold mb-2 text-primary-500'>Description</h2>
                        <p className='text-grey-600 text-black'>{course.description}</p>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <h2 className='text-xl font-semibold mb-2 text-black'>Duration</h2>
                            <p className='text-gray-600'>{course.duration}</p>
                        </div>
                        <div>
                            <h2 className='text-xl font-semibold mb-2 text-black'>Instructor</h2>
                            <p className='text-gray-600'>{course.instructor}</p>
                        </div>
                    </div>

                    {user?.role == 'user' && (
                        <button
                            onClick={handleEnroll}
                            disabled={enrolling}
                            className='w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-700 transition disabled:opacity-50'
                        >
                            {enrolling ? 'Enrolling...' : 'Enroll Now'}
                        </button>
                    )}
                </div>
            </div>
        </ProtectedRoute>
    );
}