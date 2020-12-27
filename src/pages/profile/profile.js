import React, { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Input, Button, ChangePasswordModal } from '../../components';
import { changePassword } from '../../apis/profile';
import { useStateCallback, saveToken, showToast } from '../../utility/common';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '../../schema/profile';
import { constants } from '../../constants';
import '../../styles/profile.scss';

const Profile = ({ profile, updateProfileData }) => {
  const {
    buttons,
    emailPlaceholder,
    firstNamePlaceholder,
    lastNamePlaceholder,
    changePasswordPlaceholder,
    title,
  } = constants.profile;

  const [isUpdateBtnLoading, setUpdateBtnLoading] = useStateCallback(false);
  const [isChangeBtnLoading, setChangeBtnLoading] = useStateCallback(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => setModalVisible(!isModalVisible);

  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: profile.first_name,
      lastName: profile.last_name,
    },
    resolver: yupResolver(schema),
  });
  const onUpdateProfile = (data) => {
    setUpdateBtnLoading(true, () => {
      let body = {
        first_name: data.firstName,
        last_name: data.lastName,
      };
      updateProfileData(profile.id, body)
        .then((res) => {
          if (res.status) {
            showToast(res.message);
          } else {
            showToast(res.error_message);
          }
          setUpdateBtnLoading(false);
        })
        .catch(() => setUpdateBtnLoading(false));
    });
  };

  const onChangePassword = (data) => {
    let body = {
      old_password: data.oldPassword,
      new_password: data.newPassword,
    };
    setChangeBtnLoading(true, () => {
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
          setChangeBtnLoading(false);
        })
        .catch(() => setChangeBtnLoading(false));
    });
  };
  const { touched } = formState;

  return (
    <Container>
      <Row className="edit-profile-form">
        <Col lg={12} xl={10} className="offset-lg-0 offset-xl-1">
          <Card>
            <Card.Body className="pad-1">
              <Card.Title>{title}</Card.Title>
              <Form onSubmit={handleSubmit(onUpdateProfile)}>
                <Row>
                  <Col md={6}>
                    <Input
                      controlId="formFirstName"
                      placeholder={firstNamePlaceholder}
                      error={errors.firstName && errors.firstName.message}
                      showError={touched && touched.firstName}
                      inputRef={register}
                      name="firstName"
                      isRequired={true}
                      label={firstNamePlaceholder}
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      controlId="formLastName"
                      placeholder={lastNamePlaceholder}
                      error={errors.lastName && errors.lastName.message}
                      showError={touched && touched.lastName}
                      inputRef={register}
                      name="lastName"
                      isRequired={true}
                      label={lastNamePlaceholder}
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      controlId="formEmail"
                      value={profile.email}
                      placeholder={emailPlaceholder}
                      name="email"
                      isRequired={true}
                      label={emailPlaceholder}
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
                        label={buttons.update}
                        onClick={handleSubmit(onUpdateProfile)}
                      />
                    </Col>
                    <Col sm={6} className="change-password">
                      <a href="javascript:;" onClick={toggleModal}>
                        {changePasswordPlaceholder}
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
