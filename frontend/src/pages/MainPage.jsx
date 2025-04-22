import { useNavigate } from "react-router-dom";
import BookList from "../components/BookList";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <main>
      <h1 className="my-10 text-center text-4xl font-bold">📚 List of books</h1>

      {/* Кнопки перехода */}
      <div className="mb-6 flex justify-center gap-4">
        <button
          onClick={() => navigate("/bestBooks")}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600"
        >
          🔥 The best books
        </button>

        <button
          onClick={() => navigate("/bestDeal")}
          className="rounded-lg bg-green-500 px-4 py-2 text-white shadow-md hover:bg-green-600"
        >
          💰 Best Deal
        </button>
      </div>

      <BookList />
    </main>
  );
}
