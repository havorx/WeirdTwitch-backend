import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Room = new Schema({
  // _id: Schema.Types.ObjectId,
  roomID: {
    type: Number,
    required: true,
    max: 999999999,
    unique: true,
  },
  roomName: {
    type: String,
    required: true,
    max: 256,
  },
  roomStatus: {
    type: Number,
    required: true,
    max: 1,
  },
  roomLanguage: {
    type: Number,
    required: true,
    max: 1,
  },
    roomHost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
});

export default mongoose.model('Room', Room);
