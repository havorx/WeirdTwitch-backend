import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Room = new Schema({
  roomName: {
    type: String,
    required: true,
    max: 256,
  },
  roomCategory: {
    type: String,
    required: true,
    max: 1000,
  },
  description: {
    type: String,
    required: true,
    max: 1000,
  },
  roomHost: {
    type: String,
    required: true,
  },
  members: {
    type: [{type:Schema.Types.ObjectId, ref: 'User'}],
  }
});

export default mongoose.model('Room', Room);
