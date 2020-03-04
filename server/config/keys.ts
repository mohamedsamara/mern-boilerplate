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
  jwt: {
    secret: process.env.SECRET_KEY,
    tokenLife: '15m',
    refreshSecret: process.env.REFRESH_SECRET_KEY,
    refreshTokenLife: 60 * 24 * 30,
  },
  mailgun: {
    key: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_DOMAIN,
    sender: process.env.MAILGUN_EMAIL_SENDER,
  },
};
