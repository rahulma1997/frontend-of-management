import React, { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import Pagination from "@mui/material/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProjectTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [projectname, setProjectname] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [projectmanager, setProjectmanager] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  // Assign project manager
  const [managerprojectassign, setManagerprojectassign] = useState("");
  const [managerprojectname, setManagerprojectname] = useState("");
  const [managerstatus, setManagerstatus] = useState("");
  const [managerduedate, setManagerduedate] = useState("");
  // ASsign End
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [open, setOpen] = useState(false);
  const [editProjectId, setEditProjectId] = useState(null);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const fetchProject = async () => {
    try {
      const response = await axios.get(
        "  https://of-management-backend-4.onrender.com/projects/"
      );
      const projecttable = response.data.map((project) => ({
        ...project,
        id: project._id,
      }));
      setItems(projecttable);
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  };

  const projectadd = async (e) => {
    e.preventDefault();

    const projectformData = {
      projectName: projectname,
      description,
      budget,
      startDate: startdate,
      endDate: enddate,
      projectManager: projectmanager,
      priority,
      status,
    };

    try {
      await axios.post(
        "  https://of-management-backend-4.onrender.com/projects/",
        projectformData
      );
      fetchProject();
      handleClose();
      toast.success("Project added successfully!");
    } catch (error) {
      console.error("Error adding project: ", error);
      toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  const updateProject = async (e) => {
    e.preventDefault();

    const updatedProjectData = {
      projectName: projectname,
      description,
      budget,
      startDate: startdate,
      endDate: enddate,
      projectManager: projectmanager,
      priority,
      status,
    };

    try {
      await axios.put(
        `  https://of-management-backend-4.onrender.com/projects/${editProjectId}`,
        updatedProjectData
      );
      fetchProject();
      handleClose();
      toast.success("Project updated successfully!");
    } catch (error) {
      console.error("Error updating project: ", error);
      toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(
        `  https://of-management-backend-4.onrender.com/projects/${id}`
      );
      fetchProject();
      toast.success("Project deleted successfully!");
    } catch (error) {
      console.error("Error deleting project: ", error);
      toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  const resetForm = () => {
    setProjectname("");
    setDescription("");
    setBudget("");
    setStartdate("");
    setEnddate("");
    setProjectmanager("");
    setPriority("");
    setStatus("");
    setEditProjectId(null);
  };

  useEffect(() => {
    fetchProject();
  }, []);

  const filteredItems = items.filter((project, index) => {
    const sNo = index + 1 + (currentPage - 1) * pageSize;
    return (
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sNo.toString().includes(searchTerm)
    );
  });

  const totalPages = Math.ceil(filteredItems.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentItems = filteredItems.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  //Project Manager

  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  // Assign Project manager
  const AssignProject = async (e) => {
    e.preventDefault();
    setManagerprojectassign("");
    setManagerprojectname("");
    setManagerstatus("");
    setManagerduedate("");

    const AssignAdmin = {
      projectName: managerprojectname,
      Status: managerstatus,
      dueDate: managerduedate,
      assign: managerprojectassign,
    };

    console.log("Project Data:", AssignAdmin);
    // Assign project manager End

    try {
      await axios.post(
        "  https://of-management-backend-4.onrender.com/task/add",
        AssignAdmin
      );
      handleClose1();
      toast.success("Project manager assigned successfully!");
    } catch (error) {
      console.error("Error submitting data: ", error);
      toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <>
      <div className="flex-1 ml-0 md:ml-[200px] mt-6 md:mt-24 max-w-full md:max-w-4xl p-4 md:p-6 bg-slate-300 shadow-2xl absolute">
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Project Management Section
        </h2>
        <div className="relative mb-4 flex flex-col md:flex-row">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 pl-10 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full md:w-[430px] mb-2 md:mb-0"
          />
          <div className="mt-2 md:mt-1 flex flex-col md:flex-row space-x-0 md:space-x-6 md:ml-7">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-2 md:mb-0"
              onClick={handleClickOpen}
            >
              Add New Project
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={handleClickOpen1}
            >
              Assign Project Manager
            </button>
          </div>
        </div>

        <div className="overflow-x-auto h-72 overflow-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                  S.No
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                  Project Name
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                  Description
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                  Start Date
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                  End Date
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                  Project Manager
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                  Status
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                  Budget
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                  Priority
                </th>
                <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((project, index) => (
                <tr key={project.id}>
                  <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500 border border-gray-300">
                    {startIndex + index + 1}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 border border-gray-300">
                    {project.projectName}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 border border-gray-300">
                    {project.description}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 border border-gray-300">
                    {project.startDate}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 border border-gray-300">
                    {project.endDate}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 border border-gray-300">
                    {project.projectManager}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 border border-gray-300">
                    {project.status}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 border border-gray-300">
                    {project.budget}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 border border-gray-300">
                    {project.priority}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 border border-gray-300">
                    <button
                      className="text-blue-500"
                      onClick={() => {
                        setEditProjectId(project.id);
                        setProjectname(project.projectName);
                        setDescription(project.description);
                        setBudget(project.budget);
                        setStartdate(project.startDate.split("T")[0]);
                        setEnddate(project.endDate.split("T")[0]);
                        setProjectmanager(project.projectManager);
                        setPriority(project.priority);
                        setStatus(project.status);
                        handleClickOpen();
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 ml-2"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this project?"
                          )
                        ) {
                          deleteProject(project.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          count={totalPages}
          color="secondary"
          className="mt-5"
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>

      <Dialog open={open} onClose={handleClose}>
        <div className="flex-grow p-4 bg-gray-100">
          <form
            onSubmit={editProjectId ? updateProject : projectadd}
            className="bg-white rounded-lg shadow-md p-4 w-full md:w-[550px]"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-6">
              {editProjectId ? "Edit Project" : "Add New Project"}
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
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                value={startdate}
                onChange={(e) => setStartdate(e.target.value)}
                required
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                value={enddate}
                onChange={(e) => setEnddate(e.target.value)}
                required
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Project Manager
              </label>
              <input
                type="text"
                value={projectmanager}
                onChange={(e) => setProjectmanager(e.target.value)}
                required
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Budget
              </label>
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                required
                className="border border-gray-300 rounded-lg p-2 w-full"
              >
                <option value="">Select Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
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
                <option value="On Hold">On Hold</option>
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white p-2 rounded-lg w-full hover:bg-blue-600"
            >
              {editProjectId ? "Update Project" : "Add Project"}
            </button>
          </form>
        </div>
      </Dialog>

      {/* Assign Project Manager Dialog Box */}

      <Dialog open={open1} onClose={handleClose1}>
        <div className="flex flex-col items-center p-4">
          <h2 className="text-xl font-bold mb-4">Assign Project Manager</h2>
          <form onSubmit={AssignProject} className="w-full md:w-[450px]">
            <div>
              <label className="block text-sm font-medium mb-1">
                Assign To
              </label>
              <input
                type="text"
                value={managerprojectassign}
                onChange={(e) => setManagerprojectassign(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Project Name
              </label>
              <input
                type="text"
                value={managerprojectname}
                onChange={(e) => setManagerprojectname(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={managerstatus}
                onChange={(e) => setManagerstatus(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Active</option>
                <option>Unactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input
                type="date"
                value={managerduedate}
                onChange={(e) => setManagerduedate(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 mt-4 w-full"
            >
              Assign
            </button>
          </form>
        </div>
      </Dialog>

      <ToastContainer />
    </>
  );
};

export default ProjectTable;
