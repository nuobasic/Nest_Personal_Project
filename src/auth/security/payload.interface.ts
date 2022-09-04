import { UserRole } from "../entity/user.entity"

export interface Payload{
    id:number
    email:string
    name:string
    role: UserRole
}