import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

import { RegisterUserDto } from '../dto/user.dto';

export type GoogleRequest = Request & {
  user: RegisterUserDto;
};

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<RegisterUserDto | null> {
    if (profile?.emails === undefined || profile?.photos === undefined) {
      return null;
    }

    const user: RegisterUserDto = {
      name: profile.displayName,
      email: profile?.emails?.[0].value,
      image: profile?.photos?.[0].value,
    };

    return user || null;
  }
}
