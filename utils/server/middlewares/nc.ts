import mongoose from "mongoose";
import { NextApiResponse } from "next";
import nextConnect from "next-connect";
import { IApiResponse } from "../../types/types";

const nc = () =>
  nextConnect({
    onError: (err, req, res: NextApiResponse, next) => {

      let statusCode = err.code;
      let message = err.message;

      // catch mongoose validation errors
      if (err instanceof mongoose.Error.ValidationError) {
        statusCode = 400; 
        message = Object.values(err.errors)[0].message;
      }       
      
      const expectedStatusCodes: number[] = [400, 401, 403, 404, 500];
      const expected = expectedStatusCodes.some(code => code === statusCode);

      // return server error response on unexpected errors
      if (!expected) {
        statusCode = 500; 
        message = 'server error'
      }

      return res
        .status(statusCode)
        .json(<IApiResponse>{
          status: 'fail',
          message
        })
    }
  })

export default nc;