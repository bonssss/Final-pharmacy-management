import React, { useState,useEffect } from "react";
import { Report } from "@mui/icons-material";
import AddMedicine from "./Medicine/AddMedicine";
import AddSupplier from "./Supplier/AddSupplier";
import { Link } from "react-router-dom";
//  import './home.css'
import dashboard from "../assets/dashboard.png";

import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";

import { Settings } from "@mui/icons-material";
import { Medication } from "@mui/icons-material";

import { HomeMaxRounded } from "@mui/icons-material";

function Home() {
 
  const [medicinesCount, setMedicinesCount] = useState(0);
  const [suppliersCount, setSuppliersCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [purchasesCount, setPurchasesCount] = useState(0);
  const [expireMedicineCount, setExpireMedicineCount] = useState(0);

  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      const pharmacyId = localStorage.getItem("pharmacyId");
      try {
        
         const responseMedicines = await fetch(
          `http://localhost:5000/api/reports/medicines/count/${pharmacyId}`
        );
        const dataMedicines = await responseMedicines.json();
        setMedicinesCount(dataMedicines.medicinesCount);

      
        
          const response = await fetch(`http://localhost:5000/api/medicine/expiredCount/${pharmacyId}`);
          const data = await response.json();
          setExpireMedicineCount(data.expiredMedicineCount);
        

       const responseSuppliers = await fetch(
        `http://localhost:5000/api/reports/suppliers/count/${pharmacyId}`
      );
      const dataSuppliers = await responseSuppliers.json();
      setSuppliersCount(dataSuppliers.suppliersCount);


      const responsePurchases = await fetch(
          `http://localhost:5000/api/reports/purchases/count/${pharmacyId}`
        );
        const dataPurchases = await responsePurchases.json();
        setPurchasesCount(dataPurchases.purchasesCount);

      const responseSales = await fetch(
        `http://localhost:5000/api/reports/sales/count/${pharmacyId}`
      );
      const dataSales = await responseSales.json();
      setSalesCount(dataSales.salesCount);

      
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    
    <main className="main-container">
      <div className="main-title">
        <h3>
          {/* <i className="material-icons">home</i> */}
          <img src={dashboard} className="dashboard-icon" alt="" />
          DASHBOARD
        </h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>Medicine</h3>
            <Medication className="card_icon" />
          </div>
          <h1>{medicinesCount}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Expires</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{expireMedicineCount}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Purchase</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{purchasesCount}</h1>
        </div>
        <div className="card">
          <h3>
            Total Report <Report />
          </h3>
          <div className="card-inner">
            <table border="1px solid black">
              <tbody>
                <tr>
                  <td>TOTAL SALES</td>
                  <td>{salesCount}</td>
                </tr>
                <tr>
                  <td>TOTAL PURCHASE</td>
                  <td>{purchasesCount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Supplier</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{suppliersCount}</h1>
        </div>
      </div>

      <hr />

      <div className="main-cards">
        <Link to="/add-medicine" className="card">
          {/* <div className="card"  onClick={handleAddMedicineClick}> */}
          <div className="card-inner">
            <Medication className="card_icon" />
          </div>
          <h4> Add New Medicine</h4>
          {/* </div> */}
        </Link>

        <Link to="/add-supplier" className="card">
          {/* <div className="card" onClick={handleAddSupplierClick}> */}
          <div className="card-inner">
            <BsPeopleFill className="card_icon" />
          </div>
          <h3> Add New Supplier</h3>
        </Link>
        {/* </div> */}
        <Link to="/add-purchase" className="card">
          <div className="card-inner">
            <BsPeopleFill className="card_icon" />
          </div>
          <h3>Add New Purchaser</h3>
        </Link>
      </div>

      <hr />

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>Purchase Report</h3>
            <Report className="card_icon" />
          </div>
          <h1>{purchasesCount}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Sales Report</h3>
            <Report className="card_icon" />
          </div>
          <h1>{salesCount}</h1>
        </div>
      </div>

     
    </main>
    
  );
}

export default Home;
