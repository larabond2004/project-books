import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import Hamburger from "hamburger-react";
import { links } from "../constants";
import { LogIn, LogOut, UserPlus } from "lucide-react";

function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("access_token"),
  );

  useEffect(() => {
    const checkAuth = () =>
      setIsAuthenticated(!!localStorage.getItem("access_token"));
    const interval = setInterval(checkAuth, 500);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    navigate("/");
  };

  const closeMenu = () => setOpen(false); // Функция для закрытия меню

  return (
    <nav className="container relative flex h-20 items-center justify-between">
      <div>
        <Link to="/" className="textGradient">
          <img src="/images/logo.png" alt="Logo" className="h-14 w-14" />
        </Link>
      </div>

      <div className="flex items-center gap-2 md:hidden">
        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          size={25}
          color="#d97706"
        />
      </div>

      {isOpen && (
        <MobileMenu
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
          closeMenu={closeMenu}
        />
      )}

      <ul className="hidden items-center gap-6 md:flex">
        {links.map((link) => (
          <li key={link.name}>
            <div className="flex items-center gap-2">
              <span>{link.icon}</span>
              <Link className="navLinkUnderline" to={link.link}>
                {link.name}
              </Link>
            </div>
          </li>
        ))}

        {isAuthenticated ? (
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link
                to="/login"
                className="flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
              >
                <LogIn size={20} />
                <span>Login</span>
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="flex items-center gap-2 rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
              >
                <UserPlus size={20} />
                <span>Sign Up</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
