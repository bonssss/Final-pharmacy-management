import React, { useState } from "react";
import { Report } from "@mui/icons-material";
// import AddMedicine from "./Medicine/AddMedicine";
// import AddSupplier from "./Supplier/AddSupplier";
import { Link } from "react-router-dom";
// import './home.css'
import dashboard from "../assets/dashboard.png";

import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Settings } from "@mui/icons-material";
import { Medication } from "@mui/icons-material";

import { HomeMaxRounded } from "@mui/icons-material";

function Home() {
  // const data = [
  //   {
  //     name: "Page A",
  //     uv: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: "Page B",
  //     uv: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: "Page C",
  //     uv: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "Page D",
  //     uv: 2780,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: "Page E",
  //     uv: 1890,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: "Page F",
  //     uv: 2390,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: "Page G",
  //     uv: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   },
  // ];

  const [showAddMedicineForm, setShowAddMedicineForm] = useState(false);
  const [showAddSupplierForm, setShowAddSupplierForm] = useState(false);

  // for add medicine
  const handleAddMedicineClick = () => {
    setShowAddMedicineForm(true);
  };

  if (showAddMedicineForm) {
    return <AddMedicine />;
  }

  // for add supplier
  const handleAddSupplierClick = () => {
    setShowAddSupplierForm(true);
  };

  if (showAddSupplierForm) {
    return <AddSupplier />;
  }

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>
          {/* <i className="material-icons">home</i> */}
          <img src={dashboard} className="dashboard-icon" alt="" />
          DASHBOARD
        </h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>Total Pharmacy</h3>
            <Medication className="card_icon" />
          </div>
          <h1>300</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Medicine</h3>
            <Medication className="card_icon" />
          </div>
          <h1>300</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Expires</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>12</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Purchase</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>33</h1>
        </div>
        <div className="card">
          <h3>
            Total Report <Report />
          </h3>
          <div className="card-inner">
            <table border="1px solid black">
              <tbody>
                <tr>
                  <td>TOTAL SALES</td>
                  <td>12</td>
                </tr>
                <tr>
                  <td>TOTAL PURCHASE</td>
                  <td>12</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Supplier</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>33</h1>
        </div>
      </div>

      <hr />

      {/* <div className="main-cards">
        <Link to="/add-medicine" className="card">
          <div className="card-inner">
            <Medication className="card_icon" />
          </div>
          <h4> Add New Medicine</h4>
        </Link>

        <Link to="/add-supplier" className="card">
          <div className="card-inner">
            <BsPeopleFill className="card_icon" />
          </div>
          <h3> Add New Supplier</h3>
        </Link>
        <div className="card">
          <div className="card-inner">
            <BsPeopleFill className="card_icon" />
          </div>
          <h3>Add New Purchaser</h3>
        </div>
      </div>

      <hr /> */}
{/* 
      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>Purchase Report</h3>
            <Report className="card_icon" />
          </div>
          <h1>33</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Sales Report</h3>
            <Report className="card_icon" />
          </div>
          <h1>33</h1>
        </div>
      </div> */}

      {/* <div className='charts'> */}
      {/* <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer> */}

      {/* <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer> */}

      {/* </div>  </div> */}
    </main>
  );
}

export default Home;
