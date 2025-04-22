import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { links } from "../constants";
export default function Footer() {
  return (
    <footer className="my-10 bg-gray-900 py-6 text-gray-300">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        <nav className="flex space-x-6">
          <ul className="mb-6 flex flex-col gap-4 sm:flex-row sm:gap-10">
            {links.map((link) => {
              return (
                <li key={link.name}>
                  <div className="flex items-center gap-2">
                    <span> {link.icon}</span>
                    <Link className="navLinkUnderline" to={link.link}>
                      {link.name}
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex space-x-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="h-6 w-6 hover:text-white" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="h-6 w-6 hover:text-white" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="h-6 w-6 hover:text-white" />
          </a>
        </div>

        <p className="text-sm">
          &copy; {new Date().getFullYear()} Все права защищены.
        </p>
      </div>
    </footer>
  );
}
