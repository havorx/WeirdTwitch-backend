import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../models/User.js';

const dev = process.env.NODE_ENV !== 'production';

export const cookieOptions = {
  httpOnly: true, // Since localhost is not having https protocol,
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

export async function refreshToken(data) {
  const {refreshToken} = data;
  if (refreshToken) {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const userID = payload._id;
    const user = await User.findById(userID).exec();
    if (user) {
      // Find the refresh token against the user record in database
      const refreshTokenIndex = user.refreshToken.findIndex(
          item => item.refreshToken === refreshToken);
      if (refreshTokenIndex !== -1) {
        const token = getToken({
          _id: user._id, username: user.username, role: user.role,
        });
        // If the refresh token exists, then create new one and replace it.
        const newRefreshToken = getRefreshToken({_id: userID});
        user.refreshToken[refreshTokenIndex] = {refreshToken: newRefreshToken};
        await user.save();
        return {
          status: 200,
          message: 'success',
          token,
          refreshToken: newRefreshToken,
        };
      } else {
        return {status: 404, message: 'refreshToken not found'};
      }
    } else {
      return {status: 404, message: 'user not found'};
    }
  } else {
    return {status: 400, message: 'no refreshToken in request'};
  }
}

export async function signupUser(data) {
  const newUser = new User({
    username: data.username, role: null, fullName: data.fullName,
  });
  const user = await User.register(newUser, data.password);
  if (user) {
    const token = getToken({
      _id: user._id, username: user.username, role: user.role,
    });
    const refreshToken = getRefreshToken({_id: user._id});
    user.refreshToken.push({refreshToken});
    await user.save();
    return {
      data: {
        token, role: user.role, username: user.name, credits: user.credits,
        userID: user._id,
      },
      message: 'success',
    };
  }
}

export async function loginUser(data) {
  const _id = data._id;
  const role = data.role;
  if (_id) {
    const user = await User.findById(_id).exec();
    if (user) {
      const token = getToken({_id, role});
      const refreshToken = getRefreshToken({_id});
      user.refreshToken.push({refreshToken});
      await user.save();
      return {
        data: {
          refreshToken,
          token,
          userID: user._id,
          role: user.role,
          credits: user.credits,
        }, status: 200,
      };
    } else {
      return {status: 401, message: 'user not found'};
    }
  } else {
    return {status: 400, message: 'missing userID'};
  }
}

export async function logoutUser(data) {
  const {refreshToken, userID} = data;
  const user = await User.findById(userID).exec();
  if (user) {
    const tokenIndex = user.refreshToken.findIndex(
        item => item.refreshToken === refreshToken);
    if (tokenIndex !== -1) {
      console.log(user.refreshToken.id(user.refreshToken[tokenIndex]._id));
      user.refreshToken.id(user.refreshToken[tokenIndex]._id).remove();
    }
    await user.save();
    return {message: 'success'};
  }
}

export const verifyUser = passport.authenticate('jwt', {session: false});
export const login = passport.authenticate('local');
