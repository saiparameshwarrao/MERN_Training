import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

function Login() {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        setUser(data);
        localStorage.setItem('token', data.token);
        alert(data.message); // Login successful
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Server error. Try again.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Student Login</h2>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
