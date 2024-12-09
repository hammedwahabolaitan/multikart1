import React from 'react';
import { useNavigate } from 'react-router-dom';

// ProductCard Component
const ProductCard = ({ imageUrl, title, price, originalPrice, colors, rating }) => {
  return (
    <div className="w-80 border rounded-md shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-[65vh] object-cover rounded-t-md" />
        <div className="absolute bottom-2 left-2 flex space-x-1">
          {/* Image Thumbnails */}
          {Array(3)
            .fill(imageUrl)
            .map((url, index) => (
              <img
                key={index}
                src={url}
                className="w-8 h-12 object-cover rounded-sm border border-gray-300 opacity-75"
                alt={`Thumbnail ${index + 1}`}
              />
            ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="text-center mt-4 px-4">
        <div className="flex items-center justify-center space-x-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927C9.198 2.392 9.802 2.392 9.951 2.927l1.234 4.045a1 1 0 00.95.676h4.243c.56 0 .79.716.34 1.065l-3.33 2.42a1 1 0 00-.363 1.118l1.234 4.045c.15.535-.404.974-.816.707l-3.33-2.42a1 1 0 00-1.176 0l-3.33 2.42c-.412.267-.966-.172-.816-.707l1.234-4.045a1 1 0 00-.363-1.118L2.775 8.713c-.45-.349-.22-1.065.34-1.065h4.243a1 1 0 00.95-.676L9.049 2.927z" />
            </svg>
          ))}
        </div>
        <h2 className="text-lg font-semibold mt-2">{title}</h2>
        <div className="text-xl font-bold text-orange-600">${price.toFixed(2)}</div>
        <div className="text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</div>

        {/* Color Options */}
        <div className="flex justify-center mt-2 space-x-2">
          {colors.map((color, index) => (
            <span
              key={index}
              className="w-5 h-5 rounded-full border border-gray-300"
              style={{ backgroundColor: color }}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ProductList Component
const ProductList = () => {
  const navigate = useNavigate();
  
  const goto = (page) => {
    navigate(page);
  };
  const handleNavigate = (id) => {
    navigate(`/singleproduct?id=${id}`); // Redirect to BlogPage with ID
};
  const products = [
    {
      id: 1,
      imageUrl: 'src/assets/img/8.jpg',
      title: 'Waist Dress',
      price: 184,
      originalPrice: 230,
      rating: 4,
      colors: ['#4CAF50', '#2C3E50', '#DCDCDC']
    },
    {
      id: 2,
      imageUrl: 'src/assets/img/7.jpg',
      title: 'Crop Top',
      price: 72.6,
      originalPrice: 121,
      rating: 4,
      colors: ['#B0A78B', '#D3B5A5', '#DCDCDC']
    },
    {
      id: 3,
      imageUrl: 'src/assets/img/13(1).jpg',
      title: 'Jacket',
      price: 95.5,
      originalPrice: 140,
      rating: 5,
      colors: ['#2E2E2E', '#4CAF50', '#FF5733']
    },
    {
      id: 4,
      imageUrl: 'src/assets/img/13.jpg',
      title: 'Jacket',
      price: 95.5,
      originalPrice: 140,
      rating: 5,
      colors: ['#2E2E2E', '#FF5733', '#DCDCDC']
    },
    {
      id: 5,
      imageUrl: 'src/assets/img/3.jpg',
      title: 'Jacket',
      price: 95.5,
      originalPrice: 140,
      rating: 5,
      colors: ['#2E2E2E', '#DCDCDC', '#FF5733']
    },
    {
      id: 6,
      imageUrl: 'src/assets/img/10.jpg',
      title: 'Jacket',
      price: 95.5,
      originalPrice: 140,
      rating: 5,
      colors: ['#2E2E2E', '#DCDCDC', '#FF5733']
    }
  ];

  return (
    <div id="product" className="container mx-auto p-4">
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
          <div key={product.id} onClick={() => goto(`/singleproduct/${product.id}`)}>
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
