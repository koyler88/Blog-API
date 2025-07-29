import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json(); // Only call once!
      console.log(data)
      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }
      setToken(data.token);
      navigate("/"); // Redirect to dashboard after login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 380, margin: "80px auto" }}>
      <form style={{ maxWidth: 340, margin: "0 auto" }} onSubmit={handleSubmit}>
        <h2>Author Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" style={{ width: "100%" }}>Login</button>
        {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      </form>
    </div>
  );
}
