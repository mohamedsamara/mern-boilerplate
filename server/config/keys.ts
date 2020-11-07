import * as fs from 'fs';

const path = '../../env';

if (fs.existsSync(path)) {
  throw new Error("Couldn't find .env file");
}

export default {
  app: {
    name: 'Mern Boilerplate',
  },
  port: process.env.PORT,
  database: {
    url: process.env.MONGO_URI,
  },
  api: {
    prefix: '/api',
  },
  password: {
    tokenExpire: Date.now() + 3600000,
  },
  jwt: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET_KEY,
    accessTokenLife: '1d',
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET_KEY,
    refreshTokenLife: '7d',
    cookieMaxAge: 7 * 24 * 60 * 60,
  },
  mailgun: {
    key: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_DOMAIN,
    sender: process.env.MAILGUN_EMAIL_SENDER,
  },
};
