import User from '../models/User.js';

export async function updateUserRole(data) {
  const {params, body} = data;
  const role = body.role;
  const username = params.username;
  if (role && username) {
    const filter = {username};
    return await User.findOneAndUpdate(filter,
        {role},
        {new: true}).exec();
  }
}