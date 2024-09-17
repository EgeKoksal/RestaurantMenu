import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Menu from "./Menu";
import Categories from "./Categories";
import items from "./data";
import Cart from "./Cart";

const allCategories = ["all", ...new Set(items.map((item) => item.category))];

function App() {
  const [menuItems, setMenuItems] = useState(items);
  const [cartItems, setCartItems] = useState(() => {
    // localStorage'dan cartItems'ı başlat
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // cartItems değiştiğinde LocalStorage'a yaz
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const filterItems = (category) => {
    if (category === "all") {
      setMenuItems(items);
    } else {
      const newItems = items.filter((item) => item.category === category);
      setMenuItems(newItems);
    }
  };

    //öğeyi sepetten çıkarma
    const removeFromCart = (itemId) => {
      setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== itemId)
    )}

  const addToCart = (item) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = [...prevCartItems, item];
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setShowModal(false); // Sepeti temizle
  };

  const sales = () => {
    setShowModal(true); 
  };

  const cartItemCount = cartItems.length;

  return (
    <Router>
      <main>
        <section className="menu section">
          <div className="title">
            <h2>our menu</h2>
            <div className="underline"></div>
          </div>
          <Link to="/cart" className="cart">
          <i className="fa-solid fa-cart-shopping"></i> {cartItemCount}
          </Link>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Categories
                    categories={allCategories}
                    filterItems={filterItems}
                  />
                  <Menu items={menuItems} addToCart={addToCart} />
                </>
              }
            />
            <Route
              path="/cart"
              element={
                <Cart items={cartItems} clearCart={clearCart} sales={sales} showModal={showModal} removeFromCart={removeFromCart}/>
              }
            />
          </Routes>
        </section>
      </main>
    </Router>
  );
}

export default App;
