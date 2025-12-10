import React, { useEffect, useState } from "react";
import Header from "../../components/Header.jsx";
import Banner from "./Banner.jsx";
import Footer from "../../components/Footer.jsx";
import ApiDisplay from "../../components/ApiDisplay.jsx";
import { Toaster } from "react-hot-toast";
const HomePage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  return (
    <>
      <div className="overflow-hidden">
        <Toaster position="top-center" />
        <Header setShowLogin={setShowLogin} cartCount={cartCount} />
        <Banner />
        <main className="px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <ApiDisplay setCartCount={setCartCount} />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
