import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  DialogActions,
  Button,
  Pagination,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProjectStatus = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newDeadline, setNewDeadline] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialog, setDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("https://of-management-backend-4.onrender.com/task-status");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleOpenDialog = (task) => {
    setEditingTaskId(task._id);
    setNewDeadline(task.dueDate);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingTaskId(null);
    setNewDeadline('');
  };

  const handleClickOpen = (project) => {
    setSelectedProject(project);
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };

  const handleUpdateDeadline = async () => {
    if (!editingTaskId) {
      console.error("Editing Task ID is not set");
      return;
    }

    try {
      const newTaskStatus = { dueDate: newDeadline };
      await axios.put(`https://of-management-backend-4.onrender.com/task-status/${editingTaskId}`, newTaskStatus);
      const updatedTasksResponse = await axios.get("https://of-management-backend-4.onrender.com/task-status");
      setTasks(updatedTasksResponse.data);
      handleCloseDialog();
    } catch (error) {
      console.error("Error updating deadline:", error);
    }
  };

  const handlePrint = () => {
    toast.success(`Report printed for ${selectedProject.projectName}`);
    setDialog(false);
  };

  // Filter tasks based on search term
  const filteredTasks = tasks.filter(task =>
    task.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.teamName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the current tasks to display
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex-1 h-[530px] ml-0 md:ml-[350px]  md:mt-20 max-w-full md:max-w-4xl p-4 md:p-6 bg-slate-300 shadow-2xl absolute">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Project Status / Deadlines / Reports</h2>
      <input
        type="text"
        placeholder="Search by Project Name or Team Name"
        className="border border-gray-300 rounded-lg p-2 pl-10 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full md:w-[845px] mb-2 md:mb-0"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="overflow-x-auto mt-3 h-[350px] overflow-auto bg-slate-100">
        <table className="min-w-full  border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">S.No</th>
              <th className="border border-gray-300 px-4 py-2">Project Name</th>
              <th className="border border-gray-300 px-4 py-2">Team Name</th>
              <th className="border border-gray-300 px-4 py-2">Progress</th>
              <th className="border border-gray-300 px-4 py-2">Due Date</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border flex border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentTasks.map((task, index) => (
              <tr key={task._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{indexOfFirstTask + index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{task.projectName}</td>
                <td className="border border-gray-300 px-4 py-2">{task.teamName}</td>
                <td className="border border-gray-300 px-4 py-2">{task.progress}%</td>
                <td className="border border-gray-300 px-4 py-2">{task.dueDate}</td>
                <td className="border border-gray-300 px-4 py-2">{task.status}</td>
                <td className="border flex border-gray-300 px-4 py-2">
                  <button onClick={() => handleOpenDialog(task)} className="text-blue-600">Update Deadline</button>
                  <button onClick={() => handleClickOpen(task)} className="text-blue-600">Generate Reports</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isDialogOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
            <div className="bg-white p-5 rounded shadow-md">
              <h2 className="text-lg font-semibold mb-4">Update Deadline</h2>
              <input
                type="date"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
                className="border border-gray-300 p-2 mb-4 w-full"
              />
              <div className="flex justify-end">
                <button onClick={handleUpdateDeadline} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Update</button>
                <button onClick={handleCloseDialog} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
              </div>
            </div>
          </div>
        )}

        <Dialog open={isDialog} onClose={handleClose} sx={{ maxWidth: '100%' }}>
          <DialogTitle>
            <Typography variant="h5">Generate progress reports</Typography>
          </DialogTitle>
          <DialogContent>
            {selectedProject && (
              <>
                <Typography variant="h6" sx={{ padding: '1px' }}>
                  Project Name: {selectedProject.projectName}
                </Typography>
                <Typography variant="h6" sx={{ padding: '1px' }}>
                  Team Name: {selectedProject.teamName}
                </Typography>
                <Typography variant="h6" sx={{ padding: '1px' }}>
                  Progress: {selectedProject.progress}%
                </Typography>
                <Typography variant="h6" sx={{ padding: '1px' }}>
                  Due Date: {new Date(selectedProject.dueDate).toLocaleDateString()}
                </Typography>
                <Typography variant="h6" sx={{ padding: '1px' }}>
                  Status: {selectedProject.status}
                </Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handlePrint} color="primary">
              Print
            </Button>
          </DialogActions>
        </Dialog>

        <ToastContainer />
      </div>

      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, value) => setCurrentPage(value)}
        color="primary"
        sx={{ mt: 1, display: 'flex',  }}
      />
    </div>
  );
};

export default ProjectStatus;
