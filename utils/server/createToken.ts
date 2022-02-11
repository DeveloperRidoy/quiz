import jwt from 'jsonwebtoken';
import { ObjectId } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import Token from "../../models/Token";
import { JWT_SECRET, SESSION_EXPIRE_TIME_IN_MS } from '../config';
import { ETokenType } from "../types/types";
import connectDb from "./connectDb";
import cookie from 'cookie';

type TToken = { name: string, type: ETokenType, userId: ObjectId, req: NextApiRequest, res: NextApiResponse };

const createToken = async ({ name, type, userId, req, res }: TToken) : Promise<string> => new Promise(async (resolve, reject) => {
    try {

      if (!SESSION_EXPIRE_TIME_IN_MS) reject('SESSION_EXPIRE_TIME_IN_MS environmental variable not found');

      await connectDb()
      if(!SESSION_EXPIRE_TIME_IN_MS) reject('SESSION_EXPIRE_TIME_IN_MS environmental variable not found')
      const expireTime = Number(SESSION_EXPIRE_TIME_IN_MS)
      const expireDate = new Date(Date.now() + expireTime)

      // create token in database
      const token = await Token.findOneAndUpdate(
        { type, userId },
        { $set: { type, userId, expiresAt: expireDate } },
        { new: true, upsert: true }
      )

      // create jwt token passing the token id
      const jwtToken = jwt.sign({ tokenId: token._id }, String(JWT_SECRET), {
        expiresIn: expireTime,
      })

      // set cookie passing the jwt token
      res.setHeader(
        'Set-Cookie',
        cookie.serialize(name, jwtToken, {
          httpOnly: true,
          sameSite: true,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          maxAge: expireTime / 1000, // in seconds
        })
      )

      // return jwt token
     return resolve(jwtToken);
 } catch (error) {
     reject(error)
 }
})


export default createToken;
