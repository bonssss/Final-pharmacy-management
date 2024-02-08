// Import necessary dependencies and assets
import React, { useState, useEffect } from 'react';
import './managesupplier.css';
import managesupplier from '../../assets/supplier.png';

const TableRow = ({ data, onEdit, onDelete }) => {
  // Similar logic as in ManageMedicine for handling edit and delete

  return (
    <tr>
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td>{data.email}</td>
      <td>{data.contactNumber}</td>
      <td>{data.address}</td>
      {/* <td>
      
        <span className="action-icons" onClick={() => onEdit({ id: data.id, name: data.name, email: data.email, contactNumber: data.contactNumber, address: data.address })}>
  <i className="fas fa-edit edit-icon"></i>
</span>

      
        <span className="action-icons" onClick={() => onDelete(data.id)}>
          <i className="fas fa-trash delete-icon"></i>
        </span>
        
      </td> */}
    </tr>
  );
};

const ManageSupplier = () => {
  // State variables
  const [searchTerm, setSearchTerm] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'month', 'week', 'today'
  const [count, setCount] = useState(1);

  // Fetch suppliers data (use useEffect for asynchronous operations)
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const filterObj = {
          all: {},
          month: { /* Logic for filtering by month */ },
          week: { /* Logic for filtering by week */ },
          today: { /* Logic for filtering by today */ },
        };

        const response = await fetch(`http://localhost:5000/api/supplier?filter=${JSON.stringify(filterObj[filter])}`);
        const data = await response.json();
        if (data.success) {
          const suppliersWithCount = data.suppliers.map((supplier) => ({
            ...supplier,
            id: count + data.suppliers.indexOf(supplier),
          }));
          setSuppliers(suppliersWithCount);
        }
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, [count, filter]);

  // Filter suppliers based on the search term
  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleEdit = async (editedData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/supplier/update/${editedData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });

      if (response.ok) {
        const updatedSuppliers = suppliers.map((supplier) =>
          supplier.id === editedData.id ? editedData : supplier
        );
        setSuppliers(updatedSuppliers);
      } else {
        console.error('Failed to update supplier. Please try again.');
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
        <h1> <img src={managesupplier} className='dashboard-icon' alt="" />Manage Supplier</h1>

        {/* Header section */}
        <div className="row">
          <div className="col-md-12 form-group form-inline">
            <label className="font-weight-bold" htmlFor="">Search:&emsp;</label>
            <input type="text" className="form-control" id="" placeholder="Search Supplier" value={searchTerm} onChange={handleSearchInputChange} />
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
                    {/* <th style={{ width: '15%' }}>Action</th> */}
                  </tr>
                </thead>
                <tbody id="suppliers_div">
                  {filteredSuppliers.map((supplier, index) => (
                    <TableRow
                      key={index}
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
