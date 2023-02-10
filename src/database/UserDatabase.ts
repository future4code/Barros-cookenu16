import { User, loginDTO } from './../model/Users';
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    TABLE_NAME = 'Users'

    signup = async (input:User)=>{
        try {
            await UserDatabase.connection
                .insert(input)
                .into(this.TABLE_NAME)
        } catch (error:any) {
            throw new Error(error.message);
            
        }
    }

    findUserByEmail = async (email:string)=>{
        try {
           const result =  await UserDatabase.connection  
                .select()
                .from(this.TABLE_NAME)
                .where({email})
                return result[0]
                
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    allUser = async ()=>{
        try {
            const result = await UserDatabase.connection
                .select()
                .from(this.TABLE_NAME)
            return result    
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    getProfile = async ()=>{
        try {
            
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    getUserById = async (id:any)=>{
        try {
            const result = await UserDatabase.connection
                .select()
                .from(this.TABLE_NAME)
                .where({id})

            return result[0]   
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}