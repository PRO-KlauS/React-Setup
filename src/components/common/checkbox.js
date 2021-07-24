import React from 'react';
import { Form } from 'react-bootstrap';
import { Checkbox } from 'pretty-checkbox-react';

const CustomCheckbox = ({
  controlId,
  label,
  error,
  showError,
  inputRef,
  name,
  disabled,
  value,
  isControlled,
  onClick,
  dataFor,
  registeredEvents,
}) => {
  return (
    <Form.Group controlId={controlId}>
      {isControlled ? (
        <Checkbox
          icon={<i className="fas fa-check" />}
          disabled={disabled}
          state={value}
          onChange={onClick}
          setState={onClick}
          // onClick={onClick}
          ref={inputRef}
          color="success-o"
          shape="curve"
          variant="thick"
          name={name}
          data-tip
          data-for={dataFor}>
          {label}
        </Checkbox>
      ) : (
        <Checkbox
          icon={<i className="fas fa-check" />}
          color="success-o"
          shape="curve"
          variant="thick"
          disabled={disabled}
          {...(registeredEvents || {})}
          data-tip={dataFor}
          data-for={dataFor}>
          {label}
        </Checkbox>
      )}
      {showError && error && (
        <Form.Text className="error-text">{error}</Form.Text>
      )}
    </Form.Group>
  );
};

export default CustomCheckbox;
