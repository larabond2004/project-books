import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

export default function BestBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/books/top") // Запрос к FastAPI
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка загрузки:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="mb-6 text-center text-3xl font-bold">🔥 Top 5 books</h2>

      {loading ? (
        <p className="text-center text-gray-600">Загрузка...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {books.length > 0 ? (
            books.map((book) => <BookCard key={book.id} book={book} />)
          ) : (
            <p className="text-center text-gray-600">Нет данных</p>
          )}
        </div>
      )}
    </div>
  );
}
