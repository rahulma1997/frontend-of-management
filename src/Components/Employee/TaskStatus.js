import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import Pagination from "@mui/material/Pagination";

export default function TaskStatus() {
  const [projectname, setProjectname] = useState("");
  const [teamname, setTeamname] = useState("");
  const [progress, setProgress] = useState("");
  const [duedate, setDuedate] = useState("");
  const [status, setStatus] = useState("");
  const [taskStatuses, setTaskStatuses] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [open, setOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);
  
  const fetchTaskStatuses = async () => {
    try {
      const response = await axios.get("https://of-management-backend-4.onrender.com/task-status");
      setTaskStatuses(response.data);
      setFilteredTasks(response.data); 
    } catch (error) {
      console.error("Error fetching task statuses:", error);
    }
  };

  useEffect(() => {
    fetchTaskStatuses();
  }, []);

  useEffect(() => {
    
    const results = taskStatuses.filter(task =>
      task.projectName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(results);
  }, [searchTerm, taskStatuses]);

  const handleClickOpen = (task = null) => {
    if (task) {
      setEditingTaskId(task._id);
      setProjectname(task.projectName);
      setTeamname(task.teamName);
      setProgress(task.progress);
      setDuedate(task.dueDate.split("T")[0]);
      setStatus(task.status);
    } else {
      setEditingTaskId(null);
      setProjectname("");
      setTeamname("");
      setProgress("");
      setDuedate("");
      setStatus("");
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTaskStatus = {
      projectName: projectname,
      teamName: teamname,
      progress: progress,
      dueDate: duedate,
      status: status,
    };

    try {
      if (editingTaskId) {
        await axios.put(`https://of-management-backend-4.onrender.com/task-status/${editingTaskId}`, newTaskStatus);
      } else {
        await axios.post("https://of-management-backend-4.onrender.com/task-status", newTaskStatus);
      }
      fetchTaskStatuses();
      handleClose();
    } catch (error) {
      console.error("Error saving task status:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task status?")) {
      try {
        await axios.delete(`https://of-management-backend-4.onrender.com/task-status/${id}`);
        fetchTaskStatuses();
      } catch (error) {
        console.error("Error deleting task status:", error);
      }
    }
  };

 
  
  const indexOfLastTask = currentPage * tasksPerPage;
const indexOfFirstTask = indexOfLastTask - tasksPerPage;
const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
const handlePageChange = (event, value) => {
  setCurrentPage(value);
};

  return (
    <>
      <div className="flex-1 ml-20 md:ml-[200px] mt-20 md:mt-24 max-w-full md:max-w-4xl p-4 md:p-6 bg-slate-300 shadow-2xl absolute">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Task Status</h2>
        <div className="relative mb-4 flex flex-col md:flex-row">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
            className="border border-gray-300 rounded-lg p-2 pl-10 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full md:w-[620px] mb-2 md:mb-0"
          />
          <div className="mt-2 md:mt-1 flex flex-col md:flex-row space-x-0 md:space-x-6 md:ml-7">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-2 md:mb-0"
              onClick={() => handleClickOpen()}
            >
              Send Project Manager
            </button>
          </div>
        </div>

        {/* Task Status Table */}
        <div className="overflow-x-auto h-80 overflow-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 ">
              <th className="py-2 px-4 border-b border border-gray-300">S.No</th>
                <th className="py-2 px-4 border-b border border-gray-300">Project Name</th>
                <th className="py-2 px-4 border-b border border-gray-300">Team Name</th>
                <th className="py-2 px-4 border-b border border-gray-300">Progress</th>
                <th className="py-2 px-4 border-b border border-gray-300">Due Date</th>
                <th className="py-2 px-4 border-b border border-gray-300">Status</th>
                <th className="py-2 px-4 border-b border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
  {currentTasks.map((task, index) => (
    <tr key={task._id} className="hover:bg-gray-100">
      <td className="py-2 px-4 border-b border border-gray-300">{index + 1 + (currentPage - 1) * tasksPerPage}</td>
      <td className="py-2 px-4 border-b border border-gray-300">{task.projectName}</td>
      <td className="py-2 px-4 border-b border border-gray-300">{task.teamName}</td>
      <td className="py-2 px-4 border-bborder border-gray-300">{task.progress}</td>
      <td className="py-2 px-4 border-b border border-gray-300">{new Date(task.dueDate).toLocaleDateString()}</td>
      <td className="py-2 px-4 border-b border border-gray-300">{task.status}</td>
      <td className="py-2 px-4 border-b border border-gray-300">
        <button className="text-blue-500 hover:text-blue-700 mr-2" onClick={() => handleClickOpen(task)}>
          Edit
        </button>
        <button className="text-red-500 hover:text-red-700" onClick={() => handleDelete(task._id)}>
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>



          </table>
       
        </div>
        <Pagination
  count={Math.ceil(filteredTasks.length / tasksPerPage)}
  page={currentPage}
  onChange={handlePageChange}
  color="secondary"
/>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <div className="flex-grow p-4 bg-gray-100">
          <form className="bg-white rounded-lg shadow-md p-4 w-full md:w-[550px]" onSubmit={handleSubmit}>
            <h2 className="text-xl md:text-2xl font-bold mb-6">
              {editingTaskId ? "Edit Task Status" : "Add Task Status"}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Project Name
              </label>
              <input
                type="text"
                value={projectname}
                onChange={(e) => setProjectname(e.target.value)}
                required
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Team Name
              </label>
              <input
                type="text"
                value={teamname}
                onChange={(e) => setTeamname(e.target.value)}
                required
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Progress
              </label>
              <input
                type="text"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                required
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                value={duedate}
                onChange={(e) => setDuedate(e.target.value)}
                required
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="border border-gray-300 rounded-lg p-2 w-full"
              >
                <option value="">Select Status</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600"
            >
              {editingTaskId ? "Update Task" : "Add Task"}
            </button>
          </form>
        </div>
      </Dialog>
    </>
  );
}
