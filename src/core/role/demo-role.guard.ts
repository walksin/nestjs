import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class DemoRoleGuard implements CanActivate {
  constructor(private readonly reflector:Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles',context.getHandler());
    
    if(!roles){
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { user } = request;
    console.log('user:',user);
    const hasRole = () => 
      user.roles.some(
        role => roles.includes(role))

    console.log('roles:',hasRole());
    return user && user.roles && hasRole();
  }
}
