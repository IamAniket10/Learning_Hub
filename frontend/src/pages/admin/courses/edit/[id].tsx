import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProtectedRoute from "@/components/ProtectedRoute";
import CourseForm from "@/components/CourseForm";
import { courseService } from "@/services/courseService";
import { Course } from "@/types";

export default function EditCourse() {
    const [course, setCourse] = useState<Course | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            fetchCourse();
        }
    }, [id]);

    const fetchCourse = async () => {
        try {
            const response = await courseService.getCourse(id as string);
            setCourse(response.data.course);
        } catch (error) {
            console.error('Failed to fetch course:', error);
            alert('Failed to fetch course');
        }
    };

    const handleSubmit = async (data: Partial<Course>) => {
        setIsLoading(true);
        try {
            await courseService.updateCourse(id as string, data);
            router.push('/dashboard');
        } catch (error) {
            console.error('Failed to update course:', error);
            alert('Failed to update course');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ProtectedRoute allowedRoles={['admin']}>
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-orange-500">Edit Course</h1>
                {course && (
                    <CourseForm 
                        initialData={course}
                        onSubmit={handleSubmit}
                        isLoading={isLoading}
                    />
                )}
            </div>
        </ProtectedRoute>
    );
}