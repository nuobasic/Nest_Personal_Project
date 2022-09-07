import { User } from "../entity/user.entity"

export class UserResponse{
    email:string
    name:string


    constructor(email: string, name: string){
        this.email=email
        this.name=name
    }

    static of(user: User): UserResponse{
        return new UserResponse(
            user.email,
            user.name
        )
    }
}