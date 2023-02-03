import React from "react";

import Header from "../components/Header";
import ListPersons from "../components/ListPersons";
import { useSelector } from "react-redux";

const HomePage = () => {
  return (
    <div>
      <Header />
      <ListPersons />
    </div>
  );
};
export default HomePage;
