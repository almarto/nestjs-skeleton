import { HttpStatus } from '@nestjs/common';

import { AppErrorTypeEnum } from './AppErrorTypeEnum';
import { IErrorMessage } from './IErrorMessage';

export class AppError extends Error {
  public errorCode: AppErrorTypeEnum;
  public httpStatus: number;
  public errorMessage: string;
  public userMessage: string;

  constructor(
    errorCode: AppErrorTypeEnum,
    entity: string,
    customMessage: string,
  ) {
    super();

    const errorMessageConfig: IErrorMessage = this.getError(
      errorCode,
      entity,
      customMessage,
    );

    if (!errorMessageConfig) {
      throw new Error('Unable to find message code error.');
    }

    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.httpStatus = errorMessageConfig.httpStatus;
    this.errorCode = errorCode;
    this.errorMessage = errorMessageConfig.errorMessage;
    this.userMessage = errorMessageConfig.userMessage;
  }

  private getError(
    errorCode: AppErrorTypeEnum,
    entity: string,
    customMessage: string,
  ): IErrorMessage {
    let res: IErrorMessage;

    switch (errorCode) {
      case AppErrorTypeEnum.ALREADY_EXISTS:
        res = {
          type: AppErrorTypeEnum.ALREADY_EXISTS,
          httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
          errorMessage: `${entity || 'Entity'} already exists`,
          userMessage: customMessage || 'Entity key already in use',
        };
        break;

      case AppErrorTypeEnum.NOT_IN_SESSION:
        res = {
          type: AppErrorTypeEnum.NOT_IN_SESSION,
          httpStatus: HttpStatus.UNAUTHORIZED,
          errorMessage: 'No Session',
          userMessage: 'Session Expired',
        };
        break;

      case AppErrorTypeEnum.NO_USERS_IN_DB:
        res = {
          type: AppErrorTypeEnum.NO_USERS_IN_DB,
          httpStatus: HttpStatus.NOT_FOUND,
          errorMessage: 'No Users exits in the database',
          userMessage: 'No Users. Create some.',
        };
        break;
    }

    return res;
  }
}
