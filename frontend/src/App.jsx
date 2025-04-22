import { Routes, Route } from "react-router-dom";
import {
  MainPage,
  NotFound,
  Favorites,
  Cart,
  Login,
  BestBooks,
  BestDeal,
  SignUp,
} from "./pages";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b-4 border-gray-900">
        <Navbar />
      </header>
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/bestBooks" element={<BestBooks />} />
          <Route path="/bestDeal" element={<BestDeal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
