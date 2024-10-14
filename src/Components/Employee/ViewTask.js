import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from '@mui/material/Pagination';

const ViewTask = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "https://of-management-backend-4.onrender.com/tasks/manager/assigned"
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(task =>
    task.projectname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalTasks = filteredTasks.length;
  const totalPages = Math.ceil(totalTasks / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const currentTasks = filteredTasks.slice(startIndex, startIndex + tasksPerPage);

  const handlePageChange = ( value) => {
    setCurrentPage(value);
  };

  return (
    <div className="flex-1 mt-24 ml-20 md:ml-[300px] text-black max-w-full md:max-w-4xl p-4 md:p-6 shadow-2xl absolute bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 p-2 rounded">Assigned Tasks</h1>
      <div className="mb-5">
      <input
        type="text"
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 pl-10 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full md:w-[848px] mb-2 md:mb-0"
      />
      </div>
      <div className="overflow-x-auto h-72 overflow-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b">S.No</th>
              <th className="py-2 px-4 border-b border border-gray-300">Project Name</th>
              <th className="py-2 px-4 border-b border border-gray-300">Assigned To</th>
              <th className="py-2 px-4 border-b border border-gray-300">Description</th>
              <th className="py-2 px-4 border-b">Due Date</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task, index) => (
              <tr key={task._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b border border-gray-300">{startIndex + index + 1}</td>
                <td className="py-2 px-4 border-b border border-gray-300">{task.projectname}</td>
                <td className="py-2 px-4 border-b border border-gray-300">{task.assignedTo}</td>
                <td className="py-2 px-4 border-b border border-gray-300">{task.description}</td>
                <td className="py-2 px-4 border-b border border-gray-300">
                  {new Date(task.dueDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="secondary"
        className="mt-4"
      />
    </div>
  );
};

export default ViewTask;
