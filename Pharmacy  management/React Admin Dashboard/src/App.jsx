
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import AddMedicine from "./components/Medicine/AddMedicine";
import AddSupplier from "./components/Supplier/AddSupplier";
import ManageMedicine from "./components/Medicine/ManageMedicine";
import AddPurchase from "./components/purchase/AddPurchase";
import ManageSupplier from "./components/Supplier/ManageSupplier";
import AddSales from "./components/Sales/AddSales";
import ManageSales from "./components/Sales/ManageSales";
import ManagePurchase from "./components/purchase/ManagePurchase";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Report from "./components/Report/Report";
import "./components/App.css"

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const handleLogin = () => {
    // Logic for successful login, set authenticated to true
    setAuthenticated(true);
  };

  const handleLogout = () => {
    // Logic for logout, set authenticated to false
    setAuthenticated(false);
  };

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Router>
      <div className="grid-container">
        {authenticated && <Header OpenSidebar={OpenSidebar} onLogout={handleLogout} />}
        <div className="menu-content">
          {!authenticated && (
            <Routes>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/*" element={<Navigate to="/login" />} />
            </Routes>
          )}
          {authenticated && (
            <>
              <Sidebar
                openSidebarToggle={openSidebarToggle}
                OpenSidebar={OpenSidebar}
              />
              <div className="content-container">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/add-medicine" element={<AddMedicine />} />
                  <Route path="/manage-medicine" element={<ManageMedicine />} />
                  <Route path="/add-supplier" element={<AddSupplier />} />
                  <Route path="/add-purchase" element={<AddPurchase />} />
                  <Route path="/manage-supplier" element={<ManageSupplier />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/add-sales" element={<AddSales />} />
                  <Route path="/manage-sales" element={<ManageSales />} />
                  <Route path="/manage-purchase" element={<ManagePurchase />} />
                  <Route path="/report" element={<Report />} />
                </Routes>
              </div>
            </>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;
