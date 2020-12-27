import React from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Input, Checkbox, Button } from '../../components';
import { showToast, useStateCallback } from '../../utility/common';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '../../schema/addNewUser';
import { constants } from '../../constants';
import { addNewUser } from '../../apis/manageUsers';
import '../../styles/addUser.scss';

const AddNewUser = () => {
  const {
    title,
    buttons,
    emailPlaceholder,
    passwordPlaceholder,
    adminPlaceholder,
    confirmPasswordPlaceholder,
    firstNamePlaceholder,
    lastNamePlaceholder,
  } = constants.addNewUser;

  const [isLoading, setLoading] = useStateCallback(false);

  const { register, handleSubmit, errors, formState, reset } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      isAdmin: false,
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    setLoading(true, () => {
      const body = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        is_admin: data.isAdmin,
        password: data.password,
      };
      addNewUser(body)
        .then((res) => {
          if (res.data.status) {
            showToast(res.data.message);
            reset();
          } else {
            showToast(res.data.error_message);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    });
  };
  const { touched } = formState;

  return (
    <Container>
      <Row className="add-user-form">
        <Col lg={12} xl={10} className="offset-lg-0 offset-xl-1">
          <Card>
            <Card.Body className="pad-1">
              <Card.Title>{title}</Card.Title>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md={6}>
                    <Input
                      controlId="formFirstName"
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
                      error={errors.email && errors.email.message}
                      showError={touched && touched.email}
                      inputRef={register}
                      name="email"
                      isRequired={true}
                      label={emailPlaceholder}
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      controlId="formPassword"
                      type="password"
                      error={errors.password && errors.password.message}
                      showError={touched && touched.password}
                      inputRef={register}
                      name="password"
                      isRequired={true}
                      label={passwordPlaceholder}
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      controlId="formConfirmPassword"
                      type="password"
                      error={
                        errors.confirmPassword && errors.confirmPassword.message
                      }
                      showError={touched && touched.confirmPassword}
                      inputRef={register}
                      name="confirmPassword"
                      isRequired={true}
                      label={confirmPasswordPlaceholder}
                    />
                  </Col>
                  <Col md={6} className="inline-checkbox">
                    <Checkbox
                      controlId="isAdminCheckbox"
                      label={adminPlaceholder}
                      inputRef={register}
                      name="isAdmin"
                    />
                  </Col>
                </Row>
                <Card.Footer>
                  <Button
                    variant="success"
                    disabled={isLoading}
                    isLoading={isLoading}
                    label={buttons.addUser}
                    onClick={handleSubmit(onSubmit)}
                  />
                </Card.Footer>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddNewUser;
