import axios from "axios";
//import { headers } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const COURSES_URL = `${BASE_URL}/courses`;
const USERS_URL = `${BASE_URL}/users`;


export const courseService = {
    getAllCourses: async () => {
        const token = localStorage.getItem('token');
        const response = await axios.get(COURSES_URL, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    getCourse: async (id: string) => {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${COURSES_URL}/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    createCourse: async (courseData: any) => {
        const token = localStorage.getItem('token');
        const response = await axios.post(COURSES_URL, courseData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    updateCourse: async (id: string, courseData: any) => {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${COURSES_URL}/${id}`, courseData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    deleteCourse: async (id: string) => {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`${COURSES_URL}/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    enrollInCourse: async (courseId: string) => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }
        const response = await axios.post(`${USERS_URL}/enroll/${courseId}`, {}, {
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    },

    getEnrolledCourses: async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No authentication token found');
        }
        const response = await axios.get(`${USERS_URL}/enrolled-courses`, {
            headers: { 
                'Authorization': `Bearer ${token}`,
                 'Content-Type': 'application/json'
                }
        });
        return response.data;
    }
};