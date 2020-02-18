import * as fs from 'fs';

const path = '../../env';

if (fs.existsSync(path)) {
  throw new Error("Couldn't find .env file");
}

export default {
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
  },
};
