import React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductList from '../pages/ProductCard';
const SingleProduct = ({ addToCart }) => {
  const { productId } = useParams();
// const prodct 

  // Example product details (should ideally come from an API or state management)
  const product = {
    
    id: productId,
    title: 'Belted Dress',
    Image: "src/assets/img/2(2).jpg",
    price: 111,
    originalPrice: 185,
    colors: ['#4CAF50', '#FF5733', '#DCDCDC'],
    description: 'This is a long established fact that a reader will be distracted...',
  };

  

  return (
    <div className="container mx-auto p-4">
      <img src={product.Image} alt="" />
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <p className="line-through text-gray-500">${product.originalPrice}</p>
      <p className="text-xl text-green-500">${product.price}</p>
      <div className="flex space-x-2 mt-4">
        {product.colors.map((color, index) => (
          <span
            key={index}
            className="w-8 h-8 rounded-full"
            style={{ backgroundColor: color }}
          ></span>
        ))}
      </div>
      <button
        onClick={() => {
          addToCart(product);
          toast.success(`${product.title} added to cart!`);
        }}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add to Cart
      </button>
      <p className="mt-4">{product.description}</p>
    </div>
  );
};

export default SingleProduct;
