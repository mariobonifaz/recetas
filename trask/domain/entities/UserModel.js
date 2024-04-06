"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// adapters/persistence/models/UserModel.ts
const sequelize_1 = require("sequelize");
const Sequelize_1 = require("../../../Database/Sequelize");
const UserModel = Sequelize_1.sequelize.define('User', {
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "User",
    freezeTableName: true
});
UserModel.sync()
    .then(() => {
    console.log('Tabla de usuarios creada correctamente.');
})
    .catch(error => {
    console.error('Error al crear la tabla de usuarios:', error);
});
exports.default = UserModel;
