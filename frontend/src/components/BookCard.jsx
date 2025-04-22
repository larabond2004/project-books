import { useState, useEffect } from "react";
import { Star, Heart, Trash } from "lucide-react";

const BookCard = ({ book, onAddToCart, onRemove, isFavoritePage = false }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.id === book.id));
  }, [book.id]);

  const toggleFavorite = () => {
    if (isFavorite) {
      // если страница избранного — просим родителя удалить
      if (isFavoritePage && onRemove) {
        onRemove(book.id);
      } else {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const updatedFavorites = favorites.filter((fav) => fav.id !== book.id);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setIsFavorite(false);
      }
    } else {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const updatedFavorites = [...favorites, book];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setIsFavorite(true);
    }
  };

  return (
    <div className="flex h-full flex-col justify-between rounded-lg bg-slate-300 p-4 shadow-md">
      <a
        href={book.book_url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center"
      >
        <img
          src={book.image_url}
          alt={book.title}
          className="sm:object-fit h-40 w-full rounded-md object-cover object-center"
        />
        <h2 className="my-4 min-h-[60px] text-center text-lg font-semibold">
          {book.title}
        </h2>
        <p className="text-gray-600">Price: &pound;{book.price}</p>
        <div className="mt-1 flex justify-center">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              size={16}
              className={i < book.rating ? "text-yellow-500" : "text-gray-300"}
              fill={i < book.rating ? "currentColor" : "none"}
            />
          ))}
        </div>
      </a>
      <div className="my-4 flex flex-col gap-2">
        <button
          onClick={toggleFavorite}
          className={`flex w-full items-center justify-center gap-2 rounded-md border-2 border-gray-400 py-2 font-semibold transition hover:scale-105 ${isFavorite ? "bg-red-500 text-white" : "bg-gray-300 text-black"}`}
        >
          <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
          {isFavorite ? "Remove from Favorite" : "Add to Favorite"}
        </button>

        {onAddToCart && (
          <button
            onClick={() => onAddToCart(book.id)}
            className="w-full rounded-md bg-blue-500 py-2 font-semibold text-white transition hover:scale-105 hover:bg-blue-600 active:scale-100"
          >
            Add to cart
          </button>
        )}

        {onRemove && onAddToCart && (
          <button
            onClick={() => onRemove(book.id)}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-red-500 py-2 font-semibold text-white transition hover:scale-105 hover:bg-red-600 active:scale-100"
          >
            <Trash size={16} />
            Remove from cart
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
