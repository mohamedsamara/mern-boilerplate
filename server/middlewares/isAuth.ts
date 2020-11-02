import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { Container } from 'typedi';

import Responder from '../helpers/responder';

import config from '../config/keys';

const responder = Container.get(Responder);

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { accessTokenSecret } = config.jwt;

    const { authorization } = req.headers;

    if (!authorization) {
      responder.error(
        401,
        'Sorry, you are not authorized to access this resource.',
      );
      return responder.send(res);
    }

    const token = authorization.split(' ')[1];

    const payload = verify(token, accessTokenSecret);

    req.payload = payload;

    return next();
  } catch (error) {
    responder.error(
      401,
      'Sorry, you are not authorized to access this resource.',
    );
    return responder.send(res);
  }
};
