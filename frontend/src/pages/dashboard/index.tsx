import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProtectedRoute from "@/components/ProtectedRoute";
import { courseService } from "@/services/courseService";
import { Course } from "@/types";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            // Redirect if user is not logged in
            router.push('/login');
        } else {
            fetchCourses();
        }
    }, [user, router]);

    const fetchCourses = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await courseService.getAllCourses();
            setCourses(response.data.courses);
        } catch (error: unknown) {
            const err = error as Error;
            setError(err.message || 'Failed to fetch courses');
            console.error('Failed to fetch courses:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (courseId: string) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await courseService.deleteCourse(courseId);
                fetchCourses();
            } catch (error: unknown) {
                const err = error as Error;
                console.error('Failed to delete course:', err);
                setError(err.message || 'Failed to delete course');
            }
        }
    };

    // Filter courses based on user role and enrolled courses
    const displayedCourses = user?.role === 'user' && user.enrolledCourses
        ? courses.filter(course => user.enrolledCourses?.includes(course._id))
        : courses;

    if (isLoading) {
        return (
            <ProtectedRoute allowedRoles={['user', 'admin']}>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute allowedRoles={['user', 'admin']}>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-orange-500">
                        {user?.role === 'admin' ? 'Admin Dashboard' : 'My Enrolled Courses'}
                    </h1>
                    {user?.role === 'admin' && (
                        <button
                            onClick={() => router.push('/admin/courses/new')}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Add New Course
                        </button>
                    )}
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <p>{error}</p>
                        <button 
                            onClick={fetchCourses}
                            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {displayedCourses.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600">
                            {user?.role === 'admin' 
                                ? 'No courses available. Add your first course!'
                                : 'You are not enrolled in any courses yet.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {displayedCourses.map((course) => (
                            <div
                                key={course._id}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                <h2 className="text-xl font-semibold mb-2 text-orange-500">{course.title}</h2>
                                <p className="text-gray-600 mb-4">{course.description}</p>
                                <div className="space-y-1 text-sm text-gray-500">
                                    <p><span className="font-medium">Duration:</span> {course.duration}</p>
                                    <p><span className="font-medium">Instructor:</span> {course.instructor}</p>
                                </div>
                                
                                {user?.role === 'admin' && (
                                    <div className="mt-4 flex justify-end space-x-3">
                                        <button
                                            onClick={() => router.push(`/admin/courses/edit/${course._id}`)}
                                            className="text-blue-500 hover:text-blue-700 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(course._id)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
}

