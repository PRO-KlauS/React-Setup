import React from 'react';
import { Dropdown as BootStrapDropdown } from 'react-bootstrap';

const Dropdown = ({ options, selected, onClick, id }) => {
  return (
    <BootStrapDropdown>
      <BootStrapDropdown.Toggle variant="default" id={id}>
        {selected && selected.value}
        {selected && selected.iconClass && <i className={selected.iconClass} />}
      </BootStrapDropdown.Toggle>
      <BootStrapDropdown.Menu align={'right'}>
        {options.map((option) => {
          return (
            <BootStrapDropdown.Item
              active={selected && selected.value === option.value}
              onClick={() => onClick(option)}>
              {option.value}
              {option.iconClass && <i className={option.iconClass} />}
            </BootStrapDropdown.Item>
          );
        })}
      </BootStrapDropdown.Menu>
    </BootStrapDropdown>
  );
};

export default Dropdown;
