import { Controller, Get, UseGuards } from '@nestjs/common';
import JwtAccessCookieGuard from 'src/auth/guards/JwtAccessCookieGuard';

@Controller('users')
export class UsersController {
  constructor() {}

  @UseGuards(JwtAccessCookieGuard)
  @Get()
  getAll() {
    return 'Listado de usuarios!';
  }
}
