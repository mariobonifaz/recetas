import { Recipe } from '../../domain/entities/Recepie';

export interface RecipeRepository {
    createRecipe(recipe: Recipe): Promise<Recipe>;
    updateRecipe(recipe: Recipe): Promise<Recipe>;
    deleteRecipe(recipeId: string): Promise<void>;
    getAllRecipes(): Promise<Recipe[]>;
    findById(recipeId: string): Promise<Recipe | null>;
    getRecipesByDifficulty(nacionality: string): Promise<Recipe[]>;
}
