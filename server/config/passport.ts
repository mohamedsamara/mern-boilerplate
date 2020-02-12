import { Strategy, ExtractJwt } from 'passport-jwt';
import { Container } from 'typedi';

import UsersService from '../services/users.service';

const usersServiceInstance = Container.get(UsersService);

class PassportConfig {
  public passport: any;

  public secret: string = process.env.SECRET_KEY;

  constructor(passport: any) {
    this.passport = passport;
  }

  public init() {
    const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: this.secret,
    };

    const strategy = new Strategy(opts, (jwtPayload, done) => {
      const user = usersServiceInstance.findById(jwtPayload._id);

      if (user) {
        return done(null, user);
      }
      return done(null, false);
    });

    this.passport.use(strategy);
  }
}

export default PassportConfig;
