import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../index';

const ConfirmationModal = ({
  isModalVisible,
  toggleModal,
  onDelete,
  title,
  message,
  isLoading,
}) => {
  const { t } = useTranslation();

  const modalFooterButtons = [
    {
      label: t('confirmationModal.footerButtons.cancel'),
      className: 'cancel-btn',
      isLoading: false,
      isDisabled: false,
      onClick: toggleModal,
      variant: 'secondary',
    },
    {
      label: t('confirmationModal.footerButtons.delete'),
      className: 'delete-btn',
      isLoading: isLoading,
      isDisabled: isLoading,
      onClick: onDelete,
      variant: 'danger',
    },
  ];
  return (
    <Modal
      title={title}
      isModalVisible={isModalVisible}
      buttons={modalFooterButtons}
      toggleModal={toggleModal}
      modalClass="delete-notification-modal">
      <p>{message}</p>
    </Modal>
  );
};

export default ConfirmationModal;
