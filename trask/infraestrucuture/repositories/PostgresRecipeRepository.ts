import { Recipe } from "../../domain/entities/Recepie";
import { RecipeRepository } from "../repositories/RecipeRepository";
import RecipeModel from "../../domain/entities/RecepieModel";

export class PostgresRecipeRepository implements RecipeRepository {
    async createRecipe(recipe: Recipe): Promise<Recipe> {
        try {
            const newRecipe = await RecipeModel.create({
                name: recipe.name,
                ingredients: recipe.ingredients,
                preparation: recipe.preparation,
                difficulty: recipe.difficulty,
            });
            return newRecipe.toJSON() as Recipe;
        } catch (error) {
            throw new Error(`Error creating recipe: ${(error as Error).message}`);
        }
    }

    async updateRecipe(recipe: Recipe): Promise<Recipe> {
        try {
            await RecipeModel.update(
                {
                    name: recipe.name,
                    ingredients: recipe.ingredients,
                    preparation: recipe.preparation,
                    difficulty: recipe.difficulty,
                },
                {
                    where: { id: recipe.id }
                }
            );
            return recipe;
        } catch (error) {
            throw new Error(`Error updating recipe: ${(error as Error).message}`);
        }
    }

    async deleteRecipe(recipeId: string): Promise<void> {
        try {
            const recipe = await RecipeModel.findByPk(recipeId);
            if (!recipe) {
                throw new Error('Recipe not found');
            }
            await recipe.destroy();
        } catch (error) {
            throw new Error(`Error deleting recipe: ${(error as Error).message}`);
        }
    }

    async getAllRecipes(): Promise<Recipe[]> {
        try {
            const recipes = await RecipeModel.findAll();
            return recipes.map(recipe => recipe.toJSON() as Recipe);
        } catch (error) {
            throw new Error(`Error getting all recipes: ${(error as Error).message}`);
        }
    }

    async findById(recipeId: string): Promise<Recipe | null> {
        try {
            const recipe = await RecipeModel.findByPk(recipeId);
            return recipe ? recipe.toJSON() as Recipe : null;
        } catch (error) {
            throw new Error(`Error finding recipe by ID: ${(error as Error).message}`);
        }
    }
}