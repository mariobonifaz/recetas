import express from 'express';
import bodyParser from 'body-parser';
import { createRecipe, updateRecipe, deleteRecipe, getAllRecipes, getRecipeById, getRecipesByDifficulty } from './trask/infraestrucuture/controllers/RecepieController';
import { PostgresRecipeRepository } from './trask/infraestrucuture/repositories/PostgresRecipeRepository'; // Suponiendo que estás utilizando PostgreSQL como base de datos
import { RecipeService } from './trask/applicartion/services/user-cases/RecepieService';

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Dependency Injection
const recipeRepository = new PostgresRecipeRepository(); // Instancia del repositorio de recetas
const recipeService = new RecipeService(recipeRepository); // Instancia del servicio de recetas

// Rutas
app.post('/recipes', (req, res) => createRecipe(req, res, recipeService));
app.put('/recipes/:id', (req, res) => updateRecipe(req, res, recipeService));
app.delete('/recipes/:id', (req, res) => deleteRecipe(req, res, recipeService));
app.get('/recipes', (req, res) => getAllRecipes(req, res, recipeService));
app.get('/recipes/:id', (req, res) => getRecipeById(req, res, recipeService));
app.get('/recipes/nacionality/:nacionality', (req, res) => getRecipesByDifficulty(req, res, recipeService));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

