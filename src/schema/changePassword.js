import * as Yup from 'yup';

export default (t) => Yup.object({
  oldPassword: Yup.string()
    .required(t("validationMessages.fieldRequired"))
    .min(6, t("validationMessages.password6To12Chars"))
    .max(12, t("validationMessages.password6To12Chars")),
  newPassword: Yup.string()
    .required(t("validationMessages.fieldRequired"))
    .min(6, t("validationMessages.password6To12Chars"))
    .max(12, t("validationMessages.password6To12Chars")),
  confirmPassword: Yup.string()
    .required(t("validationMessages.fieldRequired"))
    .oneOf([Yup.ref('newPassword')], t("validationMessages.bothPasswordSame")),
});
