// adapters/persistence/PostgresUserRepository.ts
import { User } from "../../domain/entities/User";
import { UserRepository } from "./UserRepository";
import UserModel from "../../domain/entities/UserModel";
import { PasswordService } from "../../applicartion/services/user-cases/PasswordService";

export class PostgresUserRepository implements UserRepository {
    async createUser(user: User): Promise<User> {
        try {
            // Encriptar la contraseña antes de almacenarla en la base de datos
            const hashedPassword = await PasswordService.hashPassword(user.password);
            
            // Crear un nuevo usuario en la base de datos
            const newUser = await UserModel.create({
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email,
                password: hashedPassword
            });
            
            // Devolver el usuario recién creado
            return newUser.toJSON() as User;
        } catch (error) {
            // Manejar errores de validación o de la base de datos aquí
            const errorMessage = (error instanceof Error && error.message) ? error.message : 'Unknown error';
            throw new Error(`Error creating user: ${errorMessage}`);
        }
    }

    async findById(userId: string): Promise<User | null> {
        try {
            const user = await UserModel.findByPk(userId);
            return user ? user.toJSON() as User : null;
        } catch (error) {
            throw new Error(`Error finding user: ${(error as Error).message}`);
        }
    }

    async update(user: User): Promise<User> {
        try {
            await UserModel.update(
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phone: user.phone,
                    email: user.email,
                    // Agrega aquí los demás campos que necesites actualizar
                },
                {
                    where: { id: user.id } // Condición de búsqueda
                }
            );
            return user;
        } catch (error) {
            throw new Error(`Error updating user: ${(error as Error).message}`);
        }
    }

    async deleteUser(userId: string): Promise<void> {
        try {
            const user = await UserModel.findByPk(userId);
            if (!user) {
                throw new Error('User not found');
            }
            await user.destroy();
        } catch (error) {
            throw new Error(`Error deleting user: ${(error as Error).message}`);
        }
    }

    async getAll(): Promise<User[]> {
        try {
            const users = await UserModel.findAll();
            return users.map(user => user.toJSON() as User);
        } catch (error) {
            throw new Error(`Error getting all users: ${(error as Error).message}`);
        }
    }
}
