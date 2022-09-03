import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './security/passport.jwt.strategy';
import { UserRepository } from './repository/user.repository';
import { UserService } from './user.service';


@Module({
  imports:[TypeOrmModule.forFeature([UserRepository]),
          JwtModule.register({
                              secret: 'SECRET_KEY',
                              signOptions: {expiresIn: '300s'}
}),
          PassportModule.register({defaultStrategy:'jwt'})],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy],
  exports :[TypeOrmModule, AuthService]
})
export class AuthModule {}
