import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Special from '../component/Special';
import Feature from '../component/Feature';
// import ProductList from '../pages/ProductList';
import SingleProduct from '../component/SingleProduct';
import Header from '../component/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Router = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <BrowserRouter>
      <Header cartCount={cart.length}  />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feature" element={<Feature />} />
        <Route path="/special" element={<Special />} />
        {/* <Route path="/product" element={<ProductList />} /> */}
        <Route
          path="/singleproduct/:productId"
          element={<SingleProduct addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <div className="p-4">
              <h2 className="text-2xl font-bold">Cart</h2>
              <ul>
                {cart.map((item, index) => (
                  <li key={index} className="p-2 border-b">
                    {item.title} - ${item.price} -${item.Image}
                  </li>
                ))}
              </ul>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
