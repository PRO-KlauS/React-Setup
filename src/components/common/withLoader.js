import React from "react";
import { FullScreenLoader } from "../index";

const WithLoader = ({ isLoading, children }) => {
  return (
    <>
      {children}
      {isLoading > 0 && <FullScreenLoader />}
    </>
  );
};
export default WithLoader;
