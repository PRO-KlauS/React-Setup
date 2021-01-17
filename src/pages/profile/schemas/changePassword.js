import * as Yup from 'yup';

const changePassword = Yup.object({
  oldPassword: Yup.string()
    .required('This field is required.')
    .min(6, 'Password must be of 6-12 characters.')
    .max(12, 'Password must be of 6-12 characters.'),
  newPassword: Yup.string()
    .required('This field is required.')
    .min(6, 'Password must be of 6-12 characters.')
    .max(12, 'Password must be of 6-12 characters.'),
  confirmPassword: Yup.string()
    .required('This field is required.')
    .oneOf([Yup.ref('newPassword')], 'Both password must match.'),
});

export default changePassword;
