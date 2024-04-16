import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('Mantenimiento', 'postgres', 'Recetas123', {
    host: 'database-1.ciyh1z4q2kdr.us-east-2.rds.amazonaws.com',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // You should use true in production and provide the CA cert
        }
    }
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });