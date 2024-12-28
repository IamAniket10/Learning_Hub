import React from "react";

interface CourseSearchProps {
    onSearch: (query: string) => void;
    onFilterByDuration: (duration: string) => void;
    onFilterByInstructor: (instructor: string) => void;
    durations: string[];
    instructors: string[];
}

const CourseSearch: React.FC<CourseSearchProps> = ({
    onSearch,
    onFilterByDuration,
    onFilterByInstructor,
    durations,
    instructors
}) => {
    return (
        <div className="mb-6 space-y-4">
            <div className="relative">
                <input 
                    type="text" 
                    placeholder="Search courses by title"
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-black"
                />
            </div>

            <div className="flex gap-4"> 
                <select
                    onChange={(e) => onFilterByDuration(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-black"
                    defaultValue=""
                >
                    <option value="">All Duration</option>
                    {durations.map((duration) => (
                        <option key={duration} value={duration}>
                            {duration}
                        </option>
                    ))}
                </select>

                <select
                    onChange={(e) => onFilterByInstructor(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-black"
                    defaultValue=""
                >
                    <option value="">All Instructors</option>
                    {instructors.map((instructor) => (
                        <option key={instructor} value={instructor}>
                            {instructor}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default CourseSearch;