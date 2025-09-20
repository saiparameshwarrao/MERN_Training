import Course from "../models/Course.js";
import User from "../models/User.js";
import Enrollment from "../models/Enrollment.js";

// Get all published courses (for students to browse)
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .populate('instructor', 'name')
      .select('-lessons.content'); // Don't send full lesson content in list view
    
    // Handle courses with null instructor (admin courses)
    const coursesWithInstructor = courses.map(course => {
      if (!course.instructor) {
        course.instructor = { name: "Admin" };
      }
      return course;
    });
    
    res.json(coursesWithInstructor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all courses (admin only)
export const getAllCoursesAdmin = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('instructor', 'name')
      .populate('enrolledStudents', 'name email');
    
    // Handle courses with null instructor (admin courses)
    const coursesWithInstructor = courses.map(course => {
      if (!course.instructor) {
        course.instructor = { name: "Admin" };
      }
      return course;
    });
    
    res.json(coursesWithInstructor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single course details
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name')
      .populate('enrolledStudents', 'name email');
    
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    
    // Handle courses with null instructor (admin courses)
    if (!course.instructor) {
      course.instructor = { name: "Admin" };
    }
    
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new course (admin only)
export const createCourse = async (req, res) => {
  try {
    const { title, description, lessons, price, category, thumbnail } = req.body;
    
    // For admin, we'll set instructor to null or create a special admin instructor
    const course = new Course({
      title,
      description,
      instructor: req.user.id === "admin" ? null : req.user.id,
      lessons: lessons || [],
      price: price || 0,
      category,
      thumbnail,
      isPublished: false // Admin can publish later
    });
    
    await course.save();
    
    // If instructor is null (admin case), we'll manually set the instructor name
    if (!course.instructor) {
      course.instructor = { name: "Admin" };
    } else {
      await course.populate('instructor', 'name');
    }
    
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update course (admin only)
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    
    // Check if user is admin or the course instructor
    if (req.user.role !== 'admin' && course.instructor && course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to update this course" });
    }
    
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate('instructor', 'name');
    
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete course (admin only)
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    
    // Check if user is admin or the course instructor
    if (req.user.role !== 'admin' && course.instructor && course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not authorized to delete this course" });
    }
    
    // Remove all enrollments for this course
    await Enrollment.deleteMany({ course: req.params.id });
    
    await Course.findByIdAndDelete(req.params.id);
    
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Enroll student in course
export const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    
    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      student: req.user.id,
      course: courseId
    });
    
    if (existingEnrollment) {
      return res.status(400).json({ error: "Already enrolled in this course" });
    }
    
    // Create enrollment
    const enrollment = new Enrollment({
      student: req.user.id,
      course: courseId
    });
    
    await enrollment.save();
    
    // Add course to user's enrolled courses
    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { enrolledCourses: courseId }
    });
    
    // Add student to course's enrolled students
    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { enrolledStudents: req.user.id }
    });
    
    res.json({ message: "Successfully enrolled in course" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Unenroll student from course
export const unenrollFromCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    // Remove enrollment
    const enrollment = await Enrollment.findOneAndDelete({
      student: req.user.id,
      course: courseId
    });
    
    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found" });
    }
    
    // Remove course from user's enrolled courses
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { enrolledCourses: courseId }
    });
    
    // Remove student from course's enrolled students
    await Course.findByIdAndUpdate(courseId, {
      $pull: { enrolledStudents: req.user.id }
    });
    
    res.json({ message: "Successfully unenrolled from course" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get student's enrolled courses
export const getStudentCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user.id })
      .populate('course')
      .populate('course.instructor', 'name');
    
    const courses = enrollments
      .filter(enrollment => enrollment.course) // Filter out enrollments with deleted courses
      .map(enrollment => {
        const course = enrollment.course.toObject();
        
        // Handle courses with null instructor (admin courses)
        if (!course.instructor) {
          course.instructor = { name: "Admin" };
        }
        
        return {
          ...course,
          enrollmentDate: enrollment.enrolledAt,
          progress: enrollment.progress
        };
      });
    
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
