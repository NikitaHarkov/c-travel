import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ContractSchema = new Schema({
  date: {
    type: Date,
  },
  contractNumber: {
    type: String,
  },
  fullName: {
    type: String,
  },
  summ: {
    type: Number,
  },
  validity: {
    type: Date,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  status: {
    type: String
  },
  comment: {
    type: String,
  },
});
