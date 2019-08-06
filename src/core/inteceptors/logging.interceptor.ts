import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, from } from 'rxjs';
import { tsConstructSignatureDeclaration } from '@babel/types';
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('I am a interceptor');
    const now = Date.now();
    console.log('before ...');
    return next.handle().pipe(
      tap(()=> console.log(`after .. ${Date.now() - now}ms`)) 
    )
    return next.handle();
  }
}
