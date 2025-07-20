import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { TUser } from '@users/types/users.type';
import { Observable } from 'rxjs';

declare global {
  interface Request {
    user?: Pick<TUser, 'id' | 'name' | 'username' | 'email'>;
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    //@ts-ignore
    const [, token] = (request.headers.authorization || '').split(' ');
    request.user.token = token;
    return true;
  }
}
