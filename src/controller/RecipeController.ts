import { Request, Response } from 'express';
import { RecipesBusiness } from './../business/RecipesBusiness';

export class RecipeController{
    recipeBusiness = new RecipesBusiness();

    createRecipes = async (req:Request, res:Response)=>{
        try {
            const {title, description} = req.body
            const token = req.headers.authorization as string
            const id = req.params.idUser

            const recipe = {
                id ,
                title,
                description,
            }

            await this.recipeBusiness.createRecipes(recipe, token)
            res.status(201).send({message:'Receita foi criada com sucesso.'})

        } catch (error:any) {
            res.status(400).send(error.message)
        }
    }

    getRecipe = async (req:Request, res:Response)=>{
        try {
            const info:any = {
                token : req.headers.authorization as string,
                id: req.params
            }


            const result = await this.recipeBusiness.getRecipe(info)
            res.status(200).send(result)

        } catch (error:any) {
            res.status(400).send(error.message)
        }
    }

    allRecipes = async (req:Request, res:Response)=>{
        try {
            const token = req.headers.authorization as string
            
            const result = await this.recipeBusiness.allRecipes(token)
            
            res.status(200).send(result)

        } catch (error:any) {
            res.status(400).send(error.message)
            
        }
    }
}