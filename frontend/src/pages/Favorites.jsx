import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (bookId) => {
    const updatedFavorites = favorites.filter((book) => book.id !== bookId);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <div className="my-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {favorites.length > 0 ? (
        favorites.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onRemove={removeFromFavorites}
            isFavoritePage={true} // <== добавим флаг
          />
        ))
      ) : (
        <h2 className="col-span-4 my-10 text-center text-4xl font-bold text-gray-500">
          No favorites yet.
        </h2>
      )}
    </div>
  );
};

export default FavoritePage;
