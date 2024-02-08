// components/Report/Report.js
import React, { useState, useEffect } from "react";

const Report = () => {
  const [medicinesCount, setMedicinesCount] = useState(0);
  const [suppliersCount, setSuppliersCount] = useState(0);
  const [salesCount, setSalesCount] = useState(0);
  const [purchasesCount, setPurchasesCount] = useState(0);

  useEffect(() => {
    // Fetch data from the server
    const fetchData = async () => {
      try {
        const pharmacyId = localStorage.getItem("pharmacyId");
        
        const responseMedicines = await fetch(
            "http://localhost:5000/api/reports/medicines"
          );
          const dataMedicines= await responseMedicines.json();
          setMedicinesCount(dataMedicines.medicinesCount);
  
          const responseSuppliers = await fetch(
            "http://localhost:5000/api/reports/suppliers"
          );
          const dataSuppliers= await responseSuppliers.json();
          setSuppliersCount(dataSuppliers.suppliersCount);
          
        //  const responseMedicines = await fetch(
        //   `http://localhost:5000/api/reports/medicines/count/${pharmacyId}`
        // );
        // const dataMedicines = await responseMedicines.json();
        // setMedicinesCount(dataMedicines.medicinesCount);


        // const responseSuppliers = await fetch(
        //   `http://localhost:5000/api/reports/suppliers/count/${pharmacyId}`
        // );
        // const dataSuppliers = await responseSuppliers.json();
        // setSuppliersCount(dataSuppliers.suppliersCount);

    //     const responsePurchases = await fetch(
    //       `http://localhost:5000/api/reports/purchases/count/${pharmacyId}`
    //     );
    //     const dataPurchases = await responsePurchases.json();
    //     setPurchasesCount(dataPurchases.purchasesCount);

    //   const responseSales = await fetch(
    //     `http://localhost:5000/api/reports/sales/count/${pharmacyId}`
    //   );
    //   const dataSales = await responseSales.json();
    //   setSalesCount(dataSales.salesCount);


        const responseSales = await fetch(
          "http://localhost:5000/api/reports/sales"
        );
        const dataSales = await responseSales.json();
        setSalesCount(dataSales.salesCount);

        const responsePurchases = await fetch(
          "http://localhost:5000/api/reports/purchases"
        );
        const dataPurchases = await responsePurchases.json();
        setPurchasesCount(dataPurchases.purchasesCount);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Reports</h2>
      <div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th colSpan="2" style={{ borderBottom: "2px solid black" }}>
                <h2 style={{ margin: "0" }}>General Report for This Pharmacy</h2>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h4>Number of Medicines</h4>
              </td>
              <td>
                <h4>{medicinesCount}</h4>
              </td>
            </tr>
            <tr>
              <td>
                <h4>Number of Suppliers</h4>
              </td>
              <td>
                <h4>{suppliersCount}</h4>
              </td>
            </tr>
            <tr>
              <td>
                <h4>Number of Sales</h4>
              </td>
              <td>
                <h4>{salesCount}</h4>
              </td>
            </tr>
            <tr>
              <td>
                <h4>Number of Purchases</h4>
              </td>
              <td>
                <h4>{purchasesCount}</h4>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
