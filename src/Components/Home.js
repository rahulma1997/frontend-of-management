
// import React from 'react';
// import { Link } from 'react-router-dom';


// function Home() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Header */}
//       <header className="bg-blue-500 text-white py-4 flex justify-between items-center px-6">
//         <h1 className="text-2xl font-bold">Office Management</h1>
//         <div className="flex space-x-4">
//           <Link to="/admin"><span>Admin</span></Link>
//          <Link to="/manager"><span>Project Manager</span></Link>
//          <Link to="employee"><span>Employees</span></Link>
//          <Link to="/teamwork"><span>Team Work</span></Link>
//         </div>
//       </header>
      
    
//       <main
//         className="flex-grow flex items-center justify-center bg-cover bg-center"
//         style={{
//           backgroundImage: "url(https://img.freepik.com/free-vector/office-wallpaper-video-conferencing_23-2148657074.jpg)", 
//           height: '100vh',
//         }}
//       >
//         <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center">
//           <h2 className="text-xl font-semibold mb-4">Office Management System</h2>
//           <p className="mb-4">Welcome to the Office Management System. Manage your projects and tasks efficiently.</p>
//           <div className="animate-pulse">
//             <p className="text-gray-600">Loading... Please wait.</p>
//           </div>
//         </div>
//       </main>

     
//       <footer className="bg-gray-800 text-white py-4 text-center">
//         <p>&copy; 2024 Your Company. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default Home;


import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
    
      <header className="bg-blue-500 text-white py-4 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6">
        <h1 className="text-2xl font-bold text-center sm:text-left">Office Management</h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-2 sm:mt-0">
          <Link to="/admin" className="hover:underline"><span>Admin</span></Link>
          <Link to="/manager" className="hover:underline"><span>Project Manager</span></Link>
          <Link to="/employee" className="hover:underline"><span>Employees</span></Link>
          <Link to="/teamwork" className="hover:underline"><span>Team Work</span></Link>
        </div>
      </header>

      <main
        className="flex-grow flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url(https://img.freepik.com/free-vector/office-wallpaper-video-conferencing_23-2148657074.jpg)", 
          height: '100vh',
        }}
      >
        <div className="bg-white bg-opacity-80 p-6 sm:p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-4">Office Management System</h2>
          <p className="mb-4">Welcome to the Office Management System. Manage your projects and tasks efficiently.</p>
          <div className="animate-pulse">
            <p className="text-gray-600">Loading... Please wait.</p>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
