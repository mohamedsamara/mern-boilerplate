import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import * as passport from 'passport';
import { Container } from 'typedi';

import Responder from '../helpers/responder';
import config from '../config/keys';

const responderInstance = Container.get(Responder);

export function hashPassword(password: string): string {
  const salt = genSaltSync(12);
  const hashedPassword = hashSync(password, salt);
  return hashedPassword;
}

export function verifyPassword(password: any, hashedPassword: any): boolean {
  return compareSync(password, hashedPassword);
}

export function createToken(user: any) {
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

export function createRefreshToken(user: any) {
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

export async function verifyRefreshToken(refreshToken: any) {
  const { refreshSecret } = config.jwt;

  // try {
  //   const payload = verify(refreshToken, refreshSecret);
  //   return payload;
  // } catch (error) {
  //   console.log('error', error);

  //   return error;
  // }

  try {
    return await verify(refreshToken, refreshSecret);
  } catch (error) {
    return false;
    // throw error;
  }
}

export function verifyRoute(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('jwt', (error, user) => {
    if (error) {
      responderInstance.setError(
        401,
        'Sorry, you are not authorized to access this resource.',
        'unauthorized',
      );
      return responderInstance.send(res);
    }
    if (!user) {
      responderInstance.setError(
        401,
        'Sorry, you are not authorized to access this resource.',
        'unauthorized',
      );
      return responderInstance.send(res);
    }
    return next();
  })(req, res, next);
}
