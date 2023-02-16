import { BaseDatabase } from "../database/BaseDatabase";

export class VerifyUser extends BaseDatabase{
    
    TABLE_NAME = 'Users'
    VerifyUserByID = async (idUser:string)=>{
        try {
            
            const result = await VerifyUser.connection
                .select()
                .from(this.TABLE_NAME)
                .where({id: idUser})
                
            return result  
              
        } catch (error:any) {
            throw new Error(error.message);
            
        }
    }
}