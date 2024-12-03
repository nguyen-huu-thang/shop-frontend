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
function App() {
  return (
    <BrowserRouter>
      <TokenRefresher />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:slug" element={<Details />} />
        <Route path="/storemanager/*" element={<StoreManager />} />
        <Route path="/test" element={<Test />} />
        <Route path="/account/*" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payments" element={<Payments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
