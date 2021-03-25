import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ContractSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  contractNumber: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  summ: {
    type: Number,
    required: true,
  },
  validity: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
});
