import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from "./pages/home";
import { Auth } from "./pages/auth";
import CreateProduct from "./pages/create-product";
import { SavedProducts } from "./pages/saved-products";

import { Navbar } from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />  {/* Moved inside Router */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/saved-products" element={<SavedProducts />} />
        </Routes> 
      </Router>
    </div>
  );
}

export default App;
