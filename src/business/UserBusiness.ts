import { TokenNotInserted } from './../error/errors';
import { PasswordInvalid, PleaseInsert, EmailInvalid, PasswordWrong, UserNotFound, NotAuthorized} from '../error/errors';
import { inputDTO, User, loginDTO} from './../model/Users';
import { UserDatabase } from "../database/UserDatabase";
import { IdGenerator } from "../services/idGenerator";
import { Authenticator } from '../services/Authenticator';

export class UserBusines{
    userDatabase = new UserDatabase()
    authenticator = new Authenticator()

    signup = async (input:inputDTO)=>{
        try {
            const {name,email,password } = input

            if(!name||!email||!password)throw new PleaseInsert()
            if(password.length < 6) throw new PasswordInvalid()
            if(!email.includes('@')) throw new EmailInvalid()


        const id :string = IdGenerator.ID()

        const user:User = {
            id,
            name,
            email,
            password,
        }

        await this.userDatabase.signup(user)
        const token = this.authenticator.generateToken({id})

        return token
        
        } catch (error:any) {
            throw new Error(error.message);
        }

    }

    login = async (input:loginDTO)=>{
        try {
            const {email, password} = input

            if(!email || !password) throw new PleaseInsert()
            if(!email.includes('@')) throw new EmailInvalid()
            

            const user = await this.userDatabase.findUserByEmail(email)

            if(!user) throw new UserNotFound()
            if(user.password !== password) throw new PasswordWrong()

            const token = this.authenticator.generateToken({id: user.id})
            return token

        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    allUser = async (inToken:string)=>{
        try {
            
            const token = this.authenticator.getTokenData(inToken)

            if(!token) throw new NotAuthorized()

            const result = await this.userDatabase.allUser()
            return result
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    getUserById = async (data:any)=>{
        try {
            const {id, inToken} = data
            if(id) throw new Error("o ID nao foi inserido");
             const token = this.authenticator.getTokenData(inToken)

             if(!token) throw new NotAuthorized()
            
            const result = await this.userDatabase.getUserById(id)
            return result
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    getProfile = async (inToken:string)=>{
        try {
            if(!inToken) throw new TokenNotInserted()
            const token = this.authenticator.getTokenData(inToken)
            

            if(!token) throw new NotAuthorized()

            const result  = await this.userDatabase.getProfile(token)
            return result

        } catch (error:any) {
            throw new Error(error.message);
        }
    }

} 