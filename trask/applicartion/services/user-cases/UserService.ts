// core/domain/services/UserService.ts
import { User } from '../../../domain/entities/User';
import { UserRepository } from '../../../infraestrucuture/repositories/UserRepository';
import { PasswordService } from './PasswordService';

export class UserService {
    constructor(private userRepository: UserRepository) {}

    async createUser(user: User): Promise<void> {
        // Encriptar la contraseña del usuario antes de almacenarla en la base de datos
        const hashedPassword = await PasswordService.hashPassword(user.password);
        const userWithHashedPassword: User = { ...user, password: hashedPassword };

        await this.userRepository.createUser(userWithHashedPassword);
    }

    async updateUser(userId: string, userData: Partial<User>): Promise<User> {
        try {
            // Primero, obtenemos el usuario que queremos actualizar
            const existingUser = await this.userRepository.findById(userId);

            // Si el usuario no existe, lanzamos un error
            if (!existingUser) {
                throw new Error('User not found');
            }

            // Actualizamos los campos proporcionados en userData
            Object.assign(existingUser, userData);

            // Guardamos los cambios en la base de datos
            const updatedUser = await this.userRepository.update(existingUser);

            return updatedUser;
        } catch (error) {
            throw new Error(`Error updating user: ${(error as Error).message}`);
        }
    }

    async deleteUser(userId: string): Promise<void> {
        try {
            const existingUser = await this.userRepository.findById(userId);
            if (!existingUser) {
                throw new Error('User not found');
            }
            await this.userRepository.deleteUser(userId);
        } catch (error) {
            throw new Error(`Error deleting user: ${(error as Error).message}`);
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            return await this.userRepository.getAll();
        } catch (error) {
            throw new Error(`Error getting all users: ${(error as Error).message}`);
        }
    }
}
