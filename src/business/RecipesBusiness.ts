import { IdNotInserted, PleaseInsert, RecipeNotFound } from './../error/errors';
import { recipes } from '../model/Recipes';
import { IdGenerator } from '../services/idGenerator';
import { RecipesDatabase } from './../database/RecipesDatabase';
export class RecipesBusiness{
    recipesDatabase = new RecipesDatabase()

    createRecipes = async (input:any)=>{
        try {
            const {title, description} = input

            if(!title || !description) throw new PleaseInsert()

            const id = IdGenerator.ID()

            const recipe:recipes = {
                id,
                title,
                description
            }

            await this.recipesDatabase.createRecipes(recipe)
           

        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    getRecipe = async (id:string)=>{

        try {

          if(!id) throw new IdNotInserted()

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