// ProductList.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';


const ProductList = () => {
  const navigate = useNavigate();

  const goto = (page) => {
    navigate(page);
  };

  const products = [
    {
      id: 1,
      imageUrl: '/src/assets/img/8.jpg',
      title: 'Waist Dress',
      price: 184,
      originalPrice: 230,
      rating: 4,
      colors: ['#4CAF50', '#2C3E50', '#DCDCDC'],
    },
    {
      id: 2,
      imageUrl: '/src/assets/img/7.jpg',
      title: 'Crop Top',
      price: 72.6,
      originalPrice: 121,
      rating: 4,
      colors: ['#B0A78B', '#D3B5A5', '#DCDCDC'],
    },
    // Other products...
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="my-5 text-center">
        <h4 className="text-lg font-semibold">Exclusive Products</h4>
        <h2 className="text-2xl font-bold uppercase">Special Products</h2>
        <div className="my-2 h-[2px] bg-gray-300 w-24 mx-auto"></div>
      </div>

      <ul className="flex gap-4 mb-4 border-b-2 border-gray-300 justify-center">
        <li className="cursor-pointer px-4 py-2 text-blue-500 border-b-2 border-blue-500">NEW ARRIVAL</li>
        <li className="cursor-pointer px-4 py-2 hover:text-blue-500" onClick={() => goto('/feature')}>
          FEATURED
        </li>
        <li className="cursor-pointer px-4 py-2 hover:text-blue-500" onClick={() => goto('/special')}>
          SPECIAL
        </li>
      </ul>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="cursor-pointer"
            onClick={() => goto(`/singleproduct/${product.id}`)}
          >
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
