"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Sequelize_1 = require("../../../Database/Sequelize");
const UserModel = Sequelize_1.sequelize.define('User', {
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true, // Asegura que el correo electrónico sea único en la base de datos
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "users",
    freezeTableName: true
});
UserModel.sync() // Sincroniza el modelo con la base de datos
    .then(() => {
    console.log('Tabla de usuarios creada correctamente.');
})
    .catch(error => {
    console.error('Error al crear la tabla de usuarios:', error);
});
exports.default = UserModel;