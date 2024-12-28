import ProtectedRoute from "@/components/ProtectedRoute";
import { courseService } from "@/services/courseService";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Course } from "@/types";
import CourseSearch from "@/components/CourseSearch";

export default function CourseList() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [durationFilter, setDurationFilter] = useState('');
    const [instructorFilter, setInstructorFilter] = useState('');
    const router = useRouter();

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await courseService.getAllCourses();
            setCourses(response.data.courses);
        } catch (error) {
            console.log('Failed to fetch courses:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const durations = useMemo(() => {
        return Array.from(new Set(courses.map(course => course.duration)));
    }, [courses]);

    const instructors = useMemo(() => {
        return Array.from(new Set(courses.map(course => course.instructor)));
    }, [courses]);

    const filteredCourses = useMemo(() => {
        return courses.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesDuration = !durationFilter || course.duration === durationFilter;
            const matchesInstructor = !instructorFilter || course.instructor === instructorFilter;

            return matchesSearch && matchesDuration && matchesInstructor;
        });
    }, [courses, searchQuery, durationFilter, instructorFilter]);

    if(isLoading){
        return <div className="text-center py-10">Loading...</div>
    }

    return (
        <ProtectedRoute>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-orange-500">Available Courses</h1>

                <CourseSearch 
                    onSearch={setSearchQuery}
                    onFilterByDuration={setDurationFilter}
                    onFilterByInstructor={setInstructorFilter}
                    durations={durations}
                    instructors={instructors}
                />

                <div className="text-sm text-gray-600">
                    Showing {filteredCourses.length} of {courses.length} courses
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div
                            key={course._id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                        >
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-2 text-orange-500">{course.title}</h2>
                            <p className="text-gray-600 mb-4 line-clamp-3">
                                {course.description}
                            </p>
                            <div className="text-sm text-gray-500 space-y-1 mb-4">
                                <p>Duration: {course.duration}</p>
                                <p>Instructor: {course.instructor}</p>
                            </div>
                            <button
                                onClick={() => router.push(`/courses/${course._id}`)}
                                className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-700 transition"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                    ))}
                </div>

                {filteredCourses.length === 0 && (
                    <div className="text-center py-10 text-gray-600">
                        No courses found matching your criteria
                    </div>
                )}
            </div>
        </ProtectedRoute>
    );
};