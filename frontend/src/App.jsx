import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import About from "./components/About";     
import Contacts from "./components/Contacts";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <ProductList />
            </>
          } />
          
          <Route path="/product/:id" element={<ProductCard />} />
          <Route path="/about" element={<About />} />      
          <Route path="/contacts" element={<Contacts />} /> 
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;