import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login"); // Redirect to login after logout
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={handleLogout} style={{ marginTop: "10px", background: "red", color: "white" }}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;




// import React from 'react';
// import { useNavigate } from "react-router-dom";
// import { useEffect } from 'react';
// import './App.css'


// export default function Dashboard() {
//   const navigate = useNavigate();
//   // const user = JSON.parse(localStorage.getItem("user"));

//   // if (!user) {
//   //   navigate("/");
//   // }

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       navigate("/");
//     }
//   }, [navigate]);


//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/");
//   };

//   return (
//     <div className='h-screen flex flex-col items-center justify-center bg-gray-200'>
//       <h1 className='text-3xl font-bold'>welcome to dashboard</h1>
//       <button onClick={handleLogout} className='mt-4 bg-red-500 text-white px-4 py-2 rounded'>
//         logout
//       </button>
//     </div>
//   );

// };