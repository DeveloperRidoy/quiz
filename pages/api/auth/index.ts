import { NextApiRequest, NextApiResponse } from "next";
import AppError from "../../../utils/server/AppError";
import authenticateUser from "../../../utils/server/authenticateUser";
import nc from "../../../utils/server/middlewares/nc";
import { IApiResponse } from "../../../utils/types/types";


const auth = async (req: NextApiRequest, res: NextApiResponse, next: any): Promise<void> => {
    const user = await authenticateUser(req);
    if (!user) return next(new AppError(401, 'not authorized'));
    return res.json(<IApiResponse>{
        status: 'success', 
        message: 'successfully authenticated user', 
        data: {
            user
        }
    })
}



const handler = nc().get(auth)

export default handler;