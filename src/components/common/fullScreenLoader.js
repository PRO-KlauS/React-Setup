import React from 'react';
import { Spinner } from 'react-bootstrap';

const FullScreenLoader = () => {
  return (
    <div className="fullscreen-loader">
      <Spinner animation="border" />
    </div>
  );
};

export default FullScreenLoader;
