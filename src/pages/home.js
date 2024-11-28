import React from 'react';
import Navbar from '../components/navbar';
import Banner from '../components/banner';
import { products } from '../product';
import ProductCart from '../components/productcart';
import ConnectWidget from '../components/connectwidget';
function Home() {
  // const categories = [
  //   { title: 'SẢN PHẨM BÁN CHẠY', filter: 'SẢN PHẨM BÁN CHẠY' },
  //   { title: 'GIÁ ƯU ĐÃI', filter: 'GIÁ ƯU ĐÃI' },
  //   { title: 'GỢI Ý HÔM NAY', filter: 'GỢI Ý HÔM NAY' },
  // ];
  return (
    <div>
      <Navbar />
      <Banner />
      <ConnectWidget />
      <h1 className="text-2xl my-5 text-center font-bold relative before:content-['']
      before:absolute before:top-1/2 before:left-0 before:w-1/4 before:h-0.5 before:bg-gray-300 
      before:translate-y-[-50%] after:content-[''] after:absolute after:top-1/2 
      after:right-0 after:w-1/4 after:h-0.5 after:bg-gray-300 after:translate-y-[-50%]">SẢN PHẨM BÁN CHẠY</h1>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 m-20'>
        {products.map((product, key) => (
          <ProductCart key={key} data={product} />
        ))}
      </div>
      <h1 className="text-2xl my-5 text-center font-bold relative before:content-['']
      before:absolute before:top-1/2 before:left-0 before:w-1/4 before:h-0.5 before:bg-gray-300 
      before:translate-y-[-50%] after:content-[''] after:absolute after:top-1/2 
      after:right-0 after:w-1/4 after:h-0.5 after:bg-gray-300 after:translate-y-[-50%]">Giá ƯU ĐÃI</h1>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 m-20'>
        {products.map((product, key) => (
          <ProductCart key={key} data={product} />
        ))}
      </div>
      <h1 className="text-2xl my-5 text-center font-bold relative before:content-['']
      before:absolute before:top-1/2 before:left-0 before:w-1/4 before:h-0.5 before:bg-gray-300 
      before:translate-y-[-50%] after:content-[''] after:absolute after:top-1/2 
      after:right-0 after:w-1/4 after:h-0.5 after:bg-gray-300 after:translate-y-[-50%]">GỢI Ý HÔM NAY</h1>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 m-20'>
        {products.map((product, key) => (
          <ProductCart key={key} data={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
