import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import Button from './button';

const Input = ({
  controlId,
  label,
  type,
  placeholder,
  error,
  showError,
  inputRef,
  name,
  disabled,
  onChange,
  onBlur,
  buttonLabel,
  isLoading,
  isButtonDisabled,
  onButtonClick,
  isRequired,
  value,
  isControlled,
  iconClass,
  buttonVariant,
  hasButton,
  buttonType,
  prependText,
  hintText,
  registeredEvents,
}) => {
  return (
    <Form.Group
      className={iconClass && !onButtonClick ? 'with-icon' : ''}
      controlId={controlId}>
      {label && (
        <Form.Label>
          {label}
          {isRequired && <span className="required"> *</span>}
          {hintText && <span className="input-example">{hintText}</span>}
        </Form.Label>
      )}
      <InputGroup>
        {isControlled ? (
          <Form.Control
            name={name}
            type={type}
            placeholder={placeholder}
            ref={inputRef}
            disabled={disabled}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        ) : (
          <Form.Control
            {...(registeredEvents || {})}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
        {(buttonLabel || iconClass) && (
          <InputGroup.Append>
            {hasButton && (
              <Button
                disabled={isButtonDisabled}
                isLoading={isLoading}
                label={buttonLabel}
                onClick={onButtonClick}
                variant={buttonVariant}
                iconClass={iconClass}
                type={buttonType}
              />
            )}
            {!hasButton && iconClass && <i className={iconClass} />}
          </InputGroup.Append>
        )}
        {prependText && <span className="numbers">{prependText}</span>}
      </InputGroup>
      {showError && error && (
        <Form.Text className="error-text">{error}</Form.Text>
      )}
    </Form.Group>
  );
};

export default Input;
