import { FollowsDatabase } from './../database/FollowsDatabase';
import { PleaseInsert, UserNotFound } from './../error/errors';
import { IdGenerator } from "../services/idGenerator";
import { log, table } from 'console';

export class FollowsBusiness{
    followDatabase = new FollowsDatabase()

    followUser = async (input:any)=>{
       try {
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