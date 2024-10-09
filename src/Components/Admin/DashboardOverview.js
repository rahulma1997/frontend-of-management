// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const DashboardOverview = () => {
//   const [data, setData] = useState({
//     totalProjects: 0,
//     totalUsers: 0,
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const projectResponse = await axios.get('http://localhost:5000/projects/');
//         const userResponse = await axios.get('http://localhost:5000/users/');

//         setData({
//           totalProjects: projectResponse.data.length,
//           totalUsers: userResponse.data.length,
//         });
//       } catch (error) {
//         console.error("Error fetching dashboard data: ", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="p-4 bg-slate-300 md:p-8 absolute shadow-2xl ml-[400px] mt-28">
//       <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
//         <div className="bg-white p-12 rounded-lg shadow-md">
//           <h3 className="text-xl font-semibold">Total Projects</h3>
//           <p className="text-2xl">{data.totalProjects}</p>
//         </div>

//         <div className="bg-white p-12 rounded-lg shadow-md">
//           <h3 className="text-xl font-semibold">Total Users</h3>
//           <p className="text-2xl">{data.totalUsers}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardOverview;

import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardOverview = () => {
  const [data, setData] = useState({
    totalProjects: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectResponse = await axios.get(
          "  https://of-management-backend-4.onrender.com/projects/"
        );
      
        // "http://localhost:5000/projects/"
        const userResponse = await axios.get(
          "  https://of-management-backend-4.onrender.com/users/"
        );

        setData({
          totalProjects: projectResponse.data.length,
          totalUsers: userResponse.data.length,
        });
      } catch (error) {
        console.error("Error fetching dashboard data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex justify-center p-4 bg-slate-300 md:p-8 w-full h-full">
      <div className="shadow-2xl w-full max-w-4xl p-4 md:p-8 bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Dashboard Overview
        </h2>
        <div className="grid grid-cols-1 gap-4 mt-10 sm:grid-cols-2">
          <div className="bg-slate-200 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Total Projects</h3>
            <p className="text-2xl">{data.totalProjects}</p>
          </div>

          <div className="bg-slate-200 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Total Users</h3>
            <p className="text-2xl">{data.totalUsers}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
