import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { Roles } from './decorator/role.decorator';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';


@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('/register')
  
    async register(@Req() req:Request, @Body() UserDto:UserDto): Promise<any>{
        return await this.authService.registerUser(UserDto)
    }

    @Post('/login')
    async login(@Body() userDto:UserDto, @Res() res: Response): Promise<any>{
        const jwt =await this.authService.validateUser(userDto)
        res.setHeader('Authorization', 'Bearer '+jwt.accessToken)
       return res.json(jwt)
    }

    @Get('/authenticate')
    @UseGuards(AuthGuard())
    isAuthenticated(@Req() req:Request): any{
        const user: any = req.user
        return user
    }
}
