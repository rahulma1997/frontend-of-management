import React, { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import Pagination from "@mui/material/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserTable = () => {
  const [open3, setOpen3] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [userData, setUserData] = useState({
    userID: "",
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    address: "",
    mobile: "",
    role: "",
    joiningDate: "",
    status: "",
    profilePicture: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  const handleClickOpen3 = () => {
    setUserData({
      userID: "",
      firstName: "",
      lastName: "",
      password: "",
      email: "",
      address: "",
      mobile: "",
      role: "",
      joiningDate: "",
      status: "",
      profilePicture: "",
    });
    setIsEdit(false);
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("  https://of-management-backend-4.onrender.com/users/");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const UserForm = async (e) => {
    e.preventDefault();
    const userformData = { ...userData };

    try {
      if (isEdit) {
        await axios.put(
          `  https://of-management-backend-4.onrender.com/users/userID/${userformData.userID}`,
          userformData
        );
        toast.success("User Data updated successfully!");
      } else {
        await axios.post("  https://of-management-backend-4.onrender.com/users/", userformData);
      }
      fetchUsers();
      handleClose3();
      toast.success("User added successfully!");
    } catch (error) {
      console.error("Error submitting data: ", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const editUser = (user) => {
    setUserData(user);
    setIsEdit(true);
    setOpen3(true);
  };

  const deleteUser = async (userID) => {
    try {
      await axios.delete(`  https://of-management-backend-4.onrender.com/users/userID/${userID}`);
      fetchUsers();
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user: ", error);
      toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      user.userID.toString().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const currentItems = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <>
      <div className="flex">
        <div className="flex-1  ml-[20px] mt-24 max-w-4xl p-6 bg-slate-300 shadow-2xl absolute">
          <h2 className="text-2xl font-bold mb-4 text-center">User List</h2>

          <div className="relative mb-4 flex">
            <input
              type="text"
              placeholder="Search users..."
              className="border border-gray-300 rounded-lg p-2 pl-10 focus:outline-none focus:ring-1 focus:ring-blue-500 w-[666px]"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <div className="mt-1 flex space-x-6 ml-7">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={handleClickOpen3}
              >
                Add New User
              </button>
            </div>
          </div>

          <div className="overflow-x-auto  h-72 overflow-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">
                    S.No.
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    User ID
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    First Name
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Last Name
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Email
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Phone Number
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Designation/Role
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Joining Date
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Status
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Profile Picture
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Address
                  </th>
                  <th className="border border-gray-300 p-2 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((user, index) => (
                  <tr key={user.userID} className="bg-slate-100">
                    <td className="border border-gray-300 p-2">
                      {(currentPage - 1) * pageSize + index + 1}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {user.userID}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {user.firstName}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {user.lastName}
                    </td>
                    <td className="border border-gray-300 p-2">{user.email}</td>
                    <td className="border border-gray-300 p-2">
                      {user.mobile}
                    </td>
                    <td className="border border-gray-300 p-2">{user.role}</td>
                    <td className="border border-gray-300 p-2">
                      {new Date(user.joiningDate).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {user.status}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {user.profilePicture && (
                        <img
                          src={user.profilePicture}
                          alt="Profile"
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {user.address}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() => editUser(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:underline ml-2"
                        onClick={() => deleteUser(user.userID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex  mt-4">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
              color="secondary"
            />
          </div>
        </div>
      </div>

      <Dialog open={open3} onClose={handleClose3}>
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2 text-center">
            {isEdit ? "Edit User" : "Add New User"}
          </h2>
          <form onSubmit={UserForm}>
            <div className="mb-2">
              <label className="block mb-1">User ID:</label>
              <input
                type="text"
                value={userData.userID}
                onChange={(e) =>
                  setUserData({ ...userData, userID: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
                readOnly={isEdit}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-1">
              <div>
                <label className="block mb-1">First Name:</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={userData.firstName}
                  onChange={(e) =>
                    setUserData({ ...userData, firstName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-1">Last Name:</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={userData.lastName}
                  onChange={(e) =>
                    setUserData({ ...userData, lastName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-1">
              <div className="mb-1">
                <label className="block mb-1">Password:</label>
                <input
                  type="password"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
              </div>
              <div className="mb-1">
                <label className="block mb-1">Email Address:</label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-1">
              <div className="mb-1">
                <label className="block mb-1">Phone Number:</label>
                <input
                  type="tel"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={userData.mobile}
                  onChange={(e) =>
                    setUserData({ ...userData, mobile: e.target.value })
                  }
                />
              </div>
              <div className="mb-1">
                <label className="block mb-1">Designation/Role:</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={userData.role}
                  onChange={(e) =>
                    setUserData({ ...userData, role: e.target.value })
                  }
                >
                  <option disabled>Select Option</option>
                  <option>Software Engineer</option>
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>Full Stack Developer</option>
                  <option>Quality Assurance Engineer</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-1">
              <div className="mb-1">
                <label className="block mb-1">Joining Date:</label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={userData.joiningDate}
                  onChange={(e) =>
                    setUserData({ ...userData, joiningDate: e.target.value })
                  }
                />
              </div>
              <div className="mb-1">
                <label className="block mb-1">Status:</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={userData.status}
                  onChange={(e) =>
                    setUserData({ ...userData, status: e.target.value })
                  }
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            <div className="mb-1">
              <label className="block mb-1">Profile Picture:</label>
              <input
                type="file"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={(e) =>
                  setUserData({ ...userData, profilePicture: e.target.value })
                }
              />
            </div>
            <div className="mb-1">
              <label className="block mb-1">Address:</label>
              <input
                type="text"
                placeholder="Street"
                className="w-full p-2 border border-gray-300 rounded mb-2"
                value={userData.address}
                onChange={(e) =>
                  setUserData({ ...userData, address: e.target.value })
                }
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {isEdit ? "Update" : "Submit"}
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={handleClose3}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Dialog>

      <ToastContainer />
    </>
  );
};

export default UserTable;
