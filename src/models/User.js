import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import passport from 'passport';

const Schema = mongoose.Schema;

const Session = new Schema({
  refreshToken: {
    type: String,
    default: '',
  },
});

const User = new Schema({
/*  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },*/
  authStrategy: {
    type: String,
    default: 'local',
  },
  refreshToken: {
    type: [Session],
  },
});

//Remove refreshToken from the response to client
User.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.refreshToken;
    return ret;
  },
});

User.plugin(passportLocalMongoose);


export default mongoose.model('User', User);
