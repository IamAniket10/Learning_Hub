import { useEffect, useState } from "react";
import { Course } from "@/types";


type CourseFormProps = {
    initialData?: Course;
    onSubmit: (data: Partial<Course>) => void;
    isLoading?: boolean;
};

const CourseForm: React.FC<CourseFormProps> = ({
    initialData,
    onSubmit,
    isLoading = false
}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: '', 
        instructor: '',
    });

    useEffect(() => {
        if(initialData){
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-700 mb-2 ">Title</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg text-black"
                    required
                />
            </div>

            <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg text-black"
                    rows={4}
                    required
                />
            </div>

            <div>
                <label className="block text-gray-700 mb-2">Duration</label>
                <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg text-black"
                    required
                />
            </div>

            <div>
                <label className="block text-gray-700 mb-2">Instructor</label>
                <input
                    type="text"
                    name="instructor"
                    value={formData.instructor}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg text-black"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-700 transition disabled:opacity-50"
            >
                {isLoading ? 'Saving...' : 'Save Course'}
            </button>
        </form>
    );
};

export default CourseForm;