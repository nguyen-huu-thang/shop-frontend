import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../product';

const Details = () => {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return <div className="text-center">Sản phẩm không tồn tại!</div>;
  }

  return (
    <div className="container mx-auto p-5">
      <div className="grid md:grid-cols-2 gap-4">
        <img src={product.image} alt={product.name} className="w-full h-auto" />
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-gray-500 my-3">Giá: đ{product.price}</p>
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
