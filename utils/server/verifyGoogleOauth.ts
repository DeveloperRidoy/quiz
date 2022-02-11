import { OAuth2Client, TokenPayload } from "google-auth-library"
import { ouathClientId } from "../config"
import connectDb from "./connectDb"

const verifyGoogleOauth = ({tokenId}: {tokenId: string}): Promise<TokenPayload> => new Promise(async (resolve, reject) => {
    try {
        await connectDb()

        const client = new OAuth2Client(ouathClientId)

        const ticket = await client.verifyIdToken({
          idToken: tokenId,
          audience: ouathClientId,
        })

        const payload = ticket.getPayload() as TokenPayload;

        if(!payload) reject('invalid google oauth token')
        resolve(payload)
 
    } catch (error) {
        reject(error)
    }
})


export default verifyGoogleOauth;
