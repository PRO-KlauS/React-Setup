import React from 'react';
import { FullScreenLoader } from '../index';

const UnAuthorizedRouteLayout = (props) => {
  const { loaderCount, component: Component, ...rest } = props;
  return (
    <>
      <Component {...rest} />
      {loaderCount > 0 && <FullScreenLoader />}
    </>
  );
};
export default UnAuthorizedRouteLayout;
