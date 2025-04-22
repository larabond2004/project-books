import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Ошибка регистрации");
      }

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mt-10 flex min-h-screen items-start justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="mt-20 max-w-md rounded-md bg-white p-6 shadow-xl"
      >
        <h2 className="mb-4 text-2xl">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="mb-2 w-full border p-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="mb-2 w-full border p-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="mb-2 w-full border p-2"
          required
        />
        <button
          type="submit"
          className="w-full rounded bg-green-500 p-2 text-white"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default SignUp;
