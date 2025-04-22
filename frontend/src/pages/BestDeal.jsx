import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";

export default function BestDeal() {
  const [bestBook, setBestBook] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/books/best-deal")
      .then((res) => res.json())
      .then((data) => setBestBook(data))
      .catch((err) => console.error("Error fetching best deal:", err));
  }, []);

  return (
    <main className="flex flex-col items-center">
      <h1 className="my-10 text-center text-4xl font-bold">💰 Best Deal</h1>
      {bestBook ? (
        <div className="w-full max-w-md">
          <BookCard book={bestBook} />
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading...</p>
      )}
    </main>
  );
}
