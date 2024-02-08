import React, { useState, useEffect } from 'react';
import './managemedicine.css';
import '@fortawesome/fontawesome-free/css/all.css';
import manage from '../../assets/medicine.png';

const TableRow = ({ data, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...data });

  const formattedDate = new Date(data.date).toLocaleDateString();
  const expireformattedDate = new Date(data.expireDate).toLocaleDateString();

  const handleEditSave = () => {
    onEdit(editedData);
    setIsEditing(false);
  };

  return (
    <tr>
      <td>{data.sl}</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedData.medicineName}
            onChange={(e) =>
              setEditedData({ ...editedData, medicineName: e.target.value })
            }
          />
        ) : (
          data.medicineName
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedData.genericName}
            onChange={(e) =>
              setEditedData({ ...editedData, genericName: e.target.value })
            }
          />
        ) : (
          data.genericName
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedData.suppliersName}
            onChange={(e) =>
              setEditedData({ ...editedData, suppliersName: e.target.value })
            }
          />
        ) : (
          data.suppliersName
        )}
      </td>
      <td>{formattedDate}</td>
      <td>{expireformattedDate}</td>
      <td>
        {isEditing ? (
          <input
            type="number"
            value={editedData.quantity}
            onChange={(e) =>
              setEditedData({ ...editedData, quantity: e.target.value })
            }
          />
        ) : (
          data.quantity
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="number"
            value={editedData.price}
            onChange={(e) =>
              setEditedData({ ...editedData, price: e.target.value })
            }
          />
        ) : (
          data.price
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            <span
              className="action-icons"
              onClick={() => handleEditSave()}
            >
              <i className="fas fa-save save-icon"></i>
            </span>
            <span
              className="action-icons"
              onClick={() => setIsEditing(false)}
            >
              <i className="fas fa-times cancel-icon"></i>
            </span>
          </>
        ) : (
          <>
            <span
              className="action-icons"
              onClick={() => setIsEditing(true)}
            >
              <i className="fas fa-edit edit-icon"></i>
            </span>
            <span
              className="action-icons"
              onClick={() => onDelete(data._id)}
            >
              <i className="fas fa-trash delete-icon"></i>
            </span>
          </>
        )}
      </td>
    </tr>
  );
};

const ManageMedicine = () => {
  const [medicinesData, setMedicinesData] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'month', 'week', 'today'
  const [searchByName, setSearchByName] = useState('');
  const [searchBySupplierName, setSearchBySupplierName] = useState('');
  const [count, setCount] = useState(1);

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
          all: { pharmacyId:localStorage.getItem("pharmacyId")},
          month: { date: { $gte: startDate, $lt: endDate } },
          week: { date: { $gte: startDate, $lt: endDate } },
          today: { date: { $gte: startDate, $lt: endDate } },
        };

        if (searchByName) {
          filterObj[filter].medicineName = { $regex: searchByName, $options: 'i' };
        }

        if (searchBySupplierName) {
          filterObj[filter].suppliersName = { $regex: searchBySupplierName, $options: 'i' };
        }

        const response = await fetch(
          `http://localhost:5000/api/medicine?filter=${JSON.stringify(filterObj[filter])}`
        );

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
  }, [count, filter, searchByName, searchBySupplierName]);

  const handleEdit = async (editedData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/medicine/update/${editedData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        const updatedMedicines = medicinesData.map((medicine) =>
          medicine._id === editedData._id ? editedData : medicine
        );
        setMedicinesData(updatedMedicines);
      } else {
        console.error('Failed to update medicine. Please try again.');
      }
    } catch (error) {
      console.error('Error updating medicine:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/medicine/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedMedicines = medicinesData.filter((medicine) => medicine._id !== id);
        setMedicinesData(updatedMedicines);
      } else {
        console.error('Failed to delete medicine. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting medicine:', error);
    }
  };

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
        <div className="row">
          <div className="col-md-12 form-group form-inline">
            <label className="font-weight-bold" htmlFor="by_name">Search:&emsp;</label>
            <input
              type="text"
              className="form-control"
              id="by_name"
              placeholder="By Medicine Name"
              value={searchByName}
              onChange={(e) => setSearchByName(e.target.value)}
            />
            &emsp;
            <input
              type="text"
              className="form-control"
              id="by_suppliers_name"
              placeholder="By Supplier Name"
              value={searchBySupplierName}
              onChange={(e) => setSearchBySupplierName(e.target.value)}
            />
          </div>
          <div className="col col-md-12">
            <hr className="col-md-12" style={{ padding: '0px', borderTop: '2px solid #02b6ff' }} />
          </div>
        </div>
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody id="medicines_div">
                  {medicinesData.map((medicine, index) => (
                    <TableRow
                      key={index}
                      data={medicine}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
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
