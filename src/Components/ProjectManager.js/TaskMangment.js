import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  MenuItem,
  Pagination,
} from "@mui/material";
import axios from "axios";

const TaskManagement = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); 
  const [tasksPerPage] = useState(10); 

  // State variables for task fields
  const [taskName, setTaskName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [priorityLevel, setPriorityLevel] = useState("");
  const [status, setStatus] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetFields();
  };

  const resetFields = () => {
    setTaskName("");
    setAssignedTo("");
    setDueDate("");
    setDescription("");
    setPriorityLevel("");
    setStatus("");
    setSelectedTaskId("");
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "https://of-management-backend-4.onrender.com/tasks/manager/get"
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleTaskCreateOrEdit = async () => {
    const taskData = {
      taskName,
      assignedTo,
      dueTo: dueDate,
      description,
      priorityLevel,
      status,
    };

    if (selectedTaskId) {
      
      try {
        const response = await axios.put(
          `https://of-management-backend-4.onrender.com/tasks/manager/${selectedTaskId}`,
          taskData
        );
        setTasks(
          tasks.map((task) =>
            task._id === selectedTaskId ? response.data : task
          )
        );
      } catch (error) {
        console.error("Error updating task:", error);
      }
    } else {
     
      try {
        const response = await axios.post(
          "https://of-management-backend-4.onrender.com/tasks/manager/create",
          taskData
        );
        setTasks([...tasks, response.data]);
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
    handleClose();
  };

  const handleEditTask = (task) => {
    setSelectedTaskId(task._id);
    setTaskName(task.taskName);
    setAssignedTo(task.assignedTo);
    setDueDate(task.dueTo);
    setDescription(task.description);
    setPriorityLevel(task.priorityLevel);
    setStatus(task.status);
    handleClickOpen();
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`https://of-management-backend-4.onrender.com/tasks/manager/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleTaskCreateOrEdit();
  };

  const [assignemployee, setAssignemployee] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [descriptionemployee, setDescriptionemployee] = useState("");
  const [dueDateemployee, setDueDateemployee] = useState("");
  const [Assinopen, setAssinopen] = useState(false);

  const Assinhandalonclick = () => {
    setAssinopen(true);
  };

  const Assinonclosehandal = () => {
    setAssinopen(false);
  };

  const handleAssignTask = async (e) => {
    e.preventDefault();

    const taskData = {
      projectname: assignemployee,
      assignedTo: assignTo,
      description: descriptionemployee,
      dueDate: dueDateemployee,
    };

    try {
      const response = await axios.post(
        "https://of-management-backend-4.onrender.com/tasks/manager/Assign",
        taskData
      );
      console.log("Task assigned successfully:", response.data);
      Assinonclosehandal();
    } catch (error) {
      console.error("Error assigning task:", error);
      alert("Failed to assign task. Please try again.");
    }
  };

 
  const filteredTasks = tasks.filter((task) =>
    task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  return (
    <>
      <div className="flex-1 h-[500px] md:ml-[350px] md:mt-24 max-w-full md:max-w-4xl p-4 md:p-6 bg-slate-300 shadow-2xl absolute">
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          Task Management Section
        </h2>
        <div className="relative mb-4 flex flex-col md:flex-row">
          <input  
            type="text"
            placeholder="Search projects..."
            className="border border-gray-300 rounded-lg p-2 pl-10 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full md:w-[510px] mb-2 md:mb-0"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <div className="mt-2 md:mt-1 flex flex-col md:flex-row space-x-0 md:space-x-6 md:ml-7">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-2 md:mb-0"
              onClick={handleClickOpen}
            >
              Create New Task
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={Assinhandalonclick}
            >
              Assign
            </button>
          </div>
        </div>

        <Paper
          elevation={5}
          sx={{
            width: "95%",
            border: "1px solid #ccc",
            marginTop: 1,
            overflowX: "auto",
            overflowY: "auto",
            maxHeight: 300,
          }}
        >
          <TableContainer>
            <Table>
              <TableHead >
                <TableRow  className="bg-slate-100">
                  <TableCell sx={{
                    border: "1px solid #ccc",
                     fontWeight:'bold'
                  }} >S.No</TableCell>
                  <TableCell sx={{
                    border: "1px solid #ccc",
                     fontWeight:'bold'
                  }}>Task Name</TableCell>
                  <TableCell sx={{
                    border: "1px solid #ccc",
                     fontWeight:'bold'
                  }}>Description</TableCell>
                  <TableCell sx={{
                    border: "1px solid #ccc",
                     fontWeight:'bold'
                  }}>Assigned To</TableCell>
                  <TableCell sx={{
                    border: "1px solid #ccc",
                     fontWeight:'bold'
                  }}>Status</TableCell>
                  <TableCell sx={{
                    border: "1px solid #ccc",
                     fontWeight:'bold'
                  }}>Due Date</TableCell>
                  <TableCell sx={{
                    border: "1px solid #ccc",
                     fontWeight:'bold'
                  }}>Actions</TableCell>
                </TableRow> 
              </TableHead>
              <TableBody>
                {currentTasks.map((task, index) => (
                  <TableRow key={task._id}>
                    <TableCell sx={{
                    border: "1px solid #ccc",
                     
                  }}>{index + 1 + indexOfFirstTask}</TableCell>
                    <TableCell sx={{
                    border: "1px solid #ccc",
                     
                  }}>{task.taskName}</TableCell>
                    <TableCell sx={{
                    border: "1px solid #ccc",
                     
                  }}>{task.description}</TableCell>
                    <TableCell sx={{
                    border: "1px solid #ccc",
                     
                  }}>{task.assignedTo}</TableCell>
                    <TableCell sx={{
                    border: "1px solid #ccc",
                     
                  }}>{task.status}</TableCell>
                    <TableCell sx={{
                    border: "1px solid #ccc",
                     
                  }}>
                      {new Date(task.dueTo).toLocaleDateString()}
                    </TableCell>
                    <TableCell >
                      <div className="flex">
                      <Button onClick={() => handleEditTask(task)}>Edit</Button>
                      <Button onClick={() => handleDeleteTask(task._id)}>
                        Delete
                      </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>


          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              {selectedTaskId ? "Edit Task" : "Create New Task"}
            </DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Task Name"
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      select
                      fullWidth
                      label="Assigned To"
                      value={assignedTo}
                      onChange={(e) => setAssignedTo(e.target.value)}
                      required
                    >
                      <MenuItem value="Digital">Digital</MenuItem>
                      <MenuItem value="Design">Design</MenuItem>
                      <MenuItem value="Tech">Tech</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="date"
                      fullWidth
                      label="Due Date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      multiline
                      rows={4}
                      fullWidth
                      label="Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      select
                      fullWidth
                      label="Priority Level"
                      value={priorityLevel}
                      onChange={(e) => setPriorityLevel(e.target.value)}
                      required
                    >
                      <MenuItem value="High">High</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      select
                      fullWidth
                      label="Status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      required
                    >
                      <MenuItem value="Not Started">Not Started</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                      <MenuItem value="On Hold">On Hold</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      {selectedTaskId ? "Update Task" : "Create Task"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={Assinopen} onClose={Assinonclosehandal}>
            <DialogTitle>
              <Typography variant="h5">Assign Task</Typography>
            </DialogTitle>
            <DialogContent>
              <form onSubmit={handleAssignTask}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Select Task"
                      value={assignemployee}
                      onChange={(e) => setAssignemployee(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      fullWidth
                      label="Assign To"
                      value={assignTo}
                      onChange={(e) => setAssignTo(e.target.value)}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      value={descriptionemployee}
                      onChange={(e) => setDescriptionemployee(e.target.value)}
                      multiline
                      rows={4}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="date"
                      fullWidth
                      label="Due Date"
                      value={dueDateemployee}
                      onChange={(e) => setDueDateemployee(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary">
                      Assign Task
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={Assinonclosehandal} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Paper>
        
          
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
            sx={{ margin: 2 , display: 'flex',  }}
          />
      </div>
    </>
  );
};

export default TaskManagement;
