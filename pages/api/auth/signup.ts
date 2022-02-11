import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import AppError from "../../../utils/server/AppError";
import connectDb from "../../../utils/server/connectDb";
import createToken from "../../../utils/server/createToken";
import nc from "../../../utils/server/middlewares/nc";
import verifyGoogleOauth from "../../../utils/server/verifyGoogleOauth";
import { genString } from "../../../utils/genString";
import { EAuthType, ETokenNames, ETokenType, IApiResponse } from "../../../utils/types/types";

const signUp = async (req: NextApiRequest, res: NextApiResponse, next: any) => {
  
  let { type, name, email, password, photo, tokenId } = req.body;
  
  // check signup type
  if (!type) return next(new AppError(400, 'type is required'));
  if (type !== EAuthType.DEFAULT && type !== EAuthType.GOOGLE) return next(new AppError(400, `type must be either ${EAuthType.DEFAULT} or ${EAuthType.GOOGLE}`));

  // for default signup
  if (type === EAuthType.DEFAULT) {
    // check required fields
    if (!name) return next(new AppError(400, 'name is required'))
    if (!email) return next(new AppError(400, 'email is required'))
    if (!password) return next(new AppError(400, 'password is required'))
  } 

  // for google signup
  if (type === EAuthType.GOOGLE) {
    if (!tokenId) return next(new AppError(400, 'tokenId is required'))
    
    const payload = await verifyGoogleOauth({ tokenId })
    name = payload.name
    email = payload.email
    photo = payload.picture
    password = genString(6); 
    
  }

  // connect to database 
  await connectDb() 

  // create user 
  const user = await User.create({ name, email, password, photo });

  // init session 
  const auth_token = await createToken({ name: ETokenNames.AUTH_TOKEN, type: ETokenType.AUTH, userId: user._id, req, res });
  
  return res.json(<IApiResponse>{
    status: 'success',
    message: 'signup successful',
    data: {
      user,
      auth_token
    },
  })  
}

const handler = nc().post(signUp);
    



export default handler;