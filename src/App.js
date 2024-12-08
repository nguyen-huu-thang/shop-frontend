import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Details from './pages/details';
import StoreManager from './pages/storemanager';
import Test from './pages/test';
import TokenRefresher from './utils/tokenRefresher'; // Thêm TokenRefresher
import Account from './pages/account';
import Cart from './pages/cart';
import Payments from './pages/payments';
import Love from './pages/love';
import Category from './pages/category';
import Testpage from './components/testpage';
function App() {
  return (
    <BrowserRouter>
      <TokenRefresher />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/details/:slug" element={<Details />} />
        <Route path="/storemanager/*" element={<StoreManager />} />
        <Route path="/test" element={<Test />} />
        <Route path="/account/*" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/love" element={<Love />} />
        <Route path="/category/:category" element={<Category />} />
        <Route path="/testpage" element={<Testpage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
