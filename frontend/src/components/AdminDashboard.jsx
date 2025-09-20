import { useState, useEffect } from "react";

function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    category: "",
    price: 0,
    lessons: []
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch("http://localhost:3001/api/courses/admin/all", {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        credentials: "include"
      });
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const createCourse = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch("http://localhost:3001/api/courses/admin/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: "include",
        body: JSON.stringify(newCourse)
      });

      const data = await res.json();
      if (res.ok) {
        alert("Course created successfully!");
        setNewCourse({ title: "", description: "", category: "", price: 0, lessons: [] });
        setShowCreateForm(false);
        fetchCourses();
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Error creating course");
    }
  };

  const deleteCourse = async (courseId) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/api/courses/admin/${courseId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        credentials: "include"
      });

      const data = await res.json();
      if (res.ok) {
        alert("Course deleted successfully!");
        fetchCourses();
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Error deleting course");
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      
      <button onClick={() => setShowCreateForm(!showCreateForm)}>
        {showCreateForm ? "Cancel" : "Create New Course"}
      </button>

      {showCreateForm && (
        <form onSubmit={createCourse} className="create-course-form">
          <h3>Create New Course</h3>
          <input
            type="text"
            placeholder="Course Title"
            value={newCourse.title}
            onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
            required
          />
          <textarea
            placeholder="Course Description"
            value={newCourse.description}
            onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={newCourse.category}
            onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newCourse.price}
            onChange={(e) => setNewCourse({...newCourse, price: e.target.value})}
            required
          />
          <button type="submit">Create Course</button>
        </form>
      )}

      <div className="courses-list">
        <h3>All Courses</h3>
        {courses.map(course => (
          <div key={course._id} className="course-item">
            <h4>{course.title}</h4>
            <p>{course.description}</p>
            <p><strong>Category:</strong> {course.category}</p>
            <p><strong>Price:</strong> ${course.price}</p>
            <p><strong>Students Enrolled:</strong> {course.enrolledStudents?.length || 0}</p>
            <p><strong>Status:</strong> {course.isPublished ? "Published" : "Draft"}</p>
            <button onClick={() => deleteCourse(course._id)} className="delete-btn">
              Delete Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
