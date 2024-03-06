import config from 'config';
import mongoose from 'mongoose';

const host = config.get<string>('mongo.host')
const port = config.get<number>('mongo.port')
const database = config.get<string>('mongo.database')

mongoose.connect(`mongodb://${host}:${port}/${database}`);

export default mongoose;