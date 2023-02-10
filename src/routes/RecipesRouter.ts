import { RecipeController } from './../controller/RecipeController';
import express from 'express';

export const recipesRouter = express.Router()

const recipesController = new RecipeController()

recipesRouter.post('/create',recipesController.createRecipes)
recipesRouter.get('/recipe/:id',recipesController.getRecipe)
recipesRouter.get('/all',recipesController.allRecipes)