import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DatabaseErrorsFilter implements ExceptionFilter {
  private KEY_MATCH_REGEX = /Key \(([^)]+)\)=\(([^)]+)\)/;
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const postgresError = exception as any;
    const message = this.getErrorMessage(postgresError);
    const detail = postgresError.detail;

    return response.status(400).json({
      statusCode: 400,
      message,
      detail: process.env.NODE_ENV === 'development' ? detail : undefined,
      error: 'Bad Request',
      code: postgresError.code,
    });
  }

  private getErrorMessage(exception: QueryFailedError) {
    const postgresError = exception as any;

    switch (postgresError.code) {
      // Foreign Key Violation
      case '23503': {
        const coreMessage = 'Referenced record does not exist';

        if (postgresError.detail?.includes('is not present in table')) {
          const matches = postgresError.detail.match(this.KEY_MATCH_REGEX);
          if (matches) {
            return `${coreMessage}: ${matches[1]} with value "${matches[2]}" does not exist`;
          }
        }

        return coreMessage;
      }

      // Unique Violation
      case '23505': {
        const coreMessage = 'Duplicate entry';

        if (postgresError.detail?.includes('already exists')) {
          const matches = postgresError.detail.match(this.KEY_MATCH_REGEX);

          if (matches) {
            return `${coreMessage}: ${matches[1]} "${matches[2]}" already exists`;
          }
        }

        return coreMessage;
      }
      default: {
        return postgresError.message;
      }
    }
  }
}
