import { useState, useEffect } from "react";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/courses");
      const data = await res.json();
      setCourses(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setLoading(false);
    }
  };

  const enrollInCourse = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Please login to enroll in courses");
        return;
      }

      const res = await fetch(`http://localhost:3001/api/courses/${courseId}/enroll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: "include"
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        fetchCourses(); // Refresh the list
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Error enrolling in course");
    }
  };

  if (loading) return <div>Loading courses...</div>;

  return (
    <div className="course-list">
      <h2>Available Courses</h2>
      <div className="courses-grid">
        {courses.map(course => (
          <div key={course._id} className="course-card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p><strong>Instructor:</strong> {course.instructor?.name}</p>
            <p><strong>Category:</strong> {course.category}</p>
            <p><strong>Price:</strong> ${course.price}</p>
            <p><strong>Students Enrolled:</strong> {course.enrolledStudents?.length || 0}</p>
            <button onClick={() => enrollInCourse(course._id)}>
              Enroll Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;
