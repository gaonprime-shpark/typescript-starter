import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../entities/users.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log(`roles :`, roles);
    if (!roles) return true;

    const rolesValue = context.switchToHttp().getRequest().body.roles;
    console.log(`roles :`, context.switchToHttp().getRequest().body.roles);
    if (!rolesValue.some((role) => roles.includes(role))) {
      throw new UnauthorizedException(
        `user's role=[${rolesValue}] not include any of [${roles}]`,
      );
    }

    return rolesValue.some((role) => roles.includes(role));
  }
}
