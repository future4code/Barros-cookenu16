import { BaseDatabase } from "./BaseDatabase";

export class FollowsDatabase extends BaseDatabase {
    TABLE_NAME = 'Cokenu_Follows'
    followUser = async (inputData:any)=>{
        try {
            const{id, idUser, idFollow} = inputData
            await FollowsDatabase.connection(this.TABLE_NAME)
                .insert({
                    id,
                    idUser,
                    idFollow
                })
        } catch (error:any) {
          throw new Error(error.message);
        }
    }

    verifyIdExist = async (idUser:string)=>{
        try {
            
            const result = await FollowsDatabase.connection
                .select()
                .from('Users')
                .where({id: idUser})
                
            return result  
              
        } catch (error:any) {
            throw new Error(error.message);
            
        }
    }

}