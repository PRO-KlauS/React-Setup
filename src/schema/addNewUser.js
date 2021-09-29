import * as Yup from 'yup';

export default (t) => Yup.object({
  firstName: Yup.string()
    .required(t("validationMessages.fieldRequired"))
    .matches(
      /^([a-zA-Z\s])*$/,
      t("validationMessages.onlyAlphabets"),
    ),
  lastName: Yup.string()
    .required(t("validationMessages.fieldRequired"))
    .matches(
      /^([a-zA-Z\s])*$/,
      t("validationMessages.onlyAlphabets"),
    ),
  email: Yup.string()
    .required(t("validationMessages.fieldRequired"))
    .email(t("validationMessages.validEmail")),
  password: Yup.string()
    .required(t("validationMessages.fieldRequired"))
    .min(6, t("validationMessages.password6To12Chars"))
    .max(12, t("validationMessages.password6To12Chars")),
  confirmPassword: Yup.string()
    .required(t("validationMessages.fieldRequired"))
    .oneOf([Yup.ref('password')], t("validationMessages.bothPasswordSame")),
});