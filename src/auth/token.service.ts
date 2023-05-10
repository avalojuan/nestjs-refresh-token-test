import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TokenService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async refreshAccessToken() {}
}
