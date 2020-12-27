import * as Yup from 'yup';

const login = Yup.object({
  email: Yup.string()
    .required('This field is required.')
    .email('Enter valid email address.'),
  password: Yup.string()
    .required('This field is required.')
    .min(6, 'Password must be 6 characters long.')
    .max(12, "Password can't be longer than 12 characters."),
});

export default login;
