import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.css';

const Layout = ({ children }) => {
  const location = useLocation();
  const isExcludedPage = location.pathname === '/' || location.pathname === '/calculator';

  return (
    <div className="layout">
      <Header />
      <div className="main-content">
        <div className="content">{children}</div>
        {!isExcludedPage && <Sidebar />}
      </div>
      <Footer />
    </div>
  );
};


export default Layout;
