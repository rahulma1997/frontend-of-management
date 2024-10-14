import React from 'react';

const TeamWork = () => {
  return (
    <div className="min-h-screen bg-cove bg-center" 
      style={{ backgroundImage: "url('https://wallpapers.com/images/hd/teamwork-1920-x-1200-background-alkpsosnirq2h2fy.jpg')" }}>
      
      <header className="bg-blue-500 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">Office Management</h1>
      </header>

      <div className="flex flex-col items-center justify-center p-6 bg-white bg-opacity-80  min-h-[calc(100vh-160px)]">
        <h2 className="text-3xl -mt-5 font-bold mb-6 ">Our Team</h2> 
        
        <div className="grid grid-cols-1 gap-6 mt-10 sm:grid-cols-2 lg:grid-cols-3 ">
          
          <div className="bg-white p-4 rounded-lg shadow-lg transition transform hover:scale-105">
            <h3 className="text-xl font-semibold">Design</h3>
            <p className="mt-2">Designed by <strong>Akshay</strong> and <strong>Bharat</strong></p>
            <p className="text-gray-600">Akshay and Bharat are talented UI/UX designers with a passion for creating user-friendly interfaces using Tailwind CSS and Material UI.</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg transition transform hover:scale-105">
            <h3 className="text-xl font-semibold">Functionality</h3>
            <p className="mt-2">Developed by <strong>Rahul</strong> and <strong>Ashish</strong></p>
            <p className="text-gray-600">Rahul and Ashish are skilled developers who specialize in implementing functionality using React.js.</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg transition transform hover:scale-105">
            <h3 className="text-xl font-semibold">Backend</h3>
            <p className="mt-2">Managed by <strong>Narendra</strong></p>
            <p className="text-gray-600">Narendra is an experienced backend developer who builds backends using Node.js, Express.js, and MongoDB.</p>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white mt-20 py-4 text-center">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default TeamWork;
