import React, { useState } from "react";
import Header from "../../components/Header.jsx";
import Banner from "./Banner.jsx";
import Hero from "./Hero.jsx";  
import Footer from "../../components/Footer.jsx";
import ApiDisplay from "../../components/ApiDisplay.jsx";
import { Toaster } from "react-hot-toast";

const HomePage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <div className="overflow-hidden">
        <Toaster position="top-center" />
        <Header setShowLogin={setShowLogin} cartCount={cartCount} />
        <Hero onSearch={setSearchQuery} />
        <main className="px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <ApiDisplay setCartCount={setCartCount} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
