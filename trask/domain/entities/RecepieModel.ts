import { DataTypes } from 'sequelize';
import { sequelize } from '../../../Database/Sequelize';

const RecipeModel = sequelize.define('Recipe', {
  name: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  nacionality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  preparation: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  difficulty: {
      type: DataTypes.STRING,
      allowNull: false,
  },
}, {
  tableName: "recipes",
  freezeTableName: true
});

RecipeModel.sync()
.then(() => {
  console.log('Tabla de recetas creada correctamente.');
})
.catch(error => {
  console.error('Error al crear la tabla de recetas:', error);
});

export default RecipeModel;