import * as Yup from 'yup';

const addNewUser = Yup.object({
  firstName: Yup.string()
    .required('This field is required.')
    .matches(
      /^([a-zA-Z\s])*$/,
      'Numbers and special characters are not allowed.',
    ),
  lastName: Yup.string()
    .required('This field is required.')
    .matches(
      /^([a-zA-Z\s])*$/,
      'Numbers and special characters are not allowed.',
    ),
  email: Yup.string()
    .required('This field is required.')
    .email('Enter valid email address.'),
  password: Yup.string()
    .required('This field is required.')
    .min(6, 'Password must be of 6-12 characters.')
    .max(12, 'Password must be of 6-12 characters.'),
  confirmPassword: Yup.string()
    .required('This field is required.')
    .oneOf([Yup.ref('password')], 'Both password must match.'),
});

export default addNewUser;
