import * as Yup from 'yup';

export default (t) => Yup.object({
  firstName: Yup.string()
    .required(t("validationMessages.fieldRequired"))
    .matches(
      /^([a-zA-Z\s])*$/,
      t("validationMessages.fieldRequired"),
    ),
  lastName: Yup.string()
    .required(t("validationMessages.onlyAlphabets"))
    .matches(
      /^([a-zA-Z\s])*$/,
      t("validationMessages.onlyAlphabets"),
    ),
});
