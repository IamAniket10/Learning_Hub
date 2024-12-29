export interface User {
    _id: string;
    username: string;
    email: string;
    role: 'user' | 'admin';
    enrolledCourses?: string[];
};

export interface Course {
    _id: string;
    title: string;
    description: string;
    duration: string;
    instructor: string;
};

export interface SignupData {
    username: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
  };