import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Room = new Schema({
  // _id: Schema.Types.ObjectId,
/*  roomID: {
    type: Number,
    required: true,
    max: 999999999,
    unique: true,
  },*/
  roomName: {
    type: String,
    required: true,
    max: 256,
  },
  roomLanguage: {
    type: Number,
    required: true,
    max: 1,
  },
  description: {
    type: String,
    required: true,
    max: 1000,
  },
});

export default mongoose.model('Room', Room);
