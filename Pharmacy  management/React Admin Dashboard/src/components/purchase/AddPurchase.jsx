import React, { useState, useEffect } from 'react';
import './addpurchase.css';
import addpurchase from '../../assets/ppp.png';

const AddPurchase = () => {
  const [formData, setFormData] = useState({
    pharmacyId:localStorage.getItem("pharmacyId"),
    supplierName: '',
    medicineName: '',
    invoiceNumber: '',
    paymentType: 'Cash Payment',
    invoiceDate: '',
    expireDate: '',
    price: '', // Assuming this is for the price
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

    // Submit purchase data to the server
    fetch('http://localhost:5000/api/purchase/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('Purchase added successfully:', data.message);
        } else {
          console.error('Failed to add purchase:', data.message);
        }
      })
      .catch((error) => console.error('Error submitting purchase data:', error));

    // Clear the form after submission
    setFormData({
      supplierName: '',
      medicineName: '',
      invoiceNumber: '',
      paymentType: 'Cash Payment',
      invoiceDate: '',
      expireDate: '',
      price: '',
    });
  };

  return (
    <div className="addpurchase-maincontainer">
      <div className="addpurchase-container">
        <h2>
          <img src={addpurchase} className="dashboard-icon" alt="" />
          Add Purchase
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Supplier details */}
          <div>
            <label htmlFor="supplierName">Supplier:</label>
            <select
              id="supplierName"
              name="supplierName"
              value={formData.supplierName}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select a supplier
              </option>
              {supplierNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <label htmlFor="medicineName">Medicine Name:</label>
          <input
            type="text"
            id="medicineName"
            name="medicineName"
            value={formData.medicineName}
            onChange={handleChange}
            required
          />

          <label htmlFor="invoiceNumber">Invoice Number:</label>
          <input
            type="text"
            id="invoiceNumber"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
            required
          />

          <div>
            <label htmlFor="paymentType">Payment Type:</label>
            <select
              id="paymentType"
              name="paymentType"
              value={formData.paymentType}
              onChange={handleChange}
            >
              <option value="Cash Payment">Cash Payment</option>
              <option value="Net Banking">Net Banking</option>
              <option value="Payment Due">Payment Due</option>
            </select>
          </div>

          <label htmlFor="invoiceDate">Date:</label>
          <input
            type="date"
            id="invoiceDate"
            name="invoiceDate"
            value={formData.invoiceDate}
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

          {/* Add medicines */}
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddPurchase;
