import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

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
    },*/
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  fullName: {
    type: String,
    default: '',
  },
  credits: {
    type: Number,
    default: 0,
  },
  role: {
    type: String,
    default: null,
  },
  category: {
    type: [{type:Schema.Types.ObjectId, ref: 'Category'}],
  },
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
