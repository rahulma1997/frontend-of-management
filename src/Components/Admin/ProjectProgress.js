import React, { useState, useEffect } from "react";
import axios from "axios"; 
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProjectProgress = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    totalTasks: '',
    completedTasks: '',
    progress: '',
    status: ''
  });
  const [openDialog, setOpenDialog] = useState(false);
 
  const fetchProjects = async () => {
    try {
      const response = await axios.get('  https://of-management-backend-4.onrender.com/api/projects');
      setProjects(response.data);
      
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEditChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (project) => {
    setEditingProject(project._id);
    setFormData({
      name: project.name,
      totalTasks: project.totalTasks,
      completedTasks: project.completedTasks,
      progress: project.progress,
      status: project.status,
    });
    setOpenDialog(true); 
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`  https://of-management-backend-4.onrender.com/api/projects/${editingProject}`, formData);
      setOpenDialog(false); 
      setEditingProject(null);
      setFormData({ name: '', totalTasks: '', completedTasks: '', progress: '', status: '' });
      fetchProjects();
      toast.success("Project Progress Updated successfully!");
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`  https://of-management-backend-4.onrender.com/api/projects/${id}`);
      fetchProjects();
      toast.success("Project Progress deleted successfully!");
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 max-w-4xl mx-auto p-6 ml-[200px] bg-slate-300 mt-28 rounded-lg shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Project Progress</h2>
          
        
          <div className="relative mb-4 flex">
            <input
              type="text"
              placeholder="Search projects..."
              className="border border-gray-300 rounded-lg p-2 pl-10 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

        

          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border border-gray-300">S.No</th>
                <th className="py-2 px-4 border border-gray-300">Project Name</th>
                <th className="py-2 px-4 border border-gray-300">Total Tasks</th>
                <th className="py-2 px-4 border border-gray-300">Completed Tasks</th>
                <th className="py-2 px-4 border border-gray-300">Overall Progress</th>
                <th className="py-2 px-4 border border-gray-300">Status</th>
                <th className="py-2 px-4 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects
                .filter(project => project.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((project, index) => (
                  <tr key={project._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border border-gray-300">{index + 1}</td> {/* Serial Number */}
                    <td className="py-2 px-4 border border-gray-300">{project.name}</td>
                    <td className="py-2 px-4 border border-gray-300">{project.totalTasks}</td>
                    <td className="py-2 px-4 border border-gray-300">{project.completedTasks}</td>
                    <td className="py-2 px-4 border border-gray-300">{project.progress}%</td>
                    <td className="py-2 px-4 border border-gray-300">{project.status}</td>
                    <td className="py-2 px-4 border border-gray-300">
                      <button onClick={() => handleEdit(project)} className="text-blue-500">Edit</button>
                      <button onClick={() => handleDelete(project._id)} className="text-red-500 ml-2">Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Project Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Project</DialogTitle>
        <DialogContent>
          <form onSubmit={handleUpdate} className="flex flex-col">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleEditChange}
              placeholder="Project Name"
              required
              className="p-2 border border-gray-300 rounded mb-2 w-full"
            />
            <input
              type="number"
              name="totalTasks"
              value={formData.totalTasks}
              onChange={handleEditChange}
              placeholder="Total Tasks"
              required
              className="p-2 border border-gray-300 rounded mb-2 w-full"
            />
            <input
              type="number"
              name="completedTasks"
              value={formData.completedTasks}
              onChange={handleEditChange}
              placeholder="Completed Tasks"
              required
              className="p-2 border border-gray-300 rounded mb-2 w-full"
            />
            <input
              type="number"
              name="progress"
              value={formData.progress}
              onChange={handleEditChange}
              placeholder="Overall Progress"
              required
              className="p-2 border border-gray-300 rounded mb-2 w-full"
            />
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleEditChange}
              placeholder="Status"
              required
              className="p-2 border border-gray-300 rounded mb-2 w-full"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Update Project
            </button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </>
  );
};

export default ProjectProgress;
