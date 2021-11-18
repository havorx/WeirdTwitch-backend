import jwt from 'jsonwebtoken';
import passport from 'passport';

const dev = process.env.NODE_ENV !== 'production';

export const cookieOptions = {
  httpOnly: true,
  // Since localhost is not having https protocol,
  // secure cookies do not work correctly (in postman)
  secure: !dev,
  signed: true,
  maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
  sameSite: 'none',
};

export function getToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: eval(process.env.SESSION_EXPIRY),
  });
}

export function getRefreshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY),
  });
}

export const verifyUser = passport.authenticate('jwt', {session: false});
