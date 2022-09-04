import { Injectable, BadRequestException , Res} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, getConnection } from "typeorm";
import { Response } from "express";
import { UserDto } from "./dto/user.dto";
import { UserRepository } from "./repository/user.repository";
import * as bcrypt from 'bcrypt'
import { User } from "./entity/user.entity";
import { UserResponse } from "./dto/user.response";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){}

    async findByFields(options: FindOneOptions<UserDto>): Promise<User | undefined>{
        return await this.userRepository.findOne(options)
    }

    async save(userDto: UserDto): Promise<UserDto | undefined>{
        await this.transfomrPassword(userDto)
        
        return await this.userRepository.save(userDto)
    }

    async transfomrPassword(user: UserDto): Promise<void>{
        user.password = await bcrypt.hash(
            user.password, 10
        )
        return Promise.resolve()
    }
    async transfomrPassword2(user: User): Promise<void>{
        user.password = await bcrypt.hash(
            user.password, 10
        )
        return Promise.resolve()
    }
    
    async findUser(id: number ){
            return this.userRepository.findOne(id);
        }

    async deleteUser(id: number): Promise<void>{
        await this.userRepository.delete(id);
    }    
        
    async update(id: number, user: User): Promise<void> {
            const existedCat = await this.findUser(id);
            if(existedCat){
                await getConnection()
                    .createQueryBuilder()
                    .update(User)
                    .set({
                        name: user.name,
                        password: user.password,
                        
                    })
                    .where("id = :id", {id})
                    .execute();
                    
            }
        }
    }
