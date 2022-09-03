import { UserRole } from "../entity/user.entity"

export class UserDto{
    email:string
    password:string
    role: UserRole
}