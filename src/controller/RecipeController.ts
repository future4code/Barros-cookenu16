import { recipesDTO } from './../model/Recipes';
import { Request, Response } from 'express';
import { RecipesBusiness } from './../business/RecipesBusiness';

export class RecipeController{
    recipeBusiness = new RecipesBusiness();

    createRecipes = async (req:Request, res:Response)=>{
        try {
            const {title, description} = req.body

            const recipe:recipesDTO = {
                title,
                description
            }

            await this.recipeBusiness.createRecipes(recipe)
            res.status(201).send({message:'Receita foi criada com sucesso.'})

        } catch (error:any) {
            res.status(400).send(error.message)
        }
    }

    getRecipe = async (req:Request, res:Response)=>{
        try {
            const {id} = req.params
            const result = await this.recipeBusiness.getRecipe(id)
            res.status(200).send(result)
            res.send(id)

        } catch (error:any) {
            res.status(400).send(error.message)
        }
    }

    allRecipes = async (req:Request, res:Response)=>{
        try {
            const result = await this.recipeBusiness.allRecipes()
            
            res.status(200).send(result)

        } catch (error:any) {
            res.status(400).send(error.message)
            
        }
    }
}