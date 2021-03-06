import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Category = new Schema({
  categoryName: {
    type: String,
    unique: true,
    required: true,
  },

  description: {
    type: String,
    unique: true,
    required: true,
  },
  followers: {
    type: Number,
    default: 0,
  }
});

export default mongoose.model('Category', Category);
