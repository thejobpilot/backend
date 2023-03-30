// detailed-error.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class DetailedErrorFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = 500;
        let message = 'Internal server error';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.message;
        } else if (exception instanceof Error) {
            message = exception.stack || exception.message;
        }

        response.status(status).json({
            timestamp: new Date().toISOString(),
            error: {
                status,
                message,
            },
        });
    }
}
