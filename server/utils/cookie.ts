import { Response } from 'express';

import config from '../config/keys';

const { refreshTokenLife } = config.jwt;

export function set(res: Response, refreshToken: string) {
  res.cookie('refresh_token', refreshToken, {
    maxAge: refreshTokenLife * 60 * 1000,
    httpOnly: true,
    secure: false,
  });
}

export function remove(res: Response) {
  res.cookie('refresh_token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
}
