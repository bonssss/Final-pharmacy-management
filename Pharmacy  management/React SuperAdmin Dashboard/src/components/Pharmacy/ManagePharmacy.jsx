import React, { useState, useEffect } from 'react';
import './managepharmacy.css';

const ManagePharmacy = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'month', 'week'

  useEffect(() => {
    // Fetch pharmacy data from the backend API
    fetch('http://localhost:5000/api/pharmacies') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setPharmacies(data))
      .catch((error) => console.error('Error fetching pharmacy data:', error));
  }, []);

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleUpdateStatus = async (_id, status) => {
    try {
      const response = await fetch(`http://localhost:5000/api/pharmacies/${_id}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (data.success) {
        // Update the local state
        const updatedPharmacies = pharmacies.map((pharmacy) =>
          pharmacy._id === _id ? { ...pharmacy, status } : pharmacy
        );
        setPharmacies(updatedPharmacies);

        console.log('Pharmacy status updated successfully');
      } else {
        console.error('Failed to update pharmacy status:', data.message);
      }
    } catch (error) {
      console.error('Error updating pharmacy status:', error);
    }
  };

  return (
    <div className="container">
      <h1>Pharmacy Management</h1>

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

      <table className="table">
        <thead id="table1">
          <tr>
            <th>Pharmacy Name</th>
            <th>Owner Name</th>
            <th>License Number</th>
            <th>Location</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pharmacies.map((pharmacy) => (
            <tr key={pharmacy._id}>
              <td>{pharmacy.pharmacyName}</td>
              <td>{pharmacy.ownerName}</td>
              <td>{pharmacy.pharmacyLicenseNumber}</td>
              <td>{pharmacy.location}</td>
              <td>{pharmacy.email}</td>
              <td>{pharmacy.contactNumber}</td>
              <td>{pharmacy.status}</td>
              <td>
                {pharmacy.status !== 'approved' && pharmacy.status !== 'rejected' && (
                  <>
                    <button onClick={() => handleUpdateStatus(pharmacy._id, 'approved')}>
                      Approve
                    </button>
                    <button onClick={() => handleUpdateStatus(pharmacy._id, 'rejected')}>
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePharmacy;
