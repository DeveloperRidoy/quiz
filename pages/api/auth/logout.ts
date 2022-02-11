import { NextApiResponse } from 'next'
import AppError from '../../../utils/server/AppError'
import nc from '../../../utils/server/middlewares/nc'
import {
  ETokenNames,
  ETokenType,
  IApiResponse,
  ExtendedNextApiRequest,
} from '../../../utils/types/types'
import protect from '../../../utils/server/middlewares/protect'
import removeToken from '../../../utils/server/RemoveToken'

const logout = async (req: ExtendedNextApiRequest, res: NextApiResponse, next: any) => {
    
    // expecting user to be injected in req from protect middleware
    const user = req.user;
    
    if(!user) return next(new AppError(401, 'not logged in'))
//  expire session
   await removeToken({
    name: ETokenNames.AUTH_TOKEN,
    type: ETokenType.AUTH,
    userId: user._id,
    req,
    res,
  })

  return res.json(<IApiResponse>{
    status: 'success',
    message: 'logged out',
  })
}

const handler = nc().use(protect()).put(logout)

export default handler
