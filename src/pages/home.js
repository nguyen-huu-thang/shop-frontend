import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Banner1 from '../assets/banner1.jpg';
import Banner2 from '../assets/banner2.jpg';
import Banner3 from '../assets/banner3.jpg';

function Home() {
  const bannerAds = [Banner1, Banner2, Banner3];
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const nextAd = () => {
    if (transitioning) return; // Prevent spamming during transition
    setTransitioning(true);
    setTimeout(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % bannerAds.length);
      setTransitioning(false);
    }, 500); // Transition duration
  };

  const prevAd = () => {
    if (transitioning) return; // Prevent spamming during transition
    setTransitioning(true);
    setTimeout(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex - 1 + bannerAds.length) % bannerAds.length);
      setTransitioning(false);
    }, 500); // Transition duration
  };

  return (
    <div>
      <Navbar />
      <div className="relative w-full h-128 overflow-hidden group">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentAdIndex * 100}%)`,
          }}
        >
          {bannerAds.map((banner, index) => (
            <img
              key={index}
              src={banner}
              alt={`Banner ${index + 1}`}
              className="w-full h-96 object-cover flex-shrink-0"
            />
          ))}
        </div>
        {/* Buttons */}
        <button
          onClick={prevAd}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white px-4 py-2 bg-black bg-opacity-50 rounded-full focus:outline-none hover:bg-opacity-70"
        >
          &lt;
        </button>
        <button
          onClick={nextAd}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white px-4 py-2 bg-black bg-opacity-50 rounded-full focus:outline-none hover:bg-opacity-70"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Home;
