import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Pagination,
} from "@mui/material";

const OverallProject = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [name, setName] = useState("");
  const [progress, setProgress] = useState("");
  const [status, setStatus] = useState("");
  const [totalTasks, setTotalTasks] = useState("");
  const [completedTasks, setCompletedTasks] = useState("");
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("https://of-management-backend-4.onrender.com/api/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      progress: parseInt(progress),
      status,
      totalTasks,
      completedTasks,
    };

    try {
      if (editing) {
        await axios.put(`https://of-management-backend-4.onrender.com/api/projects/${editing}`, formData);
      } else {
        await axios.post("https://of-management-backend-4.onrender.com/api/projects", formData);
      }
      handleClose(); 
      fetchProjects();
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };

  const handleEdit = (project) => {
    setName(project.name);
    setProgress(project.progress);
    setStatus(project.status);
    setTotalTasks(project.totalTasks);
    setCompletedTasks(project.completedTasks);
    setEditing(project._id);
    setOpen(true); 
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://of-management-backend-4.onrender.com/api/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setName("");
    setProgress("");
    setStatus("");
    setTotalTasks("");
    setCompletedTasks("");
    setEditing(null);
    setOpen(false);
  };

 
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  return (
    <div className="flex-1 h-[530px] ml-0 md:ml-[350px] md:mt-20 max-w-full md:max-w-4xl p-4 md:p-6 bg-slate-300 shadow-2xl absolute">
      <h2 className="text-2xl font-bold mb-4 text-center">Project Overview</h2>
      <div className="flex -ml-3 gap-5">
        <input
          type="text"
          placeholder="Search by Project Name or Status"
          className="border border-gray-300 rounded-lg p-2 pl-10 focus:outline-none focus:ring-1 ml-3 focus:ring-blue-500 w-full md:w-[685px] mb-2 md:mb-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Add Project
        </Button>
      </div>
      <div  className="overflow-x-auto mt-3 h-[350px] overflow-auto bg-slate-100">
        <table className="min-w-full bg-white border  border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-gray-200">S.No</th>
              <th className="py-2 px-4 border border-gray-200">Project Name</th>
              <th className="py-2 px-4 border border-gray-200">Overall Progress</th>
              <th className="py-2 px-4 border border-gray-200">Status</th>
              <th className="py-2 px-4 border border-gray-200">Total Tasks</th>
              <th className="py-2 px-4 border border-gray-200">Completed Tasks</th>
              <th className="py-2 px-4 border border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProjects.map((project, index) => (
              <tr key={project._id}>
                <td className="py-2 px-4 border border-gray-200">{index + 1 + indexOfFirstProject}</td>
                <td className="py-2 px-4 border border-gray-200">{project.name}</td>
                <td className="py-2 px-4 border border-gray-200">{project.progress}%</td>
                <td className="py-2 px-4 border border-gray-200">{project.status}</td>
                <td className="py-2 px-4 border border-gray-200">{project.totalTasks}</td>
                <td className="py-2 px-4 border border-gray-200">{project.completedTasks}</td>
                <td className="py-2 px-4 border border-gray-200">
                  <div className="flex">
                    <Button onClick={() => handleEdit(project)} color="primary">
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(project._id)}
                      color="secondary"
                      style={{ marginLeft: '8px' }}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

     

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{editing ? "Edit Project" : "Add Project"}</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                autoFocus
                margin="dense"
                label="Project Name"
                type="text"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <TextField
                margin="dense"
                label="Overall Progress (%)"
                type="number"
                fullWidth
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
                required
              />
              <TextField
                margin="dense"
                label="Status"
                type="text"
                fullWidth
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              />
              <TextField
                margin="dense"
                label="Total Tasks"
                type="number"
                fullWidth
                value={totalTasks}
                onChange={(e) => setTotalTasks(e.target.value)}
                required
              />
              <TextField
                margin="dense"
                label="Completed Tasks"
                type="number"
                fullWidth
                value={completedTasks}
                onChange={(e) => setCompletedTasks(e.target.value)}
                required
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              {editing ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Pagination
          count={totalPages}
          color="primary"
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)} 
          className="mt-4"
        />
    </div>
  );
};

export default OverallProject;
