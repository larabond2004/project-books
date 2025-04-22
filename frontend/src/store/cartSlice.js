import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://127.0.0.1:8000";

const token = () => localStorage.getItem("access_token");

export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const res = await fetch(`${BASE_URL}/cart`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  return res.json();
});

export const fetchTotalPrice = createAsyncThunk("cart/total", async () => {
  const res = await fetch(`${BASE_URL}/cart/total_price`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  return res.json();
});

export const updateQuantity = createAsyncThunk(
  "cart/update",
  async ({ bookId, quantity }) => {
    await fetch(`${BASE_URL}/cart/${bookId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    });
    return { bookId, quantity };
  },
);

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (bookId) => {
    await fetch(`${BASE_URL}/cart/${bookId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token()}` },
    });
    return bookId;
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchTotalPrice.fulfilled, (state, action) => {
        state.totalPrice = action.payload.total_price;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const item = state.items.find(
          (i) => i.book.id === action.payload.bookId,
        );
        if (item) item.quantity = action.payload.quantity;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.book.id !== action.payload,
        );
      });
  },
});

export default cartSlice.reducer;
