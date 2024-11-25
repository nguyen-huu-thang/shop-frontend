import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/home';
import Details from './pages/details';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

