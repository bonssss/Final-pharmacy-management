import React, { useState } from "react";
import "./supplier.css";
import addsupplier from '../../assets/supplier.png';

const AddSupplier = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactNumberError, setContactNumberError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateName = (value) => {
    if (!value) {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const validateContactNumber = (value) => {
    const numericRegex = /^\d+$/;
    if (!value) {
      setContactNumberError("Contact number is required");
    } else if (!numericRegex.test(value)) {
      setContactNumberError("Invalid contact number");
    } else {
      setContactNumberError("");
    }
  };

  const validateAddress = (value) => {
    if (!value) {
      setAddressError("Address is required");
    } else {
      setAddressError("");
    }
  };

  const addSupplier = async () => {
    validateName(name);
    validateEmail(email);
    validateContactNumber(contactNumber);
    validateAddress(address);

    if (
      name &&
      email &&
      contactNumber &&
      address &&
      !nameError &&
      !emailError &&
      !contactNumberError &&
      !addressError
    ) {
      try {
        const response = await fetch("http://localhost:5000/api/supplier/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pharmacyId:localStorage.getItem("pharmacyId"),
            name,
            email,
            contactNumber,
            address,
          }),
        });

        if (response.ok) {
          setSuccessMessage("Supplier added successfully!");
          // Clear form data
          setName("");
          setEmail("");
          setContactNumber("");
          setAddress("");
        } else {
          console.error("Failed to add supplier. Please try again.");
          setSuccessMessage("Failed to add supplier. Please try again.");
        }
      } catch (error) {
        console.error("Error adding supplier:", error);
        setSuccessMessage("Error adding supplier. Please try again.");
      }
    } else {
      setSuccessMessage("Invalid input. Please check the form.");
    }
  };

  return (
    <div className="addsuppliercontainer">
      <div className="container">
        <h1>
          <img src={addsupplier} className="dashboard-icon" alt="" /> Add New
          Supplier
        </h1>
        <div className="row col-md-12">
          <div className="col-md-12 form-group">
            <label className="font-weight-bold" htmlFor="supplier_name">
              Supplier Name:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              id="supplier_name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => validateName(name)}
            />
            <code className="text-danger small font-weight-bold float-right">
              {nameError}
            </code>
          </div>
        </div>

        <div className="row col-md-12">
          <div className="col-md-12 form-group">
            <label className="font-weight-bold" htmlFor="supplier_email">
              Supplier Email:
            </label>
            <input
              type="email"
              autoComplete="off"
              className="form-control"
              placeholder="Email"
              id="supplier_email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateEmail(email)}
            />
            <code className="text-danger small font-weight-bold float-right">
              {emailError}
            </code>
          </div>
        </div>

        <div className="row col-md-12">
          <div className="col-md-12 form-group">
            <label
              className="font-weight-bold"
              htmlFor="supplier_contact_number"
            >
              Supplier Contact Number:
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Contact Number"
              id="supplier_contact_number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              onBlur={() => validateContactNumber(contactNumber)}
            />
            <code className="text-danger small font-weight-bold float-right">
              {contactNumberError}
            </code>
          </div>
        </div>

        <div className="row col-md-12">
          <div className="col-md-12 form-group">
            <label className="font-weight-bold" htmlFor="supplier_address">
              Supplier Address:
            </label>
            <textarea
              className="form-control"
              placeholder="Address"
              id="supplier_address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onBlur={() => validateAddress(address)}
            />
            <code className="text-danger small font-weight-bold float-right">
              {addressError}
            </code>
          </div>
        </div>

        <div className="col-md-12">
          <hr
            className="col-md-12 float-left"
            style={{
              padding: "0px",
              width: "95%",
              borderTop: "2px solid #02b6ff",
            }}
          />
        </div>

        <div className="row col-md-12">
          <div className="form-group m-auto">
            <button
              className="btn btn-primary form-control"
              onClick={addSupplier}
            >
              ADD
            </button>
          </div>
        </div>

        <div
          id="supplier_acknowledgement"
          className="col-md-12 h5 text-success font-weight-bold text-center"
          style={{ fontFamily: "sans-serif" }}
        >
          {successMessage}
        </div>
      </div>
    </div>
  );
};

export default AddSupplier;
