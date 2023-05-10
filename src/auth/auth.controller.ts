import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: Record<string, any>,
    @Req() request: Request,
  ) {
    console.log(request.cookies);
    const loggedInData = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    const { access_token, refresh_token } = loggedInData;
    request.res.setHeader('Set-Cookie', [access_token, refresh_token]);
    return 'Login OK';
  }
}
