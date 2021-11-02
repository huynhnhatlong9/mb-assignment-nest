import { registerAs } from '@nestjs/config';
export default registerAs('mongodb', () => {
  return {
    uri:
      process.env.MONGO_URI ||
      'mongodb+srv://bk4l:bk4l@bk4l.nrrll.mongodb.net/nestjs-test?retryWrites=true&w=majority',
  };
});
