import { NextApiRequest, NextApiResponse } from "next";
import { IApiResponse } from "../../utils/types/types";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    return res
      .status(404)
      .json(<IApiResponse>{ status: 'fail', message: 'resource not found' })
}