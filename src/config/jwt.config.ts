import 'dotenv/config';

export const jwtConfig = {
  secret: process.env.JWT_SECRETKEY,
  expiresIn: process.env.EXPIRES_IN || '24h',
};
