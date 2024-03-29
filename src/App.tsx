import TaskPage from "./pages/TaskPage/TaskPage";
import Header from "./pages/Header";
import SideBar from "./pages/SideBar/SideBar";
import { useState } from "react";
import LoginPage from "./pages/Login/LoginPage";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes
} from "react-router-dom";

const App: React.FC = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const isLoggedIn = localStorage.getItem("accessToken");

  const handleToggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  return (
    <Router>
      <Routes>
        <Route
          path={"/login"}
          element={isLoggedIn ? <Navigate to="/task" /> : <LoginPage />}
        />
        <Route
          path={"/" || "/login"}
          element={
            isLoggedIn ? <Navigate to="/task" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/task"
          element={
            isLoggedIn ? (
              <>
                <Header handleToggleSidebar={handleToggleSidebar}></Header>
                <SideBar isOpenSidebar={isOpenSidebar}></SideBar>
                <TaskPage />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/projects"
          element={
            isLoggedIn ? (
              <>
                <Header handleToggleSidebar={handleToggleSidebar}></Header>
                <SideBar isOpenSidebar={isOpenSidebar}></SideBar>
                <ProjectPage />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
        {/* Add other routes */}
      </Routes>
    </Router>
  );
};

export default App;
