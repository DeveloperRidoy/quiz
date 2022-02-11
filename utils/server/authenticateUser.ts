import { IncomingMessage } from "http";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config";
import connectDb from "./connectDb";
import Token from "../../models/Token";
import User from "../../models/User";
import { ETokenNames } from "../types/types";

const authenticateUser = (req: IncomingMessage & {
    cookies: NextApiRequestCookies;
}): Promise<any> => new Promise(async (resolve, reject) => {
    {
      try {
        // check environmental variable
        if (!JWT_SECRET) reject('JWT_SECRET environmental variable not found')

        // check token
          const token = req.cookies[ETokenNames.AUTH_TOKEN];
        if (!token) resolve(null)

        // check if token is valid
        const verifiedToken = jwt.verify(token, String(JWT_SECRET)) as any
        if (!verifiedToken) resolve(null)

        // check if token contains tokenId
        const tokenId = verifiedToken.tokenId
        if (!tokenId) resolve(null)

        // connect to database
        await connectDb()

        // check if token exists in database
        const dbToken = (await Token.findById(tokenId).lean()) as any
        if (!dbToken) resolve(null)

        // check if user exists with the dbTken
        const user = await User.findById(dbToken.userId).lean();
        if (!user) resolve(null)

        // check if password was changed after starting this session
          const passwordChanged =
          (user.passwordChangedAt - verifiedToken.iat * 1000) > 0 
          if (passwordChanged) resolve(null);

        // remove sensitive data 
          user.passwordChangedAt = undefined; 
          user.updatedAt = undefined; 
          user.__v = undefined;
            
        // return authenticated user
          return resolve(user);
      } catch (error) {
          resolve(null)
      }
    }
})


export default authenticateUser;