import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { User } from "../entity/user.entity";

const matchRoles = (roles, userRoles) => {
    return roles.some(role => role === userRoles);
  };

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private readonly reflector:Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles',context.getHandler())

        if(!roles){
            return true
        }
        const request = context.switchToHttp().getRequest()
        const user = request.user as User

        return matchRoles(roles, user.role);    }
}