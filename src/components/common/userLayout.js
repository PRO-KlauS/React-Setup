import React from 'react';
import { Sidebar, Header, Footer, FullScreenLoader } from '../index';

const UserLayout = (props) => {
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
export default UserLayout;
