import React, { useEffect, useState } from "react";
import axios from "axios"; 
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskReport = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  
  const fetchProjects = async () => {
    try {
      const response = await axios.get('  https://of-management-backend-4.onrender.com/api/projectreports'); // Update the URL as per your setup
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

  const generateReport = (project) => {
    setSelectedProject(project);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProject(null);
  };

  const handlePrint = () => {
    
    console.log(`Printing report for ${selectedProject.name}`);
    toast.success(`Report printed for ${selectedProject.name}`);
    handleCloseDialog();
  };
 
  return (
    <>
      
      <div className="flex-1 ml-[70px] mt-24 max-w-4xl p-6 bg-slate-300 shadow-2xl absolute">
        <h2 className="text-2xl font-bold mb-4 text-center">Project Reports</h2>
    
        <div className="relative mb-4 flex">
          <input
            type="text"
            placeholder="Search projects..."
            className="border border-gray-300 rounded-lg p-2 pl-10 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">S.No</th> {/* S.No Column */}
                <th className="py-3 px-6 text-left">Project Name</th>
                <th className="py-3 px-6 text-left">Deadline</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {projects
                .filter(project => project.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((project, index) => ( 
                  <tr key={project._id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6">{index + 1}</td> 
                    <td className="py-3 px-6">{project.name}</td>
                    <td className="py-3 px-6">{new Date(project.deadline).toLocaleDateString()}</td>
                    <td className="py-3 px-6">{project.status}</td>
                    <td className="py-3 px-6">
                      <button 
                        className="bg-green-300"
                        onClick={() => generateReport(project)}
                      >
                        Generate Report
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dialog for Generating Report */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Generate Reports</DialogTitle>
        <DialogContent>
          {selectedProject && (
            <div>
              <h3 className="font-bold">Project Name: {selectedProject.name}</h3>
              <p>Deadline: {new Date(selectedProject.deadline).toLocaleDateString()}</p>
              <p>Status: {selectedProject.status}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePrint} color="primary">
            Print
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default TaskReport;
