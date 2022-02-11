import { NextApiRequest, NextApiResponse } from "next";
import AppError from "../../../utils/server/AppError";
import connectDb from "../../../utils/server/connectDb";
import createToken from "../../../utils/server/createToken";
import nc from "../../../utils/server/middlewares/nc";
import verifyGoogleOauth from "../../../utils/server/verifyGoogleOauth";
import isEmail from "../../../utils/isEmail";
import { EAuthType, ETokenNames, ETokenType, IApiResponse } from "../../../utils/types/types";
import bcrypt from 'bcrypt';
import User from "../../../models/User";

const login = async (req: NextApiRequest, res: NextApiResponse, next: any) => {
  let { type, email, password, tokenId } = req.body
  let user: any, auth_token: any

  // check login type
  if (!type) return next(new AppError(400, 'type is required'))
  if (type !== EAuthType.DEFAULT && type !== EAuthType.GOOGLE)
    return next(
      new AppError(
        400,
        `type must be either ${EAuthType.DEFAULT} or ${EAuthType.GOOGLE}`
      )
    )

  // for default login
  if (type === EAuthType.DEFAULT) {
    // check required fields
    if (!email) return next(new AppError(400, 'email is required'))
    if (!isEmail(email))
      return next(new AppError(400, 'not a valid email address'))
    if (!password) return next(new AppError(400, 'password is required'))

    // connect to database
    await connectDb()

    //   check if user exists
    const existingUser = await User.findOne({ email }).select('+password')
    if (!existingUser) return next(new AppError(404, 'user not found'))

    //   check if password is correct
    const passwordVerified = await bcrypt.compare(
      password,
      existingUser.password
    )
    if (!passwordVerified) return next(new AppError(400, 'incorrect password'))

    user = existingUser
  }

  // for google login
  if (type === EAuthType.GOOGLE) {
    if (!tokenId) return next(new AppError(400, 'tokenId is required'))

    const { email } = await verifyGoogleOauth({ tokenId })

    // connect to database
    await connectDb()

    //   check if user exists
    const existingUser = await User.findOne({ email })
    if (!existingUser) return next(new AppError(404, 'user not found'))

    user = existingUser
  }

  // init session
  auth_token = await createToken({
    name: ETokenNames.AUTH_TOKEN,
    type: ETokenType.AUTH,
    userId: user._id,
    req,
    res,
  })

  return res.json(<IApiResponse>{
    status: 'success',
    message: 'login successful',
    data: {
      user,
      auth_token,
    },
  })
}


const handler = nc().post(login)


export default handler;
