import React, { useState, useEffect } from 'react';
import './managemedicine.css';
import '@fortawesome/fontawesome-free/css/all.css';
import manage from '../../assets/medicine.png';

const TableRow = ({ data }) => {
  const formattedDate = new Date(data.date).toLocaleDateString();
  const expireformattedDate = new Date(data.expireDate).toLocaleDateString();

  return (
    <tr>
      <td>{data.sl}</td>
      <td>{data.medicineName}</td>
      <td>{data.genericName}</td>
      <td>{data.suppliersName}</td>
      <td>{formattedDate}</td>
      <td>{expireformattedDate}</td>
      <td>{data.quantity}</td>
      <td>{data.price}</td>
    </tr>
  );
};

const ManageMedicine = () => {
  const [medicinesData, setMedicinesData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [count, setCount] = useState(1);
  const [pharmacies, setPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState('');

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const currentDate = new Date();
        let startDate, endDate;

        switch (filter) {
          case 'month':
            startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
            break;
          case 'week':
            startDate = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
            endDate = new Date(currentDate.setDate(startDate.getDate() + 6));
            break;
          case 'today':
            startDate = new Date(currentDate);
            endDate = new Date(currentDate);
            break;
          default:
            startDate = null;
            endDate = null;
        }

        const filterObj = {
          all: {},
          month: { date: { $gte: startDate, $lt: endDate } },
          week: { date: { $gte: startDate, $lt: endDate } },
          today: { date: { $gte: startDate, $lt: endDate } },
        };

        const response = await fetch(`http://localhost:5000/api/medicine?filter=${JSON.stringify(filterObj[filter])}`);
        const data = await response.json();

        if (data.success) {
          const medicinesWithCount = data.medicines.map((medicine) => ({
            ...medicine,
            sl: count + data.medicines.indexOf(medicine),
          }));
          setMedicinesData(medicinesWithCount);
        }
      } catch (error) {
        console.error("Error fetching medicines:", error);
      }
    };

    fetchMedicines();
  }, [count, filter]);

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pharmacies');
        const data = await response.json();

        if (data && data.length > 0) {
          const pharmacyNames = data.map(pharmacy => pharmacy.pharmacyName);
          setPharmacies(pharmacyNames);

          if (pharmacyNames.length > 0) {
            setSelectedPharmacy(pharmacyNames[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching pharmacies:', error);
      }
    };

    fetchPharmacies();
  }, [count, filter]);

  useEffect(() => {
    const fetchMedicinesByPharmacy = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/pharmacies/${selectedPharmacy}/medicine`);
        const data = await response.json();

        if (data.success) {
          const medicinesWithCount = data.medicines.map((medicine) => ({
            ...medicine,
            sl: count + data.medicines.indexOf(medicine),
          }));
          setMedicinesData(medicinesWithCount);
        }
      } catch (error) {
        console.error('Error fetching medicines by pharmacy:', error);
      }
    };

    fetchMedicinesByPharmacy();
  }, [selectedPharmacy, count, filter]);

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <div className="container-fluid">
      <div className="container">
        <h1>
          <img src={manage} className=" dashboard-icon" alt="" />
          Manage Medicine
        </h1>
        {/* <div className="row">
          <div className="col-md-12 form-group form-inline">
            <label className="font-weight-bold" htmlFor="">Search:&emsp;</label>
            <input type="text" className="form-control" id="by_name" placeholder="By Medicine Name" />
            &emsp;<input type="text" className="form-control" id="by_suppliers_name" placeholder="By Supplier Name" />
          </div>
          <div className="col col-md-12">
            <hr className="col-md-12" style={{ padding: '0px', borderTop: '2px solid #02b6ff' }} />
          </div>
        </div> */}
        <div className="filter-dropdown">
          <label htmlFor="filter">Filter:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="all">All</option>
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="today">Today</option>
          </select>
        </div>

        <label htmlFor="pharmacy">Select Pharmacy:</label>
        <select
          id="pharmacy"
          value={selectedPharmacy}
          onChange={(e) => setSelectedPharmacy(e.target.value)}
        >
          {pharmacies.map((pharmacy) => (
            <option key={pharmacy} value={pharmacy}>
              {pharmacy}
            </option>
          ))}
        </select>

        <div className="row">
          <div className="col col-md-12 table-responsive">
            <div className="table-responsives">
              <table className="table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th>SL.</th>
                    <th>Medicine Name</th>
                    <th>Generic Name</th>
                    <th>Supplier</th>
                    <th>Date</th>
                    <th>Ex.Date</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody id="medicines_div">
                  {medicinesData.map((medicine, index) => (
                    <TableRow
                      key={index}
                      data={medicine}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageMedicine;
