import express from "express";
import {
  getAllCourses,
  getAllCoursesAdmin,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  unenrollFromCourse,
  getStudentCourses
} from "../controllers/courseController.js";
import { authenticateToken, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public routes (no auth required)
router.get("/", getAllCourses); // Get all published courses
router.get("/:id", getCourseById); // Get single course details

// Student routes (auth required)
router.get("/student/enrolled", authenticateToken, getStudentCourses); // Get student's enrolled courses
router.post("/:courseId/enroll", authenticateToken, enrollInCourse); // Enroll in course
router.delete("/:courseId/unenroll", authenticateToken, unenrollFromCourse); // Unenroll from course

// Admin routes (admin auth required)
router.get("/admin/all", authenticateToken, requireAdmin, getAllCoursesAdmin); // Get all courses (admin view)
router.post("/admin/create", authenticateToken, requireAdmin, createCourse); // Create new course
router.put("/admin/:id", authenticateToken, requireAdmin, updateCourse); // Update course
router.delete("/admin/:id", authenticateToken, requireAdmin, deleteCourse); // Delete course

export default router;
