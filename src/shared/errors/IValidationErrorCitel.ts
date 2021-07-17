export default interface IValidationErrorCitel {
  error: string;
  errors: [
    {
      defaultMessage: string;
      field: string;
      objectName: string;
      rejectedValue: string;
    },
  ];
  payloadAutcom: string;
}
