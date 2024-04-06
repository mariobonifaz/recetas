// services/RecipeService.ts
import { Recipe } from '../../../domain/entities/Recepie';
import { RecipeRepository } from '../../../infraestrucuture/repositories/RecipeRepository';
import { QueryTypes} from 'sequelize';
import { sequelize } from '../../../../Database/Sequelize';

export class RecipeService {
    constructor(private recipeRepository: RecipeRepository) {}

    async createRecipe(recipe: Recipe): Promise<Recipe> {
        try {
            return await this.recipeRepository.createRecipe(recipe);
        } catch (error) {
            throw new Error(`Error creating recipe: ${(error as Error).message}`);
        }
    }

    async updateRecipe(recipe: Recipe): Promise<Recipe> {
        try {
            const existingRecipe = await this.recipeRepository.findById(recipe.id);
            if (!existingRecipe) {
                throw new Error('Recipe not found');
            }
            return await this.recipeRepository.updateRecipe(recipe);
        } catch (error) {
            throw new Error(`Error updating recipe: ${(error as Error).message}`);
        }
    }

    async deleteRecipe(recipeId: string): Promise<void> {
        try {
            const existingRecipe = await this.recipeRepository.findById(recipeId);
            if (!existingRecipe) {
                throw new Error('Recipe not found');
            }
            await this.recipeRepository.deleteRecipe(recipeId);
        } catch (error) {
            throw new Error(`Error deleting recipe: ${(error as Error).message}`);
        }
    }

    async getAllRecipes(): Promise<Recipe[]> {
        try {
            return await this.recipeRepository.getAllRecipes();
        } catch (error) {
            throw new Error(`Error getting all recipes: ${(error as Error).message}`);
        }
    }

    async getRecipeById(recipeId: string): Promise<Recipe | null> {
        try {
            return await this.recipeRepository.findById(recipeId);
        } catch (error) {
            throw new Error(`Error finding recipe by ID: ${(error as Error).message}`);
        }
    }

    async getRecipesByDifficulty(nacionality: string): Promise<Recipe[]> {
        try {
            const recipes = await sequelize.query(
                'SELECT * FROM recipes WHERE nacionality = :nacionality', 
                { replacements: { nacionality }, type: QueryTypes.SELECT }
            );
            return recipes as Recipe[];
        } catch (error) {
            throw new Error(`Error getting recipes by nacionality: ${(error as Error).message}`);
        }
    }
}
