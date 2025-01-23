import React from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;