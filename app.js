"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const RecepieController_1 = require("./trask/infraestrucuture/controllers/RecepieController");
const PostgresRecipeRepository_1 = require("./trask/infraestrucuture/repositories/PostgresRecipeRepository");
const RecepieService_1 = require("./trask/applicartion/services/user-cases/RecepieService");
const PostgresUserRepository_1 = require("./trask/infraestrucuture/repositories/PostgresUserRepository");
const UserController_1 = require("./trask/infraestrucuture/controllers/UserController");
const UserService_1 = require("./trask/applicartion/services/user-cases/UserService");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(body_parser_1.default.json());
// Dependency Injection
const recipeRepository = new PostgresRecipeRepository_1.PostgresRecipeRepository();
const recipeService = new RecepieService_1.RecipeService(recipeRepository);
const userRepository = new PostgresUserRepository_1.PostgresUserRepository();
const userService = new UserService_1.UserService(userRepository);
// Rutas
app.post('/recipes', (req, res) => (0, RecepieController_1.createRecipe)(req, res, recipeService));
app.put('/recipes/:id', (req, res) => (0, RecepieController_1.updateRecipe)(req, res, recipeService));
app.delete('/recipes/:id', (req, res) => (0, RecepieController_1.deleteRecipe)(req, res, recipeService));
app.get('/recipes', (req, res) => (0, RecepieController_1.getAllRecipes)(req, res, recipeService));
app.get('/recipes/:id', (req, res) => (0, RecepieController_1.getRecipeById)(req, res, recipeService));
app.get('/recipes/nacionality/:nacionality', (req, res) => (0, RecepieController_1.getRecipesByDifficulty)(req, res, recipeService));
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});
app.post('/users', (req, res) => (0, UserController_1.createUser)(req, res, userService));
app.put('/users/:id', (req, res) => (0, UserController_1.updateUser)(req, res, userService));
app.delete('/users/:id', (req, res) => (0, UserController_1.deleteUser)(req, res, userService));
app.get('/users', (req, res) => (0, UserController_1.getAllUsers)(req, res, userService));
app.post('/login', (req, res) => (0, UserController_1.loginUser)(req, res, userService));
// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
