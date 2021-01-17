import React from 'react';
import ReactTooltip from 'react-tooltip';

const ToolTip = ({ children, id, place }) => {
  return (
    <ReactTooltip id={id} place={place} effect="solid">
      {children}
    </ReactTooltip>
  );
};

export default ToolTip;
