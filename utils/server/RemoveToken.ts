import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongoose'
import { NextApiRequest, NextApiResponse } from 'next'
import Token from '../../models/Token'
import { JWT_SECRET, SESSION_EXPIRE_TIME_IN_MS } from '../config'
import { ETokenType } from '../types/types'
import connectDb from './connectDb'
import cookie from 'cookie'

type TToken = {
  name: string
  type: ETokenType
  userId: ObjectId
  req: NextApiRequest
  res: NextApiResponse
}

const removeToken = async ({
  name,
  type,
  userId,
  req,
  res,
}: TToken): Promise<void> =>
  new Promise(async (resolve, reject) => {
    try {
      if (!SESSION_EXPIRE_TIME_IN_MS)
        reject('SESSION_EXPIRE_TIME_IN_MS environmental variable not found')

      await connectDb()

      // delete token in database
       await Token.findOneAndDelete({ type, userId });
        
      // set cookie passing the jwt token
      res.setHeader(
        'Set-Cookie',
        cookie.serialize(name, 'session expired', {
          httpOnly: true,
          sameSite: true,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          maxAge: Date.now(), // in seconds
        })
      )
        resolve()
    } catch (error) {
      reject(error)
    }
  })

export default removeToken
