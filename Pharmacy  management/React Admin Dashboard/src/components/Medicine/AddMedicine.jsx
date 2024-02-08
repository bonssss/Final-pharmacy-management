import React, { useState } from "react";
import "./addmedicine.css";
import AddSupplier from "../Supplier/AddSupplier";
import medicine from "../../assets/medicine.png";

const AddMedicine = () => {
  console.log(localStorage.getItem("pharmacyId"));
  const [showAddSupplierForm, setShowAddSupplierForm] = useState(false);
  const [medicineName, setMedicineName] = useState("");
  const [genericName, setGenericName] = useState("");
  const [suppliersName, setSuppliersName] = useState("");
  const [showSupplierSuggestions, setShowSupplierSuggestions] = useState(false);
  const [date, setDate] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const validateMedicineName = (value) => {
    if (!value) {
      document.getElementById("medicine_name_error").textContent =
        "Medicine name is required";
    } else {
      document.getElementById("medicine_name_error").textContent = "";
    }
  };

  const validateGenericName = (value) => {
    if (!value) {
      document.getElementById("generic_name_error").textContent =
        "Generic name is required";
    } else {
      document.getElementById("generic_name_error").textContent = "";
    }
  };

  const validateSupplierName = (value) => {
    if (!value) {
      document.getElementById("supplier_name_error").textContent =
        "Supplier name is required";
    } else {
      document.getElementById("supplier_name_error").textContent = "";
    }
  };

  const addMedicine = async () => {
    validateMedicineName(medicineName);
    validateGenericName(genericName);
    validateSupplierName(suppliersName);

    if (medicineName && genericName && suppliersName) {
      try {
        
        const response = await fetch("http://localhost:5000/api/medicine/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pharmacyId:localStorage.getItem("pharmacyId"),
            medicineName,
            genericName,
            suppliersName,
            date,
            expireDate,
            quantity,
            price,
          }),
        });
        console.log(response);

        if (response.ok) {
          setSuccessMessage("Medicine added successfully!");
          clearForm(); // Clear the form fields
        } else {
          setSuccessMessage("Failed to add medicine. Please try again.");
        }
      } catch (error) {
        console.error("Error adding medicine:", error);
      }
    } else {
      setSuccessMessage("");
    }
  };

  const handleSupplierInputChange = (event) => {
    const value = event.target.value;
    setSuppliersName(value);
    setShowSupplierSuggestions(true);
  };

  const handleAddSupplierClick = () => {
    setShowAddSupplierForm(true);
  };

  const clearForm = () => {
    setMedicineName("");
    setGenericName("");
    setSuppliersName("");
    setDate("");
    setExpireDate("");
    setQuantity("");
    setPrice("");
  };

  if (showAddSupplierForm) {
    return <AddSupplier />;
  }

  return (
    <div className="addmedicinecontainer">
      <div className="container">
        <h1>
          <img src={medicine} className="dashboard-icon" alt="" />
          Add New Medicine
        </h1>

        <div className="row">
          <div className="col col-md-8 form-group">
            <label className="font-weight-bold" htmlFor="medicine_name">
              Medicine Name :
            </label>
            <input
              type="text"
              className="form-control"
              id="medicine_name"
              placeholder="Medicine Name"
              onBlur={(e) => setMedicineName(e.target.value)}
            />
            <code
              id="medicine_name_error"
              className="text-danger small font-weight-bold float-right"
              style={{ display: "none" }}
            ></code>
          </div>
        </div>

        <div className="row">
          <div className="col col-md-12 form-group">
            <label className="font-weight-bold" htmlFor="generic_name">
              Generic Name :
            </label>
            <input
              type="text"
              className="form-control"
              id="generic_name"
              placeholder="Generic Name"
              onBlur={(e) => setGenericName(e.target.value)}
            />
            <code
              id="generic_name_error"
              className="text-danger small font-weight-bold float-right"
              style={{ display: "none" }}
            ></code>
          </div>
        </div>

        <div className="row">
          <div className="col col-md-12 form-group">
            <label className="font-weight-bold" htmlFor="suppliers_name">
              Supplier:
            </label>
            <div>
              <input
                id="suppliers_name"
                type="text"
                className="form-control"
                placeholder="Supplier Name"
                name="suppliers_name"
                value={suppliersName}
                onChange={handleSupplierInputChange}
              />
              <code
                id="supplier_name_error"
                className="text-danger small font-weight-bold float-right"
                style={{ display: "none" }}
              ></code>
            </div>
            {showSupplierSuggestions && (
              <div
                className="list-group position-fixed"
                style={{
                  zIndex: 1,
                  width: "35.80%",
                  overflow: "auto",
                  maxHeight: "200px",
                }}
              >
                {/* Render supplier suggestions here */}
              </div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col col-md-12 form-group">
            <label className="font-weight-bold" htmlFor="date">
              Date:
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col col-md-12 form-group">
            <label className="font-weight-bold" htmlFor="expire-date">
              Expire Date:
            </label>
            <input
              type="date"
              className="form-control"
              id="expire-date"
              value={expireDate}
              onChange={(e) => setExpireDate(e.target.value)}
            />
            <code
              className="text-danger small font-weight-bold float-right"
              style={{ display: "none" }}
            ></code>
          </div>
        </div>

        <div className="row">
          <div className="col col-md-12 form-group">
            <label className="font-weight-bold" htmlFor="quantity">
              Quantity:
            </label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col col-md-12 form-group">
            <label className="font-weight-bold" htmlFor="price">
              Price:
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <code
              className="text-danger small font-weight-bold float-right"
              style={{ display: "none" }}
            ></code>
          </div>
        </div>

        <div className="row">
          <div
            className="col col-md-5 font-weight-bold"
            style={{ color: "green", cursor: "pointer" }}
            onClick={() => handleAddSupplierClick(true)}
          >
            <i className="fa fa-plus"></i>Add New Supplier
          </div>
        </div>
        <hr />

        <div className="row">
          <div className="form-group m-auto">
            <button
              className="btn btn-primary form-control"
              onClick={addMedicine}
            >
              ADD
            </button>
          </div>
        </div>

        <div
          id="medicine_acknowledgement"
          className="col-md-12 h5 text-success font-weight-bold text-center"
          style={{ fontFamily: "sans-serif" }}
        >
          {successMessage}
        </div>
      </div>
    </div>
  );
};
export default AddMedicine;
