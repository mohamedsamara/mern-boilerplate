import { genSaltSync, hashSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export function hashPassword(password: string): string {
  const salt = genSaltSync(12);
  const hashedPassword = hashSync(password, salt);
  return hashedPassword;
}

export function createToken(user: any) {
  const payload = {
    id: user._id,
    email: user.email,
  };

  const secret = process.env.SECRET_KEY;

  const signedToken = sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
  return signedToken;
}
