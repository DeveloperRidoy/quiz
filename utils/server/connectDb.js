import mongoose from 'mongoose'; 
import { MONGODB_URI } from '../config';

if (!MONGODB_URI) throw new Error('please add MONGODB_URI string in your environmental variables');

let cached = global.mongoose; 

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}
 

export default async function connectDb() {
  if (cached.conn) return cached.conn;
  
  if (!cached.conn) {
    cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false }).then(mongoose => mongoose);
  }

  cached.conn = await cached.promise;
  
  return cached.conn;
}