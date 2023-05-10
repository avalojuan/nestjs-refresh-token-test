import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtAccessCookieGuard extends AuthGuard(
  'jwt-access-token',
) {}
