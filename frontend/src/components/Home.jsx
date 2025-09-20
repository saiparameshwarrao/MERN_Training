import { Link } from "react-router-dom";
import "./Home.css";



function Home() {
  return (
    <div className="home">
      <h1>Welcome to EduHub</h1>
      <div className="home-content">
        <p>Discover amazing courses and enhance your skills with our comprehensive learning platform.</p>
        
        <div className="features">
          <h2>Features</h2>
          <ul>
            <li>Browse and enroll in courses</li>
            <li>Learn from expert instructors</li>
            <li>Track your learning progress</li>
            <li>Interactive lessons and content</li>
          </ul>
        </div>

        <div className="cta-buttons">
          <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
          <Link to="/register" className="btn btn-secondary">Get Started</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
  