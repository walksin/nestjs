import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { response } from 'express';

@Catch(HttpException)
export class DemoFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const resp = ctx.getResponse();
      const req = ctx.getRequest();
      const status = exception.getStatus();

      resp.status(status).json({
        statusCode:status,
        path:req.url
      });
  }
}
