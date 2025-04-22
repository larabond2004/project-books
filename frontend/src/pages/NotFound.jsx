import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 text-gray-800">
      <motion.h1
        className="mb-4 text-6xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        404
      </motion.h1>
      <motion.p
        className="mb-6 text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Упс! Страница не найдена.
      </motion.p>
      <Link
        to="/"
        className="rounded-lg bg-blue-600 px-6 py-3 text-lg text-white shadow-md transition hover:bg-blue-700"
      >
        На главную
      </Link>
    </div>
  );
}
