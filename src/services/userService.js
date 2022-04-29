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
  if (!data) return {message: 'invalid input'};

  const user = await User.findByIdAndDelete(data.ID).exec();
  return user ? user : {message: 'user not found'};
}

export async function processCreditToUser(data) {
  const {credits, userID} = data;
  if (!credits && !userID) return {message: 'invalid input'};

  const user = await User.findOneAndUpdate(
      {_id: userID, credits: {$gte: credits}}, {
        $inc: {credits: +credits},
      }, {new: true}).exec();

  const u = await User.findOne({_id: userID, credits: {$gte: credits}}).exec();
  console.log(u);
  if (!user) return {message: 'user not found'};
  return user;
}
