"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Sequelize_1 = require("../../../Database/Sequelize");
const RecipeModel = Sequelize_1.sequelize.define('Recipe', {
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    nacionality: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ingredients: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    preparation: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    difficulty: {
        type: sequelize_1.DataTypes.STRING,
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
exports.default = RecipeModel;
