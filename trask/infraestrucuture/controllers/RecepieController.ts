import { Request, Response } from 'express';
import { RecipeService } from '../../applicartion/services/user-cases/RecepieService';

export const createRecipe = async (req: Request, res: Response, recipeService: RecipeService) => {
    try {
        const newRecipe = await recipeService.createRecipe(req.body);
        res.status(201).json(newRecipe);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export const updateRecipe = async (req: Request, res: Response, recipeService: RecipeService) => {
    try {
        const updatedRecipe = await recipeService.updateRecipe(req.body);
        res.status(200).json(updatedRecipe);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export const deleteRecipe = async (req: Request, res: Response, recipeService: RecipeService) => {
    try {
        const recipeId = req.params.id;
        await recipeService.deleteRecipe(recipeId);
        res.status(204).send();
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export const getAllRecipes = async (req: Request, res: Response, recipeService: RecipeService) => {
    try {
        const recipes = await recipeService.getAllRecipes();
        res.status(200).json(recipes);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export const getRecipeById = async (req: Request, res: Response, recipeService: RecipeService) => {
    try {
        const recipeId = req.params.id;
        const recipe = await recipeService.getRecipeById(recipeId);
        if (!recipe) {
            res.status(404).json({ error: 'Recipe not found' });
            return;
        }
        res.status(200).json(recipe);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export const getRecipesByDifficulty = async (req: Request, res: Response, recipeService: RecipeService) => {
    try {
        const { nacionality } = req.params;
        const recipes = await recipeService.getRecipesByDifficulty(nacionality);
        res.status(200).json(recipes);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
};