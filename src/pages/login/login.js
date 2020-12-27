import React, { useState, useEffect } from 'react';
import { Form, Container, Alert } from 'react-bootstrap';
import { Input, Button } from '../../components';
import { showToast, useStateCallback } from '../../utility/common';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '../../schema/login';
import { constants, messages } from '../../constants';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/common/form.scss';
import '../../styles/common/button.scss';
import '../../styles/login.scss';

const Login = ({ setUserToken }) => {
  useEffect(() => {
    if (localStorage.getItem('SHOW_TOAST')) {
      localStorage.removeItem('SHOW_TOAST');
      showToast(messages.sessionExpired);
    }
  }, []);
  const {
    title,
    buttons,
    emailPlaceholder,
    passwordPlaceholder,
  } = constants.loginPage;

  const [isLoading, setLoading] = useStateCallback(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { register, handleSubmit, errors, formState } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      // rememberMe: false,
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    setLoading(true, () => {
      setUserToken(data)
        .then((res) => {
          if (!res.status) {
            setErrorMessage(res.error_message);
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    });
  };
  const { touched } = formState;

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center login-body">
      <Container className="d-flex justify-content-center align-items-center">
        <div className="login-box">
          <div className="text-center">
            <img src="/images/logo.png" alt="Logo" className="logo" />
            <h1 className="heading">{title}</h1>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              controlId="formEmail"
              placeholder={emailPlaceholder}
              error={errors.email && errors.email.message}
              showError={touched && touched.email}
              inputRef={register}
              name="email"
              iconClass="fas fa-envelope"
            />
            <Input
              controlId="formPassword"
              type="password"
              placeholder={passwordPlaceholder}
              error={errors.password && errors.password.message}
              showError={touched && touched.password}
              inputRef={register}
              name="password"
              iconClass="fas fa-lock"
            />
            <div className="text-center">
              <Button
                disabled={isLoading}
                isLoading={isLoading}
                label={buttons.login}
                onClick={handleSubmit(onSubmit)}
                type="submit"
              />
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
