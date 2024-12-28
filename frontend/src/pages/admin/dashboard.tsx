// import ProtectedRoute from "@/components/ProtectedRoute";
// import { courseService } from "@/services/courseService";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { Course } from "@/types";

// export default function AdminDashboard() {
//     const [courses, setCourses] = useState<Course[]>([]);
//     const router = useRouter();

//     useEffect(() => {
//         fetchCourses();
//     }, []);

//     const fetchCourses = async () => {
//         try {
//             const response = await courseService.getAllCourses();
//             setCourses(response.data.courses);
//         } catch (error) {
//             console.error('Failed to fetch courses:', error);
//         }
//     };

//     const handleDelete = async (id: string) => {
//         if(window.confirm('Are you sure you want to delete this course?')) {
//             try {
//                 await courseService.deleteCourse(id);
//                 fetchCourses();
//             } catch (error) {
//                 console.log('Failed to delete course:', error);
//             }
//         }
//     };

//     return (
//         <ProtectedRoute allowedRoles = {['admin']}>
//             <div className="space-y-6">
//                 <div className="flex justify-between items-center">
//                     <h1 className="text-2xl font-bold text-orange-500">Admin Dashboard</h1>
//                     <button
//                         onClick={() => router.push('/admin/courses/new')}
//                         className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
//                     >
//                         Add New Course
//                     </button>
//                 </div>

//                 <div className="grid gap-6">
//                     {courses.map((course) => (
//                       <div
//                         key = {course._id}
//                         className="bg-white p-6 rounded-lg shadow-md"
//                       >
//                       <div className="flex justify-between items-start">
//                           <div>
//                               <h2 className="text-xl font-semibold text-orange-500">{course.title}</h2>
//                               <p className="text-gray-600 mt-2">{course.description}</p>
//                               <div className="mt-2 space-y-1">
//                                   <p className="text-sm font-semibold text-black">Duration: {course.duration}</p>
//                                   <p className="text-sm font-semibold text-black">Instructor: {course.instructor}</p>
//                               </div>
//                           </div>
//                           <div className="space-x-2">
//                             <button
//                                 onClick={() => router.push(`/admin/courses/edit/${course._id}`)}
//                                 className="bg-primary-500 text-white px-2 py-1 rounded-lg hover:bg-primary-700"
//                             >
//                                 Edit
//                             </button>
//                             <button
//                                 onClick={() => handleDelete(course._id)}
//                                 className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-700"
//                             >
//                                 Delete
//                             </button>
//                           </div>
//                       </div>
//                   </div>  
//                     ))}
//                 </div>
//             </div>
//         </ProtectedRoute>
//     );
// }