import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt'
import { Payload } from './security/payload.interface';
import { User } from './entity/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    async registerUser(newUser: UserDto): Promise<UserDto>{
        let userFind: UserDto = await this.userService.findByFields({
            where: {email: newUser.email}
        })
        if(userFind){
            throw new HttpException('Email aleady used!', HttpStatus.BAD_REQUEST)
        }
        return await this.userService.save(newUser)

    }

    async validateUser(userDto: UserDto): Promise<{accessToken: string} | undefined>{
        let userFind: User = await this.userService.findByFields({
            where: {email: userDto.email}
        })
        const validatePassword = await bcrypt.compare(userDto.password, userFind.password )
        if(!userFind || !validatePassword){
            throw new UnauthorizedException()
        }
        this.convertInAuthorities(userFind)
        const Payload: Payload = {
            id: userFind.id, 
            email: userFind.email, 
            name: userFind.name,
            role: userFind.role}
        return {
            accessToken: this.jwtService.sign(Payload)
        }
    }
    async tokenValidateUser(payload: Payload): Promise<User | undefined>{
        const userFind= await this.userService.findByFields({
            where:{id: payload.id}
        })
        this.flatAuthorities(userFind)
        return userFind
    }

    private flatAuthorities(user: any): User{
        if(user && user.authorities){
            const authorities: string[] = []
            user.authorities.array.forEach(authority => authorities.push(authority.authorityName))
            user.authorities = authorities    
            
        }
        return user;
    }

    private convertInAuthorities(user: any): User{
        if( user && user.authorities){
            const authorities: any[]=[]
            user.authorities.array.forEach(authority => {
                authorities.push({name: authority.authorityName})
                
            });
            user.authorities = authorities
        }
        return user
    }
    
   
}
