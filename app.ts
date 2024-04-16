import express from 'express';
import bodyParser from 'body-parser';
import { createRecipe, updateRecipe, deleteRecipe, getAllRecipes, getRecipeById, getRecipesByDifficulty } from './trask/infraestrucuture/controllers/RecepieController';
import { PostgresRecipeRepository } from './trask/infraestrucuture/repositories/PostgresRecipeRepository';
import { RecipeService } from './trask/applicartion/services/user-cases/RecepieService';

import { PostgresUserRepository } from './trask/infraestrucuture/repositories/PostgresUserRepository'
import { createUser, loginUser, updateUser, deleteUser,getAllUsers } from './trask/infraestrucuture/controllers/UserController'
import { UserService } from './trask/applicartion/services/user-cases/UserService';

const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(bodyParser.json());

// Dependency Injection
const recipeRepository = new PostgresRecipeRepository();
const recipeService = new RecipeService(recipeRepository);
const userRepository = new PostgresUserRepository();
const userService = new UserService(userRepository);

// Rutas
app.post('/recipes', (req, res) => createRecipe(req, res, recipeService));
app.put('/recipes/:id', (req, res) => updateRecipe(req, res, recipeService));
app.delete('/recipes/:id', (req, res) => deleteRecipe(req, res, recipeService));
app.get('/recipes', (req, res) => getAllRecipes(req, res, recipeService));
app.get('/recipes/:id', (req, res) => getRecipeById(req, res, recipeService));
app.get('/recipes/nacionality/:nacionality', (req, res) => getRecipesByDifficulty(req, res, recipeService));

app.get('/health', (req, res) => {
    res.status(200).send('OK');
  });
  
app.post('/users', (req, res) => createUser(req, res, userService));
app.put('/users/:id', (req, res) =>updateUser(req, res, userService));
app.delete('/users/:id', (req,res) => deleteUser(req, res, userService));
app.get('/users', (req,res) => getAllUsers(req, res, userService));
app.post('/login', (req, res) => loginUser(req, res, userService));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});