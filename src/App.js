// import './App.css';
// import { BrowserRouter, Routes, Route} from 'react-router-dom';
// import Home from './pages/home';
// // import AboutPage from './pages/AboutPage';
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// thiết kế theo hướng bootstrap css
import React from "react";
import Navbar1 from "./components/navbar1";

function App() {
  return (
    <div>
      <Navbar1 />
    </div>
  );
}

export default App;

