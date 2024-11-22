import React, { useState } from "react";

const Content = () => {
  const [openFilters, setOpenFilters] = useState(false);

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-blue-600 text-2xl font-bold">Catalog Page</h2>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quam urna, dignissim nec auctor in, mattis vitae leo.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters Section */}
        <div>
          {/* Desktop Filters */}
          <div className="hidden md:block space-y-4">
            <div className="border p-4">
              <h3 className="text-lg font-semibold">Categories</h3>
              <div className="space-y-2">
                {["Phones", "Laptops", "PC", "Tablets"].map((category) => (
                  <label key={category} className="flex items-center">
                    <input type="checkbox" className="form-checkbox text-blue-600" />
                    <span className="ml-2">{category}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="border p-4">
              <h3 className="text-lg font-semibold">Brands</h3>
              <div className="space-y-2">
                {["Samsung", "Apple", "HTC"].map((brand) => (
                  <label key={brand} className="flex items-center">
                    <input type="checkbox" className="form-checkbox text-blue-600" />
                    <span className="ml-2">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="border p-4">
              <h3 className="text-lg font-semibold">OS</h3>
              <div className="space-y-2">
                {["Android", "iOS"].map((os) => (
                  <label key={os} className="flex items-center">
                    <input type="checkbox" className="form-checkbox text-blue-600" />
                    <span className="ml-2">{os}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          <div className="md:hidden">
            <button
              className="text-blue-600 underline"
              onClick={() => setOpenFilters(!openFilters)}
            >
              Filters
            </button>
            {openFilters && (
              <div className="space-y-4 mt-4">
                {/* Repeat filter sections */}
                <div className="border p-4">
                  <h3 className="text-lg font-semibold">Categories</h3>
                  <div className="space-y-2">
                    {["Phones", "Laptops", "PC", "Tablets"].map((category) => (
                      <label key={category} className="flex items-center">
                        <input type="checkbox" className="form-checkbox text-blue-600" />
                        <span className="ml-2">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product Item */}
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="bg-white border p-4">
                <div className="mb-4">
                  <img
                    src={`tech/image${index + 1}.jpg`}
                    alt="Product"
                    className="w-full h-auto"
                  />
                </div>
                <h3 className="text-lg font-semibold">
                  Lorem ipsum dolor sit amet
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center space-x-1">
                    <img src="star.svg" alt="Star" className="w-4 h-4" />
                    <img src="star.svg" alt="Star" className="w-4 h-4" />
                    <img src="star.svg" alt="Star" className="w-4 h-4" />
                    <img
                      src="star-half-empty.svg"
                      alt="Half Star"
                      className="w-4 h-4"
                    />
                    <img
                      src="star-empty.svg"
                      alt="Empty Star"
                      className="w-4 h-4"
                    />
                  </div>
                  <div className="text-lg font-bold">$100</div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-8">
        <nav className="flex justify-center">
          <ul className="flex space-x-2">
            <li>
              <a
                className="px-3 py-2 bg-gray-200 text-gray-500 cursor-not-allowed"
                href="#"
              >
                «
              </a>
            </li>
            <li>
              <a className="px-3 py-2 bg-blue-600 text-white" href="#">
                1
              </a>
            </li>
            <li>
              <a className="px-3 py-2 bg-gray-200 text-gray-700" href="#">
                2
              </a>
            </li>
            <li>
              <a className="px-3 py-2 bg-gray-200 text-gray-700" href="#">
                »
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Content;
