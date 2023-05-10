import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(username, pass) {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.userId };
    const access_token = this.getCookieWithJwtAccessToken(payload);
    const refresh_token = this.getCookieWithJwtRefreshToken(payload);
    return {
      access_token,
      refresh_token,
    };
  }

  public getCookieWithJwtAccessToken(payload: any) {
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('ACCESS_TOKEN_HASH'),
      expiresIn: `${this.configService.get('ACCESS_TOKEN_EXPIRATION')}`,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'ACCESS_TOKEN_EXPIRATION',
    )}`;
  }

  public getCookieWithJwtRefreshToken(payload: any) {
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('REFRESH_TOKEN_HASH'),
      expiresIn: `${this.configService.get('REFRESH_TOKEN_EXPIRATION')}`,
    });
    return `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'REFRESH_TOKEN_EXPIRATION',
    )}`;
  }
}
