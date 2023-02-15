import { recipesDTO } from './../model/Recipes';
import { IdNotInserted, PleaseInsert, RecipeNotFound, NotAuthorized } from './../error/errors';
import { recipes } from '../model/Recipes';
import { IdGenerator } from '../services/idGenerator';
import { RecipesDatabase } from './../database/RecipesDatabase';
import { Authenticator } from '../services/Authenticator';
export class RecipesBusiness{
    recipesDatabase = new RecipesDatabase()
    authenticator = new Authenticator()

    createRecipes = async (input:recipesDTO, inToken:string)=>{
        try {
            const headersToken = this.authenticator.getTokenData(inToken)
            if(!headersToken) throw new  NotAuthorized()  

            const {title, description, token} = input

            if(!title || !description) throw new PleaseInsert()

            const { id } = this.authenticator.getTokenData(token)

            const recipe = {
                id,
                title,
                description
            }

            await this.recipesDatabase.createRecipes(recipe)
           

        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    getRecipe = async (info:any)=>{

        try {

            const { token, idRecipe } = info

            if(idRecipe) throw new IdNotInserted()

            const { id } = this.authenticator.getTokenData(token)



            const recipe = await this.recipesDatabase.getRecipe(id)

            if(!recipe) throw new RecipeNotFound()

            return recipe

        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    
    allRecipes = async ()=>{
        try {
            const result = await this.recipesDatabase.allRecipes()
            return result
        } catch (error:any) {
            throw new Error(error.message);
            
        }
    }
}