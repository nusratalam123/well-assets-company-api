import { CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export class RoleGuard implements CanActivate {
  private readonly allowedRoles: string[];

  constructor(roles: string | string[]) {
    // Normalize roles to an array
    this.allowedRoles = Array.isArray(roles) ? roles : [roles];
  }

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    const user = ctx.user;

    if (!user || !user.role) {
      return false;
    }

    // Allow if user role is in allowedRoles array
    return this.allowedRoles.includes(user.role);
  }
}
