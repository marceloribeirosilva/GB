import IValidationErrorCitel from './IValidationErrorCitel';

class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  public readonly errorCitel: IValidationErrorCitel | null;

  constructor(
    message: string,
    statusCode = 400,
    errorCitel: IValidationErrorCitel | null = null,
  ) {
    this.message = message;
    this.statusCode = statusCode;
    this.errorCitel = errorCitel;
  }
}

export default AppError;
