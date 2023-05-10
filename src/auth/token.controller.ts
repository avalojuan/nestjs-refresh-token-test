import { Controller, Post, Req, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';

@Controller()
export class TokenController {
  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UsersService,
  ) {}

  @Post('refresh')
  async refreshAccessToken(@Req() request: Request) {
    const { cookies } = request;
    if (!cookies.Refresh) {
      throw new UnauthorizedException({
        message: 'Invalid Refresh Token',
        cookies: cookies,
      });
    }
    try {
      const payload = await this.jwtService.verifyAsync(cookies.Refresh, {
        secret: this.configService.get('REFRESH_TOKEN_HASH'),
      });
      const access_token = this.authService.getCookieWithJwtAccessToken({
        username: payload.username,
        sub: payload.sub,
      });
      request.res.setHeader('Set-Cookie', access_token);
      return { message: 'Se renovo el access_token', cookies: cookies };
    } catch (err) {
      throw new UnauthorizedException({
        message: 'Invalid Refresh Token',
        cookies: cookies,
        err,
      });
    }
  }
}
