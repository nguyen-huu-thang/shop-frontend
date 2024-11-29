import React from 'react';
import './test.css';
import User from '../components/test/user/User';
import Product from "../components/test/product/Product";
import Category from "../components/test/category/Category";
import Security from "../components/test/security/Security";
import File from "../components/test/file/File";




const Test = () => {
  return (
    <div className="test-page">
      <h1>Test API Page</h1>
      <h2 class="xxx">Security</h2>
      <Security />
      <h2 class="xxx">User</h2>
      <User />
      <h2 class="xxx">Product</h2>
      <Product />
      <h2 class="xxx">Category</h2>
      <Category />
      <h2 class="xxx">File</h2>
      <File />
      
    </div>
  );
};

export default Test;
