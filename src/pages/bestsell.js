import React from 'react'
import Navbar from '../components/navbar'
import BestSellProducts from '../components/home/bestSell'
import Banner from '../components/banner'
const BestSell = () => {
  return (
    <div>
        <Navbar />
        <Banner />
        <BestSellProducts />
    </div>
  )
}

export default BestSell