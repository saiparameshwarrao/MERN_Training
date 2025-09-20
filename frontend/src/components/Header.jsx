import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";


function Header() {
  const { user } = useContext(UserContext);

  return (
    <nav>
      <div>
        <Link to="/">Home</Link> | 
        <Link to="/courses">Browse Courses</Link>
      </div>
      
      <div>
        {user ? (
          <>
            <span> Hello, {user.name}</span> | 
            {user.role === 'admin' ? (
              <Link to="/admin/dashboard">Admin Dashboard</Link>
            ) : (
              <Link to="/student/dashboard">My Courses</Link>
            )}
          </>
        ) : (
          <>
            <Link to="/login"> Student Login</Link> | 
            <Link to="/register"> Register</Link> | 
            <Link to="/admin"> Admin Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Header;
