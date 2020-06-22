import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import * as passport from 'passport';
import * as crypto from 'crypto';
import { Container } from 'typedi';

import { IUser } from '../types/user.types';
import Responder from '../helpers/responder';
import config from '../config/keys';

const responder = Container.get(Responder);

export function hashPassword(password: string): string {
  const salt = genSaltSync(12);
  return hashSync(password, salt);
}

export function verifyPassword(
  password: string,
  hashedPassword: string,
): boolean {
  return compareSync(password, hashedPassword);
}

export function createToken(user: IUser) {
  const { secret, tokenLife } = config.jwt;

  const payload = {
    id: user._id,
  };

  const signedToken = sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: tokenLife,
  });
  return signedToken;
}

export function createRefreshToken(user: IUser) {
  const { refreshSecret, refreshTokenLife } = config.jwt;

  const payload = {
    id: user._id,
    refresh_token: user.refresh_token,
  };

  const signedToken = sign(payload, refreshSecret, {
    algorithm: 'HS256',
    expiresIn: refreshTokenLife,
  });

  return signedToken;
}

export async function createResetToken() {
  try {
    const buffer = await crypto.randomBytes(48);

    return buffer.toString('hex');
  } catch (error) {
    throw error;
  }
}

export async function verifyRefreshToken(refreshToken: string) {
  const { refreshSecret } = config.jwt;
  try {
    const payload = await verify(refreshToken, refreshSecret);

    return payload;
  } catch (error) {
    return false;
  }
}

export function verifyRoute(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('jwt', (error, user) => {
    console.log('user', user);

    if (error) {
      responder.error(
        401,
        'Sorry, you are not authorized to access this resource.',
      );
      return responder.send(res);
    }
    if (!user) {
      responder.error(
        401,
        'Sorry, you are not authorized to access this resource.',
      );
      return responder.send(res);
    }
    return next();
  })(req, res, next);
}
