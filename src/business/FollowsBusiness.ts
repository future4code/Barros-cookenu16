import { Authenticator } from './../services/Authenticator';
import { FollowsDatabase } from './../database/FollowsDatabase';
import { PleaseInsert, UserNotFound, TokenNotInserted, NotAuthorized } from './../error/errors';
import { IdGenerator } from "../services/idGenerator";

export class FollowsBusiness{
    followDatabase = new FollowsDatabase()
    authenticator = new Authenticator()

    followUser = async (input:any, inToken: string)=>{
       try {

        const token = this.authenticator.getTokenData(inToken)
        if(!token) throw new NotAuthorized()

        const {idUser, idFollow} = input;

        if(!idUser || !idFollow) throw new PleaseInsert();

        const verify = await this.followDatabase.verifyIdExist(idFollow)
        if(verify.length !== 1) throw new UserNotFound();
        
        const id = IdGenerator.ID()

        const inputData:any = {
            id,
            idUser,
            idFollow
        }

        
        await this.followDatabase.followUser(inputData)
        return verify
        
       } catch (error:any) {
            throw new Error(error.message);
            
       }
    }
}