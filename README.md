# LearningHub - Course Management System 🎓

A Learning Management System (LMS) built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring separate Admin and User views for course management.

## Live Demo 🌐
- Frontend: [https://learning-hub-frontend.vercel.app](https://learning-hub-frontend.vercel.app)
- Backend: [https://learning-hub-7npg.onrender.com](https://learning-hub-7npg.onrender.com)

## Features ⭐

### Admin Features 👨‍💼
- Dashboard to manage all courses  
- Add new courses
- Edit existing courses
- Delete courses
- View all available courses

### User Features 👨‍🎓
- Browse course catalog
- View detailed course information
- Enroll in courses
- View enrolled courses

## Tech Stack 🛠️

### Frontend 
- ⚡ Next.js 14
- 📘 TypeScript
- 🎨 Tailwind CSS
- 🎯 Lucide React
- 🔄 Axios

### Backend 
- 💚 Node.js
- 🚀 Express.js
- 🍃 MongoDB
- 🔐 JWT Authentication

## Prerequisites ✅
- 📦 Node.js (v14 or higher)
- 🗄️ MongoDB Atlas Account
- 📟 Git

## Installation 💻

1. Clone the repository:
```bash
git clone https://github.com/IamAniket10/Learning_Hub.git
cd Learning_Hub
```

2. Install Backend Dependencies:
```bash
cd backend
npm install
```
3. Install Frontend Dependencies:
```bash
cd frontend
npm install
```

4. Set up Environment Variables:
Backend (.env):
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
FRONTEND_URL=http://localhost:3000
```
Frontend (.env.local):
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Running Locally

1. Start Backend Server:
```bash
cd backend
npm start
```

2. Start Frontend Development Server:
```bash
cd frontend
npm run dev
```

### The application will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## API Endpoints

### Auth Routes

```
POST /api/users/register - Register new user
POST /api/users/login - User login
GET /api/users/logout - User logout
```

### Course Routes
```
GET /api/courses - Get all courses
GET /api/courses/:id - Get course by ID
POST /api/courses - Add new course (Admin only)
PUT /api/courses/:id - Update course (Admin only)
DELETE /api/courses/:id - Delete course (Admin only)
```

### User Routes
```
POST /api/users/enroll/:courseId - Enroll in a course
GET /api/users/enrolled-courses - Get user's enrolled courses
```

## Test Credentials 🔑
### Admin Account

- 📧 Email: testadmin@gmail.com
- 🔒 Password: testadmin123

## User Account

- 📧 Email: testuser@gmail.com
- 🔒 Password: testuser123

## Deployment 🚀
### The project is deployed using:

- ▲ Frontend: Vercel
- 🌐 Backend: Render
- 🍃 Database: MongoDB Atlas

## Contributing
- Feel free to submit issues and enhancement requests.
## License
- This project is licensed under the MIT License.
