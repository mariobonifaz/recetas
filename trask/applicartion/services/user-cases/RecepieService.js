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
exports.RecipeService = void 0;
const sequelize_1 = require("sequelize");
const Sequelize_1 = require("../../../../Database/Sequelize");
class RecipeService {
    constructor(recipeRepository) {
        this.recipeRepository = recipeRepository;
    }
    createRecipe(recipe) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.recipeRepository.createRecipe(recipe);
            }
            catch (error) {
                throw new Error(`Error creating recipe: ${error.message}`);
            }
        });
    }
    updateRecipe(recipe) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingRecipe = yield this.recipeRepository.findById(recipe.id);
                if (!existingRecipe) {
                    throw new Error('Recipe not found');
                }
                return yield this.recipeRepository.updateRecipe(recipe);
            }
            catch (error) {
                throw new Error(`Error updating recipe: ${error.message}`);
            }
        });
    }
    deleteRecipe(recipeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingRecipe = yield this.recipeRepository.findById(recipeId);
                if (!existingRecipe) {
                    throw new Error('Recipe not found');
                }
                yield this.recipeRepository.deleteRecipe(recipeId);
            }
            catch (error) {
                throw new Error(`Error deleting recipe: ${error.message}`);
            }
        });
    }
    getAllRecipes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.recipeRepository.getAllRecipes();
            }
            catch (error) {
                throw new Error(`Error getting all recipes: ${error.message}`);
            }
        });
    }
    getRecipeById(recipeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.recipeRepository.findById(recipeId);
            }
            catch (error) {
                throw new Error(`Error finding recipe by ID: ${error.message}`);
            }
        });
    }
    getRecipesByDifficulty(nacionality) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recipes = yield Sequelize_1.sequelize.query('SELECT * FROM recipes WHERE nacionality = :nacionality', { replacements: { nacionality }, type: sequelize_1.QueryTypes.SELECT });
                return recipes;
            }
            catch (error) {
                throw new Error(`Error getting recipes by nacionality: ${error.message}`);
            }
        });
    }
}
exports.RecipeService = RecipeService;
