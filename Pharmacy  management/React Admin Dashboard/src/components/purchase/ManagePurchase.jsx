import React, { useState, useEffect } from 'react';
import './managepurchase.css';
import managepurchase from '../../assets/ppp.png';

const TableRow = ({ data, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...data });
  const formattedDate = new Date(data.invoiceDate).toLocaleDateString();
  const expireformattedDate = new Date(data.expireDate).toLocaleDateString();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onEdit(editedData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedData({ ...data });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  return (
    <tr>
      <td>{data.id}</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="supplierName"
            value={editedData.supplierName}
            onChange={handleInputChange}
          />
        ) : (
          data.supplierName
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            name="medicineName"
            value={editedData.medicineName}
            onChange={handleInputChange}
          />
        ) : (
          data.medicineName
        )}
      </td>
      <td>{data.invoiceNumber}</td>
      <td>{data.paymentType}</td>
      <td>{formattedDate}</td>
      <td>{expireformattedDate}</td>
      <td>{data.price}</td>
      <td>
        {isEditing ? (
          <>
            <span className="action-icons save" onClick={handleSaveClick}>
              Save
            </span>
            <span className="action-icons cancel" onClick={handleCancelEdit}>
              Cancel
            </span>
          </>
        ) : (
          <>
            <span className="action-icons edit" onClick={handleEditClick}>
              Edit
            </span>
            <span className="action-icons delete" onClick={() => onDelete(data.id)}>
              Delete
            </span>
          </>
        )}
      </td>
    </tr>
  );
};

const ManagePurchase = () => {
  const [purchasesData, setPurchasesData] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchPurchaseData = async () => {
      try {
        const pharmacyId = localStorage.getItem("pharmacyId");

        const response = await fetch(`http://localhost:5000/api/purchase?filter=${encodeURIComponent(JSON.stringify(filter))}`);
        const data = await response.json();
        if (data.success) {
          // Assign IDs to purchase data
          const purchasesWithIds = data.purchases.map((purchase, index) => ({
            ...purchase,
            id: index + 1,
          }));
          setPurchasesData(purchasesWithIds);
        }
      } catch (error) {
        console.error('Error fetching purchase data:', error);
      }
    };
    
    fetchPurchaseData();
  }, [filter]);

  const handleEdit = async (editedData) => {
    // Perform the edit action
    try {
      const response = await fetch(`http://localhost:5000/api/purchase/update/${editedData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        const updatedPurchases = purchasesData.map((purchase) =>
          purchase.id === editedData.id ? editedData : purchase
        );
        setPurchasesData(updatedPurchases);
      } else {
        console.error('Failed to update purchase. Please try again.');
      }
    } catch (error) {
      console.error('Error updating purchase:', error);
    }
  };

  const handleDelete = async (id) => {
    // Perform the delete action
    try {
      const response = await fetch(`http://localhost:5000/api/purchase/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // If delete is successful, update the purchasesData state
        const updatedPurchases = purchasesData.filter((purchase) => purchase.id !== id);
        setPurchasesData(updatedPurchases);
      } else {
        console.error('Failed to delete purchase. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting purchase:', error);
    }
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <div className="container-fluid">
      <div className="managepurchase-container">
        <h1>
          <img src={managepurchase} className="dashboard-icon" alt="" />
          Manage Purchases
        </h1>
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
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Supplier Name</th>
                <th>Medicine Name</th>
                <th>Invoice Number</th>
                <th>Payment Type</th>
                <th>Invoice Date</th>
                <th>Expire Date</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {purchasesData.map((purchase) => (
                <TableRow
                  key={purchase.id}
                  data={purchase}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagePurchase;
