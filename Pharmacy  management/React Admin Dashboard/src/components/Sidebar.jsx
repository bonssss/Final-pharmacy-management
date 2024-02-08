import React, { useState } from 'react';
import { BsGrid1X2Fill, BsMenuButtonWideFill } from 'react-icons/bs';
import { Medication } from '@mui/icons-material';
import { Support } from '@mui/icons-material';
import logo from '../assets/logop.jpeg';
import { Link } from 'react-router-dom';
import dashboard from '../assets/dashboard.png'
import medicine from '../assets/medicine.png'
import supplier from '../assets/supplier.png'
import purchase from '../assets/ppp.png'
import sales from '../assets/ppp.png'

import './sidebar.css'

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const [isMedicineSubMenuVisible, setMedicineSubMenuVisible] = useState(false);
  const [isSupplierSubMenuVisible, setSupplierSubMenuVisible] = useState(false);
  const [isPurchaseSubMenuVisible, setPurchaseSubMenuVisible] = useState(false);
  const [isReportSubMenuVisible, setReportSubMenuVisible] = useState(false);
  const [isDashboardSubMenuVisible, setDashboardSubMenuVisible] = useState(false);
  const [isSalesSubMenuVisible, setSalesSubMenuVisible] = useState(false);



  const toggleMedicineSubMenu = () => {
    setMedicineSubMenuVisible(!isMedicineSubMenuVisible);
  };

  const toggleSupplierSubMenu = () => {
    setSupplierSubMenuVisible(!isSupplierSubMenuVisible);
  };

  const togglePurchaseSubMenu = () => {
    setPurchaseSubMenuVisible(!isPurchaseSubMenuVisible);
  };
  const toggleReportSubMenu = () => {
    setReportSubMenuVisible(!isReportSubMenuVisible);
  };
  const toggleDashboardSubMenu = () => {
    setDashboardSubMenuVisible(!isDashboardSubMenuVisible);
  };
  const toggleSalesSubMenu = () => {
    setSalesSubMenuVisible(!isSalesSubMenuVisible);
  };



  return (

    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <img src={logo} alt="" className='logoimage' />
          Pharmacy Admin
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
      <li className={`sidebar-list-item ${isMedicineSubMenuVisible ? 'active' : ''}`}>
          <div onClick={toggleDashboardSubMenu}>
          <Link to="/home" className='dashboard'>
            <img src={dashboard}  className="dashboard-icon" alt="" />
            {/* <BsGrid1X2Fill className='icon' /> */}
             Dashboard
          </Link>
          </div>
        </li>
       
         <li className={`sidebar-list-item ${isMedicineSubMenuVisible ? 'active' : ''}`}>
          <div onClick={toggleMedicineSubMenu}>
            {/* <Medication className='icon' />  */}
            <img src={medicine}  className="dashboard-icon" alt="" />


            Medicine
          </div>
          {isMedicineSubMenuVisible && (
            <ul className='sub-menu'>
              <li className='sub-menu-item'>
                <Link to="/add-medicine" className='Hide-line'>Add Medicine</Link>
              </li>
              <li className='sub-menu-item'>
                <Link to="/manage-medicine"  className='Hide-line'>Manage Medicine</Link>
              </li>
            </ul>
          )}
        </li>
        <li className={`sidebar-list-item ${isSupplierSubMenuVisible ? 'active' : ''}`}>
          <div onClick={toggleSupplierSubMenu}>
            {/* <Support className='icon' />  */}
            <img src={supplier}  className="dashboard-icon" alt="" />

            Supplier
            </div>
          {isSupplierSubMenuVisible && (
            <ul className='sub-menu'>
              <li className='sub-menu-item'>
                
                <Link to="/add-supplier"  className='Hide-line'>Add Supplier</Link>
              </li>
              <li className='sub-menu-item'>
                <Link to="/manage-supplier"  className='Hide-line'>Manage Supplier</Link>
              </li>
            </ul>
          )}
        </li>
        <li className={`sidebar-list-item ${isPurchaseSubMenuVisible ? 'active' : ''}`}>
          <a href="#" onClick={toggleSalesSubMenu}>
            {/* <BsMenuButtonWideFill className='icon' />  */}
            <img src={sales}  className="dashboard-icon" alt="" />

            Sales
          </a>
          {isSalesSubMenuVisible && (
            <ul className='sub-menu'>
              <li className='sub-menu-item'>
                <Link to="/add-sales"  className='Hide-line'>Add Sales</Link>
              </li>
              <li className='sub-menu-item'>
                <Link to="/manage-sales"  className='Hide-line'>ManageSales</Link>
              </li>
            </ul>
          )}
        </li>
        <li className={`sidebar-list-item ${isPurchaseSubMenuVisible ? 'active' : ''}`}>
          <a href="#" onClick={togglePurchaseSubMenu}>
            {/* <BsMenuButtonWideFill className='icon' />  */}
            <img src={purchase}  className="dashboard-icon" alt="" />

            Purchase
          </a>
          {isPurchaseSubMenuVisible && (
            <ul className='sub-menu'>
              <li className='sub-menu-item'>
                <Link to="/add-purchase"  className='Hide-line'>Add Purchase</Link>
              </li>
              <li className='sub-menu-item'>
                <Link to="/manage-purchase"  className='Hide-line'>Manage Purchase</Link>
              </li>
            </ul>
          )}
        </li>
        <li className={`sidebar-list-item ${isPurchaseSubMenuVisible ? 'active' : ''}`}>
          {/* <a href="#" onClick={toggleReportSubMenu}> */}
            <BsMenuButtonWideFill className='icon' /> <Link to ="/report">Report</Link> 
          {/* </a> */}
          {/* {isReportSubMenuVisible && (
            <ul className='sub-menu'>
             
              <li className='sub-menu-item'>
                <Link href="#"  className='Hide-line'>Sales Report</Link>
              </li>
              <li className='sub-menu-item'>
                <Link href="#"  className='Hide-line'> Purchase Report</Link>
              </li>
             
            </ul>
          )} */}
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
