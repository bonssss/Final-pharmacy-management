import React, { useState, useEffect } from 'react';
import './managesupplier.css';
import '@fortawesome/fontawesome-free/css/all.css';
import managesupplier from '../../assets/supplier.png';

const TableRow = ({ data, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...data });

  const handleEditSave = () => {
    onEdit(editedData);
    setIsEditing(false);
  };

  return (
    <tr>
      <td>{data.id}</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedData.name}
            onChange={(e) =>
              setEditedData({ ...editedData, name: e.target.value })
            }
          />
        ) : (
          data.name
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedData.email}
            onChange={(e) =>
              setEditedData({ ...editedData, email: e.target.value })
            }
          />
        ) : (
          data.email
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedData.contactNumber}
            onChange={(e) =>
              setEditedData({ ...editedData, contactNumber: e.target.value })
            }
          />
        ) : (
          data.contactNumber
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedData.address}
            onChange={(e) =>
              setEditedData({ ...editedData, address: e.target.value })
            }
          />
        ) : (
          data.address
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
              onClick={() => onDelete(data.id)}
            >
              <i className="fas fa-trash delete-icon"></i>
            </span>
          </>
        )}
      </td>
    </tr>
  );
};

const ManageSupplier = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'month', 'week', 'today'
  const [count, setCount] = useState(1);

  useEffect(() => {
  const fetchSuppliers = async () => {
    try {
      const filterObj = {
        all: { pharmacyId:localStorage.getItem("pharmacyId")},
        month: { /* Logic for filtering by month */ },
        week: { /* Logic for filtering by week */ },
        today: { /* Logic for filtering by today */ },
      };
      console.log("Filter Object:", filterObj[filter]);

      const response = await fetch(`http://localhost:5000/api/supplier?filter=${JSON.stringify(filterObj[filter])}`);
      const data = await response.json();

      if (data.success) {
        const suppliersWithCount = data.suppliers.map((supplier) => ({
          ...supplier,
          id: supplier._id, // Use a unique identifier like _id
        }));
        setSuppliers(suppliersWithCount);
      }
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  fetchSuppliers();
}, [count, filter]);


  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleEdit = async (editedData) => {
    try {
      const { id, ...restData } = editedData;
  
      const response = await fetch(`http://localhost:5000/api/supplier/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(restData),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        const updatedSuppliers = suppliers.map((supplier) =>
          supplier.id === id ? editedData : supplier
        );
        setSuppliers(updatedSuppliers);
      } else {
        console.error('Failed to update supplier. Please try again.', responseData.message);
      }
    } catch (error) {
      console.error('Error updating supplier:', error);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/supplier/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedSuppliers = suppliers.filter((supplier) => supplier.id !== id);
        setSuppliers(updatedSuppliers);
      } else {
        console.error('Failed to delete supplier. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="container">
        <h1><img src={managesupplier} className='dashboard-icon' alt="" />Manage Supplier</h1>

        {/* Header section */}
        <div className="row">
          <div className="col-md-12 form-group form-inline">
            <label className="font-weight-bold" htmlFor="">Search:&emsp;</label>
            <input type="text" className="form-control" placeholder="Search Supplier" value={searchTerm} onChange={handleSearchInputChange} />
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
          <div className="col col-md-12">
            <hr className="col-md-12" style={{ padding: '0px', borderTop: '2px solid #02b6ff' }} />
          </div>
        </div>

        {/* Table */}
        <div className="row">
          <div className="col col-md-12 table-responsive">
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th style={{ width: '10%' }}>ID</th>
                    <th style={{ width: '20%' }}>Name</th>
                    <th style={{ width: '15%' }}>Email</th>
                    <th style={{ width: '15%' }}>Contact Number</th>
                    <th style={{ width: '20%' }}>Address</th>
                    <th style={{ width: '15%' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuppliers.map((supplier) => (
                    <TableRow
                      key={supplier.id}
                      data={supplier}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Table end */}
      </div>
    </div>
  );
};

export default ManageSupplier;
