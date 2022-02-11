import {  NextApiResponse } from "next";
import { ExtendedNextApiRequest } from "../../types/types";
import AppError from "../AppError";
import authenticateUser from "../authenticateUser";

const protect = (roles?: string[]) => async (req: ExtendedNextApiRequest, res: NextApiResponse, next: any): Promise<void> => {
    
    // authenticate user
    const user = await authenticateUser(req);
    if (!user) return next(new AppError(401, 'not authorized')); 

    // restrict to specific roles 
    if (Number(roles?.length) > 0) {
        const userAllowed = roles?.some((role) => role === user.role);
        if (!userAllowed) return next(new AppError(401, 'not authorized'));
    }

    // inject user to request 
    req.user = user;

    // proceed to next middleware
    return next();
}

export default protect;

