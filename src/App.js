import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register'
import Details from './pages/details';
import StoreManager from './pages/storemanager';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:slug" element={<Details />} />
        <Route path="/storemanager/*" element={<StoreManager />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

