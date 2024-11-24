import React from 'react';
import Navbar from '../components/navbar';
import Banner from '../components/banner';
import { products } from '../product';
import ProductCart from '../components/productcart';
function Home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <h1 className="text-xl my-5 text-center font-monospace">SẢN PHẨM BÁN CHẠY</h1>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 m-10'>
        {products.map((product, key) => (
          <ProductCart key={key} data={product} />
        ))}
      </div>
      <h1 className="text-xl my-5 text-center font-monospace">GIÁ ƯU ĐÃI</h1>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 m-10'>
        {products.map((product, key) => (
          <ProductCart key={key} data={product} />
        ))}
      </div>
      <h1 className="text-xl my-5 text-center font-monospace">GỢI Ý HÔM NAY</h1>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 m-10'>
        {products.map((product, key) => (
          <ProductCart key={key} data={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
