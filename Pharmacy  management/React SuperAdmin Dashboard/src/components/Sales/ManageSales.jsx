// Import necessary dependencies and assets
import React, { useState, useEffect } from 'react';
import './managesales.css';
import logo from '../../assets/ppp.png';

const TableRow = ({ data, onEdit, onDelete }) => {
  const formattedDate = new Date(data.date).toLocaleDateString();
  const expireformattedDate = new Date(data.expireDate).toLocaleDateString();
  return (
    <tr>
      <td>{data.id}</td>
      <td>
        {data.isEditing ? (
          <input
            type="text"
            value={data.medicineName}
            onChange={(e) => onEdit({ ...data, medicineName: e.target.value })}
          />
        ) : (
          data.medicineName
        )}
      </td>
      <td>{formattedDate}</td>
      <td>{expireformattedDate}</td>
      <td>
        {data.isEditing ? (
          <input
            type="number"
            value={data.quantity}
            onChange={(e) => onEdit({ ...data, quantity: e.target.value })}
          />
        ) : (
          data.quantity
        )}
      </td>
      <td>
        {data.isEditing ? (
          <input
            type="number"
            value={data.price}
            onChange={(e) => onEdit({ ...data, price: e.target.value })}
          />
        ) : (
          data.price
        )}
      </td>
      <td>
        {data.isEditing ? (
          <input
            type="text"
            value={data.supplierName}
            onChange={(e) => onEdit({ ...data, supplierName: e.target.value })}
          />
        ) : (
          data.supplierName
        )}
      </td>
      {/* <td>
        {data.isEditing ? (
          <>
            <span
              className="action-icons"
              onClick={() => onEdit(data)}
            >
              Save
            </span>
            <span
              className="action-icons"
              onClick={() => onEdit({ ...data, isEditing: false })}
            >
              Cancel
            </span>
          </>
        ) : (
          <>
            <span
              className="action-icons"
              onClick={() => onEdit({ ...data, isEditing: true })}
            >
              Edit
            </span>
            <span
              className="action-icons"
              onClick={() => onDelete(data.id)}
            >
              Delete
            </span>
          </>
        )}
      </td> */}
    </tr>
  );
};

const ManageSales = () => {
  const [salesData, setSalesData] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/sales?filter=${encodeURIComponent(filter)}`);
        const data = await response.json();
        if (data.success) {
          // Assign IDs to sales data
          const salesWithIds = data.sales.map((sale, index) => ({
            ...sale,
            id: index + 1,
          }));
          setSalesData(salesWithIds);
        }
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };
    

    fetchSalesData();
  }, [filter]);
  const handleEdit = async (editedData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/sales/update/${editedData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });
  
      if (response.ok) {
        const updatedSales = salesData.map((sale) =>
          sale.id === editedData.id ? editedData : sale
        );
        setSalesData(updatedSales);
      } else {
        console.error('Failed to update sale. Please try again.');
      }
    } catch (error) {
      console.error('Error updating sale:', error);
    }
  };
  

  // const handleEdit = (editedData) => {
  //   // Find the sale with the given ID and perform the edit action
  //   const updatedSales = salesData.map((sale) =>
  //     sale.id === editedData.id ? editedData : sale
  //   );
  //   setSalesData(updatedSales);
  // };

  const handleDelete = async (id) => {
    // Perform the delete action
    try {
      const response = await fetch(`http://localhost:5000/api/sales/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // If delete is successful, update the salesData state
        const updatedSales = salesData.filter((sale) => sale.id !== id);
        setSalesData(updatedSales);
      } else {
        console.error('Failed to delete sale. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting sale:', error);
    }
  };


  

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <div className="managesales-container">
      <div className="container">
        <h2>
          <img src={logo} alt="" className='managesales'/>
          Sales Management
        </h2>

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
                <th>Medicine Name</th>
                <th>Date</th>
                <th>Expire Date</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Supplier Name</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((sale) => (
                <TableRow
                  key={sale.id}
                  data={sale}
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

export default ManageSales;




