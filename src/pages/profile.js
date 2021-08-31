import React from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Input, Button, ChangePasswordModal } from '../components';
import { updateProfileData } from '../actions/profile';
import { changePassword } from '../apis/profile';
import { useStateCallback, saveToken, showToast } from '../utility/common';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '../schema/profile';

const Profile = () => {
  const [state, setState] = useStateCallback({
    isUpdateBtnLoading: false,
    isChangeBtnLoading: false,
    isModalVisible: false,
  });
  const { isUpdateBtnLoading, isChangeBtnLoading, isModalVisible } = state;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { profile } = useSelector((state) => ({
    profile: state.profile,
  }));

  const toggleModal = () =>
    setState((state) => ({ ...state, isModalVisible: !state?.isModalVisible }));

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: profile?.first_name,
      lastName: profile?.last_name,
    },
    resolver: yupResolver(schema),
  });
  const onUpdateProfile = (data) => {
    setState(
      (state) => ({ ...state, isUpdateBtnLoading: true }),
      () => {
        let body = {
          first_name: data.firstName,
          last_name: data.lastName,
        };
        dispatch(updateProfileData(profile.id, body))
          .then((res) => {
            if (res.data.status) {
              showToast(res.data.message);
            } else {
              showToast(res.data.error_message);
            }
          })
          .finally(() =>
            setState((state) => ({ ...state, isUpdateBtnLoading: false })),
          );
      },
    );
  };

  const onChangePassword = (data) => {
    let body = {
      old_password: data.oldPassword,
      new_password: data.newPassword,
    };
    setState(
      (state) => ({ ...state, isChangeBtnLoading: true }),
      () => {
        changePassword(profile.id, body)
          .then((res) => {
            if (res.data.status) {
              showToast(res.data.message);
              let newToken = 'Bearer ' + res.data.token.access_token;
              saveToken(newToken);
              toggleModal();
            } else {
              showToast(res.data.error_message);
            }
          })
          .finally(() =>
            setState((state) => ({ ...state, isChangeBtnLoading: false })),
          );
      },
    );
  };

  return (
    <Container>
      <Row className="edit-profile-form">
        <Col lg={12} xl={10} className="offset-lg-0 offset-xl-1">
          <Card>
            <Card.Body className="pad-1">
              <Card.Title>{t('profile.title')}</Card.Title>
              <Form onSubmit={handleSubmit(onUpdateProfile)}>
                <Row>
                  <Col md={6}>
                    <Input
                      controlId="formFirstName"
                      placeholder={t('profile.firstNamePlaceholder')}
                      error={errors.firstName && errors.firstName.message}
                      showError={touchedFields && touchedFields.firstName}
                      registeredEvents={register('firstName')}
                      isRequired={true}
                      label={t('profile.firstNamePlaceholder')}
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      controlId="formLastName"
                      placeholder={t('profile.lastNamePlaceholder')}
                      error={errors.lastName && errors.lastName.message}
                      showError={touchedFields && touchedFields.lastName}
                      registeredEvents={register('lastName')}
                      isRequired={true}
                      label={t('profile.lastNamePlaceholder')}
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      controlId="formEmail"
                      value={profile.email}
                      placeholder={t('profile.emailPlaceholder')}
                      name="email"
                      isRequired={true}
                      label={t('profile.emailPlaceholder')}
                      disabled={true}
                      isControlled={true}
                    />
                  </Col>
                </Row>
                <Card.Footer>
                  <Row className="align-items-center">
                    <Col sm={6}>
                      <Button
                        variant="success"
                        disabled={isUpdateBtnLoading}
                        isLoading={isUpdateBtnLoading}
                        label={t('profile.buttons.update')}
                        onClick={handleSubmit(onUpdateProfile)}
                      />
                    </Col>
                    <Col sm={6} className="change-password">
                      <a href="javascript:;" onClick={toggleModal}>
                        {t('profile.changePasswordPlaceholder')}
                      </a>
                    </Col>
                  </Row>
                </Card.Footer>
              </Form>
              {isModalVisible && (
                <ChangePasswordModal
                  isLoading={isChangeBtnLoading}
                  isModalVisible={isModalVisible}
                  onChangePassword={onChangePassword}
                  toggleModal={toggleModal}
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
