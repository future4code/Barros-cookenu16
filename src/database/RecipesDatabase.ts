import { recipes } from "../model/Recipes";
import { BaseDatabase } from "./BaseDatabase";

export class RecipesDatabase extends BaseDatabase{
    TABLE_NAME = "Recipes";

    createRecipes = async (recipe:recipes)=>{
        try {

             await RecipesDatabase.connection
                    .insert(recipe)
                    .into(this.TABLE_NAME)
              

        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    getRecipe = async (id:string)=>{
        try {
            const result = await RecipesDatabase.connection
                .select()
                .from(this.TABLE_NAME)
                .where({id})  
                
           return result [0]     
        } catch (error:any) {
            throw new Error(error.message);
        }
    }


    allRecipes = async ()=>{
        try {
            const result = await RecipesDatabase.connection
                .select()
                .from(this.TABLE_NAME)
            return result    
        } catch (error:any) {
            throw new Error(error.message);
            
        }
    }
}