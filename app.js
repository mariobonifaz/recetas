"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const RecepieController_1 = require("./trask/infraestrucuture/controllers/RecepieController");
const PostgresRecipeRepository_1 = require("./trask/infraestrucuture/repositories/PostgresRecipeRepository"); // Suponiendo que estás utilizando PostgreSQL como base de datos
const RecepieService_1 = require("./trask/applicartion/services/user-cases/RecepieService");
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware
app.use(body_parser_1.default.json());
// Dependency Injection
const recipeRepository = new PostgresRecipeRepository_1.PostgresRecipeRepository(); // Instancia del repositorio de recetas
const recipeService = new RecepieService_1.RecipeService(recipeRepository); // Instancia del servicio de recetas
// Rutas
app.post('/recipes', (req, res) => (0, RecepieController_1.createRecipe)(req, res, recipeService));
app.put('/recipes/:id', (req, res) => (0, RecepieController_1.updateRecipe)(req, res, recipeService));
app.delete('/recipes/:id', (req, res) => (0, RecepieController_1.deleteRecipe)(req, res, recipeService));
app.get('/recipes', (req, res) => (0, RecepieController_1.getAllRecipes)(req, res, recipeService));
app.get('/recipes/:id', (req, res) => (0, RecepieController_1.getRecipeById)(req, res, recipeService));
app.get('/recipes/difficulty/:difficulty', (req, res) => (0, RecepieController_1.getRecipesByDifficulty)(req, res, recipeService));
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
