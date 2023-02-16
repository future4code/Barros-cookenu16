import { VerifyUser } from './../services/verifyUser';
import { recipes, recipesDTO } from './../model/Recipes';
import { IdNotInserted, PleaseInsert, RecipeNotFound, NotAuthorized, UserNotFound } from './../error/errors';
import { RecipesDatabase } from './../database/RecipesDatabase';
import { Authenticator } from '../services/Authenticator';
import { IdGenerator } from '../services/idGenerator';

export class RecipesBusiness{
    recipesDatabase = new RecipesDatabase()
    authenticator = new Authenticator()
    verifyUser = new VerifyUser()

    createRecipes = async (input:recipesDTO, token:string)=>{
        try {
            const {id, title, description} = input
            
            const headersToken = this.authenticator.getTokenData(token)
            if(!headersToken) throw new  NotAuthorized()  

            if(!title || !description) throw new PleaseInsert()
            
            const verify = await this.verifyUser.VerifyUserByID(id)
            if(verify.length !== 1) throw new UserNotFound 

            const idRecipe = IdGenerator.ID()
            
            const recipe : recipes = {
                id:idRecipe,
                title,
                description,
                userName: verify[0].name,
                userId: verify[0].id
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

    allRecipes = async (token:string)=>{
        try {
            const verifyToken = this.authenticator.getTokenData(token)
            if(!verifyToken) throw new NotAuthorized()

            const result = await this.recipesDatabase.allRecipes()
            return result
        } catch (error:any) {
            throw new Error(error.message);
            
        }
    }
}