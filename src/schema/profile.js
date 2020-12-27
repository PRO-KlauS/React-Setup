import * as Yup from 'yup';

const profile = Yup.object({
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
});

export default profile;
