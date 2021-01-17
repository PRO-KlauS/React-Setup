import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { messages } from '../constants';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const TagInput = ({
  label,
  placeholder,
  error,
  showError,
  isLoading,
  isRequired,
  handleSearch,
  options,
  onSelect,
  labelKey,
  selected,
  inputRef,
  name,
}) => {
  return (
    <Form.Group>
      {label && (
        <Form.Label>
          {label}
          {isRequired && <span className="required"> *</span>}
        </Form.Label>
      )}
      <InputGroup>
        <AsyncTypeahead
          id="tag-input"
          filterBy={() => true}
          labelKey={labelKey}
          isLoading={isLoading}
          minLength={3}
          onSearch={handleSearch}
          options={options}
          placeholder={placeholder}
          onChange={onSelect}
          promptText={messages.noData}
          multiple
          selected={selected}
          renderMenuItemChildren={(option) => <p>{option.name}</p>}
          ref={inputRef}
          name={name}
        />
      </InputGroup>
      {showError && error && (
        <Form.Text className="error-text">{error}</Form.Text>
      )}
    </Form.Group>
  );
};

export default TagInput;
