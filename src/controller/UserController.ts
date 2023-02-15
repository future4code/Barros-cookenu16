import { loginDTO } from './../model/Users';
import { Request, Response } from "express";
import { UserBusines } from "../business/UserBusiness";
import { inputDTO } from "../model/Users";

export class UserController{
    userBusiness = new UserBusines();

    signup = async (req:Request, res:Response)=>{
        try {
            const {name, email, password} = req.body;
    
            const input:inputDTO = {
                name,
                email,
                password,
            }
            const token = await this.userBusiness.signup(input)

            res.status(200).send({message: 'Usuario criado com sucesso...', token})
            
        } catch (error:any) {
            res.status(400).send(error.message)
        }
    }

    login = async (req:Request, res:Response)=>{
       try {
        const {email, password} = req.body
        const user:loginDTO = {
            email,
            password
        }
        const token = await this.userBusiness.login(user)
        res.status(200).send({message: 'Logado com sucesso.',token})

       } catch (error:any) {
        res.status(400).send(error.message || error.sqlMessage)
       }

    }

    allUser = async (req:Request, res:Response)=>{
        try {

            const token = req.headers.authorization as string 

            const result = await this.userBusiness.allUser(token)
            res.status(200).send(result)
        } catch (error:any) {
            res.status(400).send(error.message)
        }
    }
 
    getUserById = async (req:Request, res:Response)=>{
        try {
            const {id} = req.params
            const token = req.headers.authorization as string

            const data :any = {
                id, 
                token
            }

            const result = await this.userBusiness.getUserById(data)
            res.status(200).send(result)
        } catch (error:any) {
            res.status(400).send(error.message)
        }
    }

    getProfile = async (req:Request, res:Response)=>{
        try {
            const inToken = req.headers.authorization as string
            console.log(inToken);
            
            const result = await this.userBusiness.getProfile(inToken)

            res.status(200).send(result)

        } catch (error:any) {
            res.status(400).send(error.message)
        }
    }

}