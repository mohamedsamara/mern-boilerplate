import { Strategy, ExtractJwt } from 'passport-jwt';
import { Container } from 'typedi';
import * as passport from 'passport';

import UserService from './user.service';
import config from '../config/keys';

const userService = Container.get(UserService);

class PassportService {
  private passport: any;

  public secret: string = config.jwt.secret;

  constructor() {
    this.passport = passport;
  }

  public init() {
    const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: this.secret,
    };

    const strategy = new Strategy(opts, (jwtPayload, done) => {
      const user = userService.findById(jwtPayload._id);

      if (user) {
        return done(null, user);
      }
      return done(null, false);
    });

    this.passport.use(strategy);
  }
}

export default PassportService;
