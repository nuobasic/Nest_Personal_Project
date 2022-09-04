import { UserRole } from "../entity/user.entity"

export class UserDto{
    email:string
    name:string
    password:string
    role: UserRole
}