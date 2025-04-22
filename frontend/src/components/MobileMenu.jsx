import { links } from "../constants";
import { Link } from "react-router-dom";
import { LogIn, LogOut, UserPlus } from "lucide-react";

export default function MobileMenu({
  isAuthenticated,
  handleLogout,
  closeMenu,
}) {
  return (
    <div className="absolute left-0 top-0 z-50 w-full bg-gray-700 shadow-lg shadow-amber-600/50 md:hidden">
      <ul className="flex flex-col gap-4 border-2 border-amber-600 px-4 py-8">
        <div className="flex justify-between px-4">
          <Link className="textGradient text-xl" to="/" onClick={closeMenu}>
            <img src="/images/logo.png" alt="Logo" className="h-16 w-16" />
          </Link>
          <button onClick={closeMenu} className="text-2xl text-white">
            ✕
          </button>
        </div>

        {links.map((link) => (
          <li key={link.name} className="pl-5">
            <div className="flex items-center gap-2">
              <span>{link.icon}</span>
              <Link
                className="navLinkUnderline"
                to={link.link}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            </div>
          </li>
        ))}

        {/* Блок кнопок авторизации */}
        <div className="mt-4 flex flex-col items-center gap-3">
          {isAuthenticated ? (
            <button
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
              className="flex w-full items-center justify-center gap-2 rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="flex w-full items-center justify-center gap-2 rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
                onClick={closeMenu}
              >
                <LogIn size={20} />
                <span>Login</span>
              </Link>
              <Link
                to="/signup"
                className="flex w-full items-center justify-center gap-2 rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
                onClick={closeMenu}
              >
                <UserPlus size={20} />
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </div>
      </ul>
    </div>
  );
}
