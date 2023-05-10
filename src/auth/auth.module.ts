import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { JwtRefreshTokenStrategy } from './strategy/JwtRefreshStrategy';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [AuthService, TokenService, JwtRefreshTokenStrategy],
  controllers: [AuthController, TokenController],
  exports: [AuthService],
})
export class AuthModule {}
