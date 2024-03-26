import React from "react";
import Header from "./Header";

interface HomePageProps {
  handleToggleSidebar: () => void;
}

export const HomePage: React.FC<HomePageProps> = (props) => {
  return (
    <>
      <Header handleToggleSidebar={props.handleToggleSidebar}></Header>
    </>
  );
};

export default HomePage;
