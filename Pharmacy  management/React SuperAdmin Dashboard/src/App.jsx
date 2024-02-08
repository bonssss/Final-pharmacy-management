// import { useState } from "react";
// import "./components/App.css";
// import Header from "./components/Header";
// import Sidebar from "./components/Sidebar";
// import Home from "./components/Home";
// // import AddMedicine from "./components/Medicine/AddMedicine";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// // import AddSupplier from "./components/Supplier/AddSupplier";
// import ManageMedicine from "./components/Medicine/ManageMedicine";
// // import AddPurchase from "./components/purchase/AddPurchase";
// import ManageSupplier from "./components/Supplier/ManageSupplier";
// // import AddSales from "./components/Sales/AddSales";
// import ManageSales from "./components/Sales/ManageSales";
// import ManagePurchase from "./components/purchase/ManagePurchase";
// import ManagePharmacy from "./components/Pharmacy/ManagePharmacy"

// function App() {
//   const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
//   const [showHome, setShowHome] = useState(true);

//   const OpenSidebar = () => {
//     setOpenSidebarToggle(!openSidebarToggle);
//   };
//   const handleManageMedicineClick = () => {
//     setShowHome(false);
//   };

//   return (
//     <Router>
//       <div className="grid-container">
//         {<Header OpenSidebar={OpenSidebar} />}

//         <div className="menu-content">
//           <Sidebar
//             openSidebarToggle={openSidebarToggle}
//             OpenSidebar={OpenSidebar}
//             onManageMedicineClick={handleManageMedicineClick}
//           />

//           {/* <Home/> */}

//           <div className="content-container">
//             {/* {showHome && showDashboard && (
//             <Routes>
//               <Route path='/' element={<Home />} />
//             </Routes>
//           )}
//           {!showHome && (
//             <Routes>
//               <Route path='/' element={<ManageMedicine />} />
//             </Routes>
//           )} */}

//             <Routes>
//               {/* <Route path="/" element={showHome? <Home/> :<ManageMedicine/>} /> */}
//               <Route path="/" element={<Home />} />
//               <Route path="/manage-medicine" element={<ManageMedicine />} />
//               <Route path="/manage-supplier" element={<ManageSupplier />} />
//               <Route path="/home" element={<Home/>} />
//               <Route path="/manage-sales" element={<ManageSales />} />
//               <Route path="/manage-purchase" element={<ManagePurchase />} />
//               <Route path="/manage-pharmacy" element={<ManagePharmacy />} />


//             </Routes>
//           </div>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React, { useState } from "react";
import "./components/App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import LoginPage from "./components/login/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ManageMedicine from "./components/Medicine/ManageMedicine";
import ManageSupplier from "./components/Supplier/ManageSupplier";
import ManageSales from "./components/Sales/ManageSales";
import ManagePurchase from "./components/purchase/ManagePurchase";
import ManagePharmacy from "./components/Pharmacy/ManagePharmacy";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Function to handle successful login
  const handleLogin = () => {
    setLoggedIn(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setLoggedIn(false);
  };
  

  return (
    <Router>
      <div className="grid-container">
        {/* Display different content based on login status */}
        {loggedIn ? (
          <>
            <Header handleLogout={handleLogout} />
            <div className="menu-content">
              <Sidebar />
              
              <div className="content-container">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/manage-medicine" element={<ManageMedicine />} />
                  <Route path="/manage-supplier" element={<ManageSupplier />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/manage-sales" element={<ManageSales />} />
                  <Route path="/manage-purchase" element={<ManagePurchase />} />
                  <Route path="/manage-pharmacy" element={<ManagePharmacy />} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          // If not logged in, display the login page
          <LoginPage handleLogin={handleLogin} />
        )}
      </div>
    </Router>
  );
}

export default App;

