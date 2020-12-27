import React from "react";
import { Sidebar, Header, Footer, FullScreenLoader } from "../index";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/common/index.scss";
import "../../styles/appStyle.scss";

const AdminLayout = (props) => {
  const { loaderCount, component: Component, ...rest } = props;
  return (
    <>
      <Sidebar {...rest} />
      <Header {...rest} />
      <main>
        <Component {...rest} />
      </main>
      {loaderCount > 0 && <FullScreenLoader />}
      <Footer />
    </>
  );
};
export default AdminLayout;
