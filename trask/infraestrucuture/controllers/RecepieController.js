"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecipesByDifficulty = exports.getRecipeById = exports.getAllRecipes = exports.deleteRecipe = exports.updateRecipe = exports.createRecipe = void 0;
const createRecipe = (req, res, recipeService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newRecipe = yield recipeService.createRecipe(req.body);
        res.status(201).json(newRecipe);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        }
        else {
            // Manejar otros tipos de errores aquí
            res.status(500).json({ error: "Internal server error" });
        }
    }
});
exports.createRecipe = createRecipe;
const updateRecipe = (req, res, recipeService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedRecipe = yield recipeService.updateRecipe(req.body);
        res.status(200).json(updatedRecipe);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        }
        else {
            // Manejar otros tipos de errores aquí
            res.status(500).json({ error: "Internal server error" });
        }
    }
});
exports.updateRecipe = updateRecipe;
const deleteRecipe = (req, res, recipeService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipeId = req.params.id;
        yield recipeService.deleteRecipe(recipeId);
        res.status(204).send();
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        }
        else {
            // Manejar otros tipos de errores aquí
            res.status(500).json({ error: "Internal server error" });
        }
    }
});
exports.deleteRecipe = deleteRecipe;
const getAllRecipes = (req, res, recipeService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield recipeService.getAllRecipes();
        res.status(200).json(recipes);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        }
        else {
            // Manejar otros tipos de errores aquí
            res.status(500).json({ error: "Internal server error" });
        }
    }
});
exports.getAllRecipes = getAllRecipes;
const getRecipeById = (req, res, recipeService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipeId = req.params.id;
        const recipe = yield recipeService.getRecipeById(recipeId);
        if (!recipe) {
            res.status(404).json({ error: 'Recipe not found' });
            return;
        }
        res.status(200).json(recipe);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        }
        else {
            // Manejar otros tipos de errores aquí
            res.status(500).json({ error: "Internal server error" });
        }
    }
});
exports.getRecipeById = getRecipeById;
const getRecipesByDifficulty = (req, res, recipeService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nacionality } = req.params; // Obtenemos la dificultad de los parámetros de la solicitud
        const recipes = yield recipeService.getRecipesByDifficulty(nacionality);
        res.status(200).json(recipes);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        }
        else {
            // Manejar otros tipos de errores aquí
            res.status(500).json({ error: "Internal server error" });
        }
    }
});
exports.getRecipesByDifficulty = getRecipesByDifficulty;