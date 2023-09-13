import { Controller, UseGuards, Get, Req, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { GoogleRequest } from './strategies/google.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { dayInMs } from 'src/constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  login() {
    // As this method is protected by Google Auth guard, it will trigger Google SSO flow
    return;
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async redirect(
    @Req() req: GoogleRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const token = await this.authService.signIn(req.user);

    res.cookie('access_token', token, {
      maxAge: dayInMs * 30,
      httpOnly: true,
      sameSite: 'lax',
    });

    res.status(200);

    return { msg: 'ok' };
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  user(@Req() request: GoogleRequest) {
    if (request.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }
}
