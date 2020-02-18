import { Response } from 'express';

import config from '../config/keys';

const { refreshTokenLife } = config.jwt;

export function setCookie(res: Response, refreshToken: any) {
  res.cookie('refresh_token', refreshToken, {
    maxAge: refreshTokenLife * 60 * 1000,
    httpOnly: true,
    secure: false,
  });
}
