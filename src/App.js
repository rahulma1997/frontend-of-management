import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DashboardOverview from "./Components/Admin/DashboardOverview";
import AddNewProject from "./Components/Admin/Project";
import UserTable from "./Components/Admin/Users";
import ProjectProgress from "./Components/Admin/ProjectProgress";
import TaskReport from "./Components/Admin/Reports";
import SidebarAdmin from "./Components/Admin/Sidebar";
  
// Project manager components
import Sidebar from "./Components/ProjectManager.js/Sidebar";
import Manage from "./Components/ProjectManager.js/Mangae";
import TastMangment from "./Components/ProjectManager.js/TaskMangment";
// import StatusDadline from "./Components/ProjectManager.js/Status";
// import TeamComunication from "./Components/ProjectManager.js/Team";
// import Reportcomp from "./Components/ProjectManager.js/Report";
import OverallProject from "./Components/ProjectManager.js/OverallProject";
import ProjectReports from "./Components/ProjectManager.js/ProjectReports";
import SidebarEmployee from "./Components/Employee/EmSidebar";
import ViewTask from "./Components/Employee/ViewTask";
import TaskStatus from "./Components/Employee/TaskStatus";
import Comments from "./Components/Employee/Comments";
import Files from "./Components/Employee/Files";
import ProjectStatus from "./Components/ProjectManager.js/ProjectStatus";
import ProjectManager from "./Components/ProjectManager.js/ProjectManager";
import Employee from "./Components/Employee/Employee";
import Home from "./Components/Home";
import TeamWork from "./Components/TeamWork";



const router = createBrowserRouter([

  {
    path: "/",element: <Home />,
    
  },
  {
    path: "/teamwork",element: <TeamWork />,
    
  },
  {
    path: "/manager",
    element: <Sidebar />,
    children: [
     // Default route
      { path: "Manageproject", element: <Manage /> },
      { path: "Taskmanagement", element: <TastMangment /> },
      // { path: "StatusAndDadline", element: <StatusDadline /> },
      // { path: "TeamComunication", element: <TeamComunication /> },
      // { path: "Report", element: <Reportcomp /> },
      { path: "overall", element: <OverallProject /> },
      { path: "projectrepots", element: <ProjectReports /> },
      { path: "Pstatus", element: <ProjectStatus /> },
      { path: "chat", element: <ProjectManager /> },
    ],
  },
  {
    path: "/admin",
    element: <SidebarAdmin />,
    children: [
      { path: "", element: <DashboardOverview /> }, // Default route
      { path: "AddProject", element: <AddNewProject /> },
      { path: "usertable", element: <UserTable /> },
      { path: "projectprogress", element: <ProjectProgress /> },
      { path: "taskreport", element: <TaskReport /> },
      

      // manager
      
    ],
  },

  {
    path: "/employee",
    element: <SidebarEmployee />,
    children: [
    
      { path: "viewtasks", element: <ViewTask /> }, // Default route
      { path: "taskstatus", element: <TaskStatus /> },
      { path: "comments", element: <Comments/> },
      { path: "File", element: <Files/> },
      { path: "chating", element: <Employee/> },

    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;





