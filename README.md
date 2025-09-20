# 🎓 EduHub - Online Learning Platform

A modern, full-stack online learning platform built with MERN stack, featuring Apple-inspired design and comprehensive course management functionality.

## ✨ Features

### 🔐 Authentication & Authorization
- **Role-based Access Control**: Admin and Student roles
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Role-specific access to features

### 👨‍💼 Admin Features
- **Course Management**: Create, read, update, and delete courses
- **Admin Dashboard**: Comprehensive course management interface
- **Student Enrollment Tracking**: View enrolled students for each course

### 🎓 Student Features
- **Course Browsing**: Browse available courses
- **Course Enrollment**: Enroll in courses of interest
- **Personal Dashboard**: View enrolled courses and progress
- **Course Unenrollment**: Leave courses when needed

### 🎨 Design Features
- **Apple-inspired UI**: Clean, minimal, and modern design
- **Responsive Design**: Works seamlessly on all devices
- **Interactive Elements**: Smooth hover effects and transitions
- **Accessibility**: Proper focus states and keyboard navigation

## 🛠️ Tech Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

### Frontend
- **React**: Frontend framework
- **React Router**: Client-side routing
- **Context API**: State management
- **CSS3**: Styling with Apple-inspired design
- **Vite**: Build tool and dev server

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eduhub-learning-platform
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the backend directory:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/mern_auth
   JWT_SECRET=your-secret-key
   PORT=3001
   ```

5. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

6. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```

7. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```

8. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## 📱 Usage

### Admin Access
- **Login**: Use `admin@gmail.com` / `admin`
- **Features**: Create courses, manage students, delete courses

### Student Access
- **Registration**: Create a new student account
- **Login**: Use your registered credentials
- **Features**: Browse courses, enroll, view progress

## 🗂️ Project Structure

```
eduhub-learning-platform/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   └── courseController.js  # Course management logic
│   ├── middleware/
│   │   └── auth.js              # Authentication middleware
│   ├── models/
│   │   ├── User.js              # User model
│   │   ├── Course.js            # Course model
│   │   └── Enrollment.js       # Enrollment model
│   ├── routes/
│   │   ├── authRoutes.js        # Authentication routes
│   │   └── courseRoutes.js      # Course routes
│   ├── package.json
│   └── server.js                # Main server file
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── CourseList.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── StudentDashboard.jsx
│   │   ├── context/
│   │   │   └── UserContext.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Courses (Public)
- `GET /api/courses` - Get all published courses
- `GET /api/courses/:id` - Get course details

### Courses (Student)
- `GET /api/courses/student/enrolled` - Get enrolled courses
- `POST /api/courses/:courseId/enroll` - Enroll in course
- `DELETE /api/courses/:courseId/unenroll` - Unenroll from course

### Courses (Admin)
- `GET /api/courses/admin/all` - Get all courses (admin view)
- `POST /api/courses/admin/create` - Create new course
- `PUT /api/courses/admin/:id` - Update course
- `DELETE /api/courses/admin/:id` - Delete course

## 🎨 Design System

### Color Palette
- **Primary**: #007AFF (Apple Blue)
- **Secondary**: #5856D6 (Purple)
- **Success**: #34C759 (Green)
- **Warning**: #FF9500 (Orange)
- **Danger**: #FF3B30 (Red)

### Typography
- **Font Family**: Inter (Apple-like)
- **Font Weights**: 300, 400, 500, 600, 700

### Components
- **Cards**: Clean white backgrounds with subtle shadows
- **Buttons**: Apple-style with hover effects
- **Forms**: Minimal inputs with focus states
- **Navigation**: Clean header with proper spacing

## 🔒 Security Features

- **JWT Tokens**: Secure authentication
- **Password Hashing**: bcryptjs for password security
- **CORS Protection**: Configured for frontend-backend communication
- **Input Validation**: Server-side validation for all inputs
- **Protected Routes**: Role-based access control

## 🚀 Deployment

### Backend Deployment (Heroku)
1. Create a Heroku app
2. Set environment variables
3. Deploy the backend code
4. Configure MongoDB Atlas

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Update API URLs to production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request






