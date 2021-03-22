import mongoose from 'mongoose';

const connectDB = () => {
  mongoose.Promise = global.Promise;
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
};

export default connectDB;
