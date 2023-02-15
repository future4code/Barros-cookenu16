import { Request, Response } from "express";
import { FollowsBusiness } from "../business/FollowsBusiness";

export class FollowController{
    followBusiness = new FollowsBusiness()

    followUser = async (req:Request, res:Response)=>{
        try {
            const {idUser, idFollow} = req.body

            const input:any = {
                idUser,
                idFollow
            }

            const result = await this.followBusiness.followUser(input)
            res.status(200).send({
                message:`Seguindo o usuario ${result[0].name} com sucesso.`, 
                result
            })
        } catch (error:any) {
         res.status(200).send(error.message)   
        }
    }
}