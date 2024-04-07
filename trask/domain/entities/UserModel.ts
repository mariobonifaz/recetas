import { DataTypes } from 'sequelize';
import { sequelize } from '../../../Database/Sequelize';

const UserModel = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Asegura que el correo electrónico sea único en la base de datos
  },
  password: {
    type: DataTypes.STRING,
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

export default UserModel;