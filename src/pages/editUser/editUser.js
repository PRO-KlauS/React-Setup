import React from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { Input, Checkbox, Button } from '../../components';
import { showToast, useStateCallback } from '../../utility/common';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import schema from '../../schema/editUser';
import { editUser } from '../../apis/manageUsers';

const EditUser = ({ history }) => {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useStateCallback(false);

  const { first_name, last_name, email, id, is_admin } =
    history?.location?.state || {};

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: first_name,
      lastName: last_name,
      isAdmin: is_admin,
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    setLoading(true, () => {
      const body = {
        first_name: data.firstName,
        last_name: data.lastName,
        is_admin: data.isAdmin,
      };
      editUser(id, body)
        .then((res) => {
          if (res.data.status) {
            showToast(res.data.message);
          } else {
            showToast(res.data.error_message);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    });
  };

  return (
    <Container>
      <Row className="edit-user-form">
        <Col lg={12} xl={10} className="offset-lg-0 offset-xl-1">
          <Card>
            <Card.Body className="pad-1">
              <Card.Title>{t('editUser.title')}</Card.Title>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md={6}>
                    <Input
                      controlId="formFirstName"
                      error={errors.firstName && errors.firstName.message}
                      showError={touchedFields && touchedFields.firstName}
                      registeredEvents={register('firstName')}
                      isRequired={true}
                      label={t('editUser.firstNamePlaceholder')}
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      controlId="formLastName"
                      error={errors.lastName && errors.lastName.message}
                      showError={touchedFields && touchedFields.lastName}
                      registeredEvents={register('lastName')}
                      isRequired={true}
                      label={t('editUser.lastNamePlaceholder')}
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      controlId="formEmail"
                      name="email"
                      label={t('editUser.emailPlaceholder')}
                      isControlled={true}
                      value={email}
                      disabled={true}
                    />
                  </Col>
                  <Col md={6} className="inline-checkbox">
                    <Checkbox
                      controlId="isAdminCheckbox"
                      label={t('editUser.adminPlaceholder')}
                      registeredEvents={register('isAdmin')}
                    />
                  </Col>
                </Row>
                <Card.Footer>
                  <Button
                    variant="success"
                    disabled={isLoading}
                    isLoading={isLoading}
                    label={t('editUser.buttons.editUser')}
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

export default EditUser;
