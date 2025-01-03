import ProtectedRoute from "@/components/ProtectedRoute";
import { courseService } from "@/services/courseService";
import { useRouter } from "next/router";
import { useState } from "react";
import CourseForm from '@/components/CourseForm';
import { Course } from '@/types';


export default function NewCourse() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async ( data: Partial<Course> ) => {
        setIsLoading(true);
        try {
            await courseService.createCourse(data);
            router.push('/dashboard');
        } catch (error) {
            const err = error as Error;
            console.error('Failed to create course:', err);
            alert('Failed to create course');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ProtectedRoute allowedRoles={['admin']}>
            <div className="max-w-2xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-orange-500">Create New Course</h1>
                <CourseForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
        </ProtectedRoute>
    )
}