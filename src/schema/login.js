import * as Yup from 'yup';

export default (t) => Yup.object({
  email: Yup.string()
    .required(t("validationMessages.fieldRequired"))
    .email(t("validationMessages.validEmail")),
  password: Yup.string()
    .required(t("validationMessages.fieldRequired"))
    .min(6, t("validationMessages.validEmail"))
    .max(12, t("validationMessages.validEmail")),
});;
