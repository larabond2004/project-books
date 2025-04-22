import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Введите логин и пароль!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/auth/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Ошибка входа");

      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="mt-10 flex min-h-screen items-start justify-center bg-gray-100">
      <div className="mt-20 w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
        <h2 className="mb-4 text-center text-2xl font-semibold text-gray-800">
          Login
        </h2>
        {error && (
          <div className="mb-4 rounded bg-red-100 p-2 text-center text-red-700">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              autoFocus
              className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-blue-500 py-2 text-white transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
