import { useState, useEffect } from "react";

function StudentDashboard() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:3001/api/courses/student/enrolled", {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        credentials: "include"
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        console.error("API Error:", errorData);
        alert(`Error: ${errorData.error || 'Failed to fetch courses'}`);
        setLoading(false);
        return;
      }
      
      const data = await res.json();
      console.log("Enrolled courses data:", data); // Debug log
      setEnrolledCourses(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      alert("Error fetching enrolled courses. Please try again.");
      setLoading(false);
    }
  };

  const unenrollFromCourse = async (courseId) => {
    if (!confirm("Are you sure you want to unenroll from this course?")) return;
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("Please login to unenroll from courses");
        return;
      }

      const res = await fetch(`http://localhost:3001/api/courses/${courseId}/unenroll`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        credentials: "include"
      });

      const data = await res.json();
      if (res.ok) {
        alert("Successfully unenrolled from course!");
        fetchEnrolledCourses();
      } else {
        alert(`Error: ${data.error || 'Failed to unenroll from course'}`);
      }
    } catch (error) {
      console.error("Error unenrolling from course:", error);
      alert("Error unenrolling from course. Please try again.");
    }
  };

  if (loading) return <div>Loading your courses...</div>;

  return (
    <div className="student-dashboard">
      <h2>My Courses</h2>
      
      {enrolledCourses.length === 0 ? (
        <div className="no-courses">
          <p>You haven't enrolled in any courses yet.</p>
          <p>Browse available courses to get started!</p>
        </div>
      ) : (
        <div className="enrolled-courses">
          {enrolledCourses.map(course => (
            <div key={course._id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p><strong>Instructor:</strong> {course.instructor?.name}</p>
              <p><strong>Category:</strong> {course.category}</p>
              <p><strong>Enrolled:</strong> {new Date(course.enrollmentDate).toLocaleDateString()}</p>
              <div className="course-actions">
                <button className="view-course">View Course</button>
                <button 
                  onClick={() => unenrollFromCourse(course._id)}
                  className="unenroll-btn"
                >
                  Unenroll
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
