import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import * as passport from 'passport';
import * as crypto from 'crypto';
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

export async function createResetToken() {
  try {
    const buffer = await crypto.randomBytes(48);

    return buffer.toString('hex');
  } catch (error) {
    throw error;
  }
}

export async function verifyRefreshToken(refreshToken: any) {
  const { refreshSecret } = config.jwt;
  try {
    return await verify(refreshToken, refreshSecret);
  } catch (error) {
    return false;
  }
}

export async function getUser(req: Request) {
  const { secret } = config.jwt;

  try {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    return await verify(token, secret);
  } catch (error) {
    return false;
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
