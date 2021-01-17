import React from 'react';
import { Modal, Input } from '../../../components/index';
import { Form } from 'react-bootstrap';
import { constants } from '../../../constants';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '../schemas/changePassword';

const ChangePasswordModal = ({
  isModalVisible,
  toggleModal,
  onChangePassword,
  isLoading,
}) => {
  const {
    title,
    confirmPasswordPlaceholder,
    newPasswordPlaceholder,
    oldPasswordPlaceholder,
    footerButtons,
  } = constants.profile.changePasswordModal;

  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const modalFooterButtons = [
    {
      label: footerButtons.cancel,
      className: 'cancel-btn',
      isLoading: false,
      isDisabled: false,
      onClick: toggleModal,
      variant: 'secondary',
    },
    {
      label: footerButtons.change,
      className: 'change-btn',
      isLoading: isLoading,
      isDisabled: isLoading,
      onClick: handleSubmit(onChangePassword),
      variant: 'success',
    },
  ];
  const { touched } = formState;
  return (
    <Modal
      title={title}
      isModalVisible={isModalVisible}
      buttons={modalFooterButtons}
      toggleModal={toggleModal}
      modalClass="change-password-modal">
      <Form onSubmit={handleSubmit(onChangePassword)}>
        <Input
          controlId="formOldPassword"
          type="password"
          error={errors.oldPassword && errors.oldPassword.message}
          showError={touched && touched.oldPassword}
          inputRef={register}
          name="oldPassword"
          isRequired={true}
          label={oldPasswordPlaceholder}
        />
        <Input
          controlId="formNewPassword"
          type="password"
          error={errors.newPassword && errors.newPassword.message}
          showError={touched && touched.newPassword}
          inputRef={register}
          name="newPassword"
          isRequired={true}
          label={newPasswordPlaceholder}
        />
        <Input
          controlId="formConfirmPassword"
          type="password"
          error={errors.confirmPassword && errors.confirmPassword.message}
          showError={touched && touched.confirmPassword}
          inputRef={register}
          name="confirmPassword"
          isRequired={true}
          label={confirmPasswordPlaceholder}
        />
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
