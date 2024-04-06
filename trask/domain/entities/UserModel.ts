// adapters/persistence/models/UserModel.ts
import { DataTypes } from 'sequelize';
import { sequelize } from '../../../Database/Sequelize';

const UserModel = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
},{
    tableName: "User",
    freezeTableName:true
});
UserModel.sync()
  .then(() => {
    console.log('Tabla de usuarios creada correctamente.');
  })
  .catch(error => {
    console.error('Error al crear la tabla de usuarios:', error);
  })

export default UserModel;
