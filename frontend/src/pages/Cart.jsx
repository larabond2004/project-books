import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookCard from "../components/BookCard";
import {
  fetchCart,
  updateQuantity,
  removeFromCart,
  fetchTotalPrice,
} from "../store/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  useEffect(() => {
    dispatch(fetchCart()).then(() => dispatch(fetchTotalPrice()));
  }, [dispatch]);

  const handleDecrease = (bookId, currentQuantity) => {
    const newQuantity = currentQuantity - 1;
    if (newQuantity < 1) {
      dispatch(removeFromCart(bookId)).then(() => dispatch(fetchTotalPrice()));
    } else {
      dispatch(updateQuantity({ bookId, quantity: newQuantity })).then(() =>
        dispatch(fetchTotalPrice()),
      );
    }
  };

  const handleIncrease = (bookId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    dispatch(updateQuantity({ bookId, quantity: newQuantity })).then(() =>
      dispatch(fetchTotalPrice()),
    );
  };

  return (
    <section className="my-10">
      <h1 className="mb-10 text-center text-4xl font-bold text-gray-500">
        Cart
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex h-full flex-col justify-between rounded border p-4 shadow-lg"
            >
              <BookCard book={item.book} />

              <div className="mt-4 flex flex-col items-center">
                <div className="flex items-center space-x-2">
                  <button
                    className="rounded bg-gray-300 px-3 py-1"
                    onClick={() => handleDecrease(item.book.id, item.quantity)}
                  >
                    −
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    className="rounded bg-gray-300 px-3 py-1"
                    onClick={() => handleIncrease(item.book.id, item.quantity)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="mt-3 w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  onClick={() =>
                    dispatch(removeFromCart(item.book.id)).then(() =>
                      dispatch(fetchTotalPrice()),
                    )
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Your cart is empty</p>
        )}
      </div>

      <h2 className="mt-8 rounded-lg bg-gray-100 p-4 text-center text-xl font-bold shadow-md">
        Total Price: ${totalPrice.toFixed(2)}
      </h2>
    </section>
  );
}
