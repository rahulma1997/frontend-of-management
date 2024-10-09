import React, { useState, useEffect } from "react";
import axios from "axios"; 

const ProjectReports = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [name, setName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");
  const [editing, setEditing] = useState(null); 

 
  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://of-management-backend-4.onrender.com/api/projectreports');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      deadline,
      status,
    };

    try {
      if (editing) {
        await axios.put(`https://of-management-backend-4.onrender.com/api/projectreports/${editing}`, formData);
      } else {
        await axios.post('https://of-management-backend-4.onrender.com/api/projectreports', formData);
      }
     
      setName("");
      setDeadline("");
      setStatus("");
      setEditing(null);
      fetchProjects(); 
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };

  const handleEdit = (project) => {
    setName(project.name);
    setDeadline(project.deadline);
    setStatus(project.status);
    setEditing(project._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://of-management-backend-4.onrender.com/api/projectreports/${id}`);
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row ">
        <div className="flex-1 max-w-4xl mx-auto p-6 ml-[200px] bg-slate-300 mt-28 rounded-lg shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 text-center">Project Reports</h2>
          
          {/* Form for adding/updating projects */}
          <form onSubmit={handleSubmit} className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Project Name"
              required
              className="p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
              className="p-2 border border-gray-300 rounded mb-2"
            />
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Status"
              required
              className="p-2 border border-gray-300 rounded mb-2"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              {editing ? "Update" : "Add"} Project
            </button>
          </form>

        
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
                <th className="py-2 px-4 border border-gray-300">Project Name</th>
                <th className="py-2 px-4 border border-gray-300">Deadline</th>
                <th className="py-2 px-4 border border-gray-300">Status</th>
                <th className="py-2 px-4 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {projects
                .filter(project => project.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((project) => (
                  <tr key={project._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border border-gray-300">{project.name}</td>
                    <td className="py-2 px-4 border border-gray-300">{project.deadline}</td>
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
    </>
  );
};

export default ProjectReports;
