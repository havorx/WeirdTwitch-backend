import User from '../models/User.js';

export async function updateUser(data) {
  try {
    if (data) {
      const filter = {username: data.userID};
      const query = {
        ...data,
      };
      return await User.findByIdAndUpdate(filter, query).exec();
    } else {
      return 'invalid input';
    }
  } catch (err) {
    next(err);
  }
}

export async function getAllUser() {
  const filter = {};
  const users = await User.find(filter).populate('category').exec();
  if (users) {
    return users;
  } else {
    return {'message': 'not found'};
  }
}

export async function getUserDetail(username) {
  const filter = {username} ? {username} : {};
  const user = await User.findOne(filter).populate('category').exec();
  if (user) {
    return user;
  } else {
    return {'message': 'user not existed'};
  }
}

export async function addCategoryToUser(data) {
  if (!data) {
    return 'invalid input';
  }
  const userID = data.userID;
  const user = await User.findByIdAndUpdate(userID,
      {category: this.category.push(data.category)}).exec();
  if (user) {
    return user;
  } else {
    return 'user not found';
  }
}

export async function deleteUser(data) {
  if (!data) {
  }
  const user = await User.findByIdAndDelete(data.ID).exec();
  return user ? user : {'message': 'user not found'};
}

export async function addCreditToUser(data) {
  if (!data) {
    return 'invalid input';
  }
  const user = await User.findByIdAndUpdate(data.userID, {
    credits: this.credits + data.credits,
  }).exec();
  if (user) {
    return user;
  } else {
    return {'message': 'user not found'};
  }
}
