import { Dialog, DialogContent, DialogTitle, Typography, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Manage = () => {
  const [isDialog, setDialog] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://of-management-backend-4.onrender.com/task/');
        setProjects(response.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleClickOpen = (project) => {
    setSelectedProject(project);
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
    setSelectedProject(null);
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

 
  const filteredProjects = projects.filter(project =>
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.assign.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  return (
    <>
      <div className="flex-1 h-[530px] ml-24 mt-20 md:ml-[350px]  md:mt-20 max-w-full md:max-w-4xl p-4 md:p-6 bg-slate-300 shadow-2xl absolute">
        <h2 className="text-2xl font-bold mb-4 text-center">Manage Projects</h2>
        <input
          type="text"
          placeholder="Search by Project Name or Team Name"
          className="border border-gray-300 rounded-lg p-2 pl-10 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full md:w-[845px] mb-2 md:mb-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="overflow-x-auto mt-3 h-[350px] overflow-auto bg-slate-100">
          <table className="min-w-full border border-gray-300">
            <thead>
            <tr className="bg-gray-200">
        <th className="border border-gray-300 text-left px-4 py-2">S.No</th>
        <th className="border border-gray-300 text-left px-4 py-2">Project Name</th>
        <th className="border border-gray-300 text-left px-4 py-2">Assigned By</th>
        <th className="border border-gray-300 text-left px-4 py-2">Status</th>
        <th className="border border-gray-300 text-left px-4 py-2">Due Date</th>
        <th className="border border-gray-300 text-left px-4 py-2">Action</th>
      </tr>
            </thead>
            <tbody>
              {currentProjects.map((project, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border border-gray-300">{index + 1 + indexOfFirstProject}</td>
                  <td className="py-2 px-4 border border-gray-300">{project.projectName}</td>
                  <td className="py-2 px-4 border border-gray-300">{project.assign}</td>
                  <td className="py-2 px-4 border border-gray-300">{project.Status}</td>
                  <td className="py-2 px-4 border border-gray-300">{new Date(project.dueDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      className="px-2 py-1 rounded-full bg-blue-400 text-white hover:bg-blue-600"
                      onClick={() => handleClickOpen(project)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex  mt-4">
          <Pagination
            count={Math.ceil(filteredProjects.length / projectsPerPage)} 
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
        <Dialog open={isDialog} onClose={handleClose} sx={{ maxWidth: '100%' }}>
          <DialogTitle>
            <Typography variant="h5">Project Details</Typography>
          </DialogTitle>
          <DialogContent>
            {selectedProject && (
              <>
                <Typography variant="h6" sx={{ padding: '1px' }}>
                  Name: {selectedProject.projectName}
                </Typography>
                <Typography variant="h6" sx={{ padding: '1px' }}>
                  Assigned By: {selectedProject.assign}
                </Typography>
                <Typography variant="h6" sx={{ padding: '1px' }}>
                  Status: {selectedProject.Status}
                </Typography>
                <Typography variant="h6" sx={{ padding: '1px' }}>
                  Due Date: {new Date(selectedProject.dueDate).toLocaleDateString()}
                </Typography>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Manage;
