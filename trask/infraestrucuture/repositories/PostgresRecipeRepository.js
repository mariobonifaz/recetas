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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresRecipeRepository = void 0;
const RecepieModel_1 = __importDefault(require("../../domain/entities/RecepieModel"));
const Sequelize_1 = require("../../../Database/Sequelize");
class PostgresRecipeRepository {
    createRecipe(recipe) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newRecipe = yield RecepieModel_1.default.create({
                    name: recipe.name,
                    nacionality: recipe.nacionality,
                    ingredients: recipe.ingredients,
                    preparation: recipe.preparation,
                    difficulty: recipe.difficulty,
                });
                return newRecipe.toJSON();
            }
            catch (error) {
                throw new Error(`Error creating recipe: ${error.message}`);
            }
        });
    }
    updateRecipe(recipe) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield RecepieModel_1.default.update({
                    name: recipe.name,
                    nacionality: recipe.nacionality,
                    ingredients: recipe.ingredients,
                    preparation: recipe.preparation,
                    difficulty: recipe.difficulty,
                }, {
                    where: { id: recipe.id }
                });
                return recipe;
            }
            catch (error) {
                throw new Error(`Error updating recipe: ${error.message}`);
            }
        });
    }
    deleteRecipe(recipeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recipe = yield RecepieModel_1.default.findByPk(recipeId);
                if (!recipe) {
                    throw new Error('Recipe not found');
                }
                yield recipe.destroy();
            }
            catch (error) {
                throw new Error(`Error deleting recipe: ${error.message}`);
            }
        });
    }
    getAllRecipes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recipes = yield RecepieModel_1.default.findAll();
                return recipes.map(recipe => recipe.toJSON());
            }
            catch (error) {
                throw new Error(`Error getting all recipes: ${error.message}`);
            }
        });
    }
    findById(recipeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recipe = yield RecepieModel_1.default.findByPk(recipeId);
                return recipe ? recipe.toJSON() : null;
            }
            catch (error) {
                throw new Error(`Error finding recipe by ID: ${error.message}`);
            }
        });
    }
    getRecipesByDifficulty(nacionality) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows, metadata] = yield Sequelize_1.sequelize.query('SELECT * FROM recipes WHERE nacionality = :nacionality', { replacements: { nacionality } });
                const recipes = rows.map((row) => {
                    return {
                        id: row.id,
                        name: row.name,
                        nacionality: row.nacionality, // Asegúrate de mapear todas las propiedades necesarias
                        ingredients: row.ingredients,
                        preparation: row.preparation,
                        difficulty: row.difficulty
                    };
                });
                return recipes;
            }
            catch (error) {
                throw new Error(`Error getting recipes by difficulty: ${error.message}`);
            }
        });
    }
}
exports.PostgresRecipeRepository = PostgresRecipeRepository;
