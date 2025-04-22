import { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "./BookCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BookList = () => {
  const booksPerPage = 20;
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:8000/books");
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Некорректный формат ответа сервера");
        }
        setBooks(response.data);
      } catch (error) {
        console.error("Ошибка загрузки книг:", error);
        setError("Ошибка загрузки данных. Попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const addToCart = async (bookId) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("Token is missing!");
      return;
    }

    try {
      const res = await fetch(`http://127.0.0.1:8000/cart/${bookId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("Item added to cart:", data);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const totalPages = Math.ceil(books.length / booksPerPage);
  const paginatedBooks = books.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage,
  );

  return (
    <div className="flex flex-col items-center">
      {loading && <p>Загрузка...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && paginatedBooks.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {paginatedBooks.map((book) => (
            <BookCard key={book.id} book={book} onAddToCart={addToCart} />
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-2 rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
        >
          <ChevronLeft size={20} /> Назад
        </button>
        <span className="text-lg font-semibold">
          Страница {currentPage} из {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
        >
          Вперед <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default BookList;
