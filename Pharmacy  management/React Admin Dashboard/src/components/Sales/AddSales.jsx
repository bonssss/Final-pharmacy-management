import React, { useState, useEffect } from 'react';
import './addsales.css';
import addsales from "../../assets/ppp.png";

const AddSales = () => {
  const [formData, setFormData] = useState({
    pharmacyId:localStorage.getItem("pharmacyId"),
    medicineName: '',
    date: '',
    expireDate: '',
    quantity: '',
    price: '',
    supplierName: '',
  });

  const [supplierNames, setSupplierNames] = useState([]);

  useEffect(() => {
    // Fetch supplier names from the server
    fetch('http://localhost:5000/api/supplier')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const names = data.suppliers.map((supplier) => supplier.name);
          setSupplierNames(names);
        }
      })
      .catch((error) => console.error('Error fetching supplier names:', error));
  }, []); // Empty dependency array to run the effect only once

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission (e.g., API call, state update)
    console.log('Form submitted:', formData);

    // Submit sales data to the server
    fetch('http://localhost:5000/api/sales/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('Sales added successfully:', data.message);
        } else {
          console.error('Failed to add sales:', data.message);
        }
      })
      .catch((error) => console.error('Error submitting sales data:', error));

    // Clear the form after submission
    setFormData({
      medicineName: '',
      date: '',
      expireDate: '',
      quantity: '',
      price: '',
      supplierName: '',
    });
  };

  return (
    <div className="addsales-maincontainer">
      <div className="addsalesconatiner">
        <h2><img src={addsales} className="dashboard-icon" alt="" />Add Sales</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="medicineName">Medicine Name:</label>
          <input
            type="text"
            id="medicineName"
            name="medicineName"
            value={formData.medicineName}
            onChange={handleChange}
            required
          />

          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <label htmlFor="expireDate">Expire Date:</label>
          <input
            type="date"
            id="expireDate"
            name="expireDate"
            value={formData.expireDate}
            onChange={handleChange}
            required
          />

          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />

          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <label htmlFor="supplierName">Supplier Name:</label>
          <select
            id="supplierName"
            name="supplierName"
            value={formData.supplierName}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a supplier</option>
            {supplierNames.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddSales;
