import React from 'react';
import { Modal, Input } from '../index';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '../../schema/changePassword';

const ChangePasswordModal = ({
  isModalVisible,
  toggleModal,
  onChangePassword,
  isLoading,
}) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema(t)),
  });

  const modalFooterButtons = [
    {
      label: t('profile.changePasswordModal.footerButtons.cancel'),
      className: 'cancel-btn',
      isLoading: false,
      isDisabled: false,
      onClick: toggleModal,
      variant: 'secondary',
    },
    {
      label: t('profile.changePasswordModal.footerButtons.change'),
      className: 'change-btn',
      isLoading: isLoading,
      isDisabled: isLoading,
      onClick: handleSubmit(onChangePassword),
      variant: 'success',
    },
  ];
  return (
    <Modal
      title={t('profile.changePasswordModal.title')}
      isModalVisible={isModalVisible}
      buttons={modalFooterButtons}
      toggleModal={toggleModal}
      modalClass="change-password-modal">
      <Form onSubmit={handleSubmit(onChangePassword)}>
        <Input
          controlId="formOldPassword"
          type="password"
          error={errors.oldPassword && errors.oldPassword.message}
          showError={touchedFields && touchedFields.oldPassword}
          registeredEvents={register('oldPassword')}
          isRequired={true}
          label={t('profile.changePasswordModal.oldPasswordPlaceholder')}
        />
        <Input
          controlId="formNewPassword"
          type="password"
          error={errors.newPassword && errors.newPassword.message}
          showError={touchedFields && touchedFields.newPassword}
          registeredEvents={register('newPassword')}
          isRequired={true}
          label={t('profile.changePasswordModal.newPasswordPlaceholder')}
        />
        <Input
          controlId="formConfirmPassword"
          type="password"
          error={errors.confirmPassword && errors.confirmPassword.message}
          showError={touchedFields && touchedFields.confirmPassword}
          registeredEvents={register('confirmPassword')}
          isRequired={true}
          label={t('profile.changePasswordModal.confirmPasswordPlaceholder')}
        />
      </Form>
    </Modal>
  );
};

export default ChangePasswordModal;
