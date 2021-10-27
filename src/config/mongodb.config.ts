import { registerAs } from '@nestjs/config';

export default registerAs('mongodb', () => {
    return {
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/nestjs-test',
    };
});
