// __tests__/app.test.js

const request = require('supertest');
const app = require('../app');

// Esta función detendrá el servidor después de las pruebas
afterAll(done => {
  done();
});

describe('POST /login', () => {
  it('debería crear una nueva receta', async () => {
    const newRecipeData = {
        name: 'Nueva Receta',
        ingredients: 'Ingrediente 1, Ingrediente 2',
        preparation: 'Instrucciones de preparación',
        difficulty: 'Fácil'
      };
    const response = await request(app)
      .post('/recipes') // Aquí usamos request() para crear una instancia de la aplicación
      .send(newRecipeData);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Nueva Receta');
  });
})

// Agrega más pruebas para otras rutas según sea necesario.
describe('GET /recipes', () => {
    test('debería devolver el código de estado 200 y un JSON con las recetas', async () => {
      const response = await request(app).get('/recipes');
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual(expect.any(Array)); // Verifica que la respuesta sea un arreglo de recetas
      // También puedes agregar expectativas adicionales para verificar el contenido de las recetas devueltas
      response.body.forEach(recipe => {
        expect(recipe).toHaveProperty('name');
        expect(recipe).toHaveProperty('ingredients');
    });
  });
  describe('PUT /recipes/:id', () => {
    test('debería actualizar una receta existente y devolver el código de estado 200', async () => {
        // Supongamos que 'existingRecipeId' es el ID de una receta existente en tu base de datos
        const existingRecipeId = 7;
        const updatedRecipeData = {
            id:7,
            name: 'Nuevo nombre de receta',
            ingredients: 'Ingrediente 1 actualizado, Ingrediente 2 actualizado',
            preparation: 'Instrucciones de preparación actualizadas',
            difficulty: 'Fácil'
        };

        const response = await request(app)
            .put(`/recipes/${existingRecipeId}`)
            .send(updatedRecipeData);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', existingRecipeId);
        expect(response.body).toMatchObject(updatedRecipeData);
    });



    describe('DELETE /recipes/:id', () => {
        test('debería eliminar una receta existente y devolver el código de estado 204', async () => {
          // Supongamos que 'existingRecipeId' es el ID de una receta existente en tu base de datos
          const existingRecipeId = 7;
      
          const response = await request(app).delete(`/recipes/${existingRecipeId}`);
      
          expect(response.status).toBe(204);
      
          // Verificar que la receta se haya eliminado correctamente (opcional)
          // Esto dependerá de cómo esté implementada la lógica en tu aplicación
          // Puedes verificar que la receta ya no exista en la base de datos, por ejemplo
        });
      });
      

    // Puedes agregar más pruebas según sea necesario para casos especiales o errores manejados por tu aplicación
});
    });
