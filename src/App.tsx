import TaskPage from "./pages/TaskPage/TaskPage";
import HomePage from "./pages/HomePage";
import SideBar from "./pages/SideBar/SideBar";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import ProjectPage from "./pages/ProjectPage/ProjectPage";

function App() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const handleToggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  return (
    <>
      {/* <LoginPage></LoginPage> */}
      <HomePage handleToggleSidebar={handleToggleSidebar}></HomePage>
      <SideBar isOpenSidebar={isOpenSidebar}></SideBar>
      {/* <TaskPage></TaskPage> */}
      <ProjectPage />
    </>
  );
}

export default App;
