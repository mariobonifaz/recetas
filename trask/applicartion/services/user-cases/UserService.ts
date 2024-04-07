import { User } from '../../../domain/entities/user';
import { UserRepository } from '../../../infraestrucuture/repositories/UserRepository'

export class UserService {
    constructor(private userRepository: UserRepository) {}

    async createUser(user: User): Promise<User> {
        try {
            return await this.userRepository.createUser(user);
        } catch (error) {
            throw new Error(`Error creating user: ${(error as Error).message}`);
        }
    }

    async updateUser(user: User): Promise<User> {
        try {
            const existingUser = await this.userRepository.findById(user.id);
            if (!existingUser) {
                throw new Error('User not found');
            }
            return await this.userRepository.updateUser(user);
        } catch (error) {
            throw new Error(`Error updating recipe: ${(error as Error).message}`);
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
            return await this.userRepository.getAllUsers();
        } catch (error) {
            throw new Error(`Error getting all users: ${(error as Error).message}`);
        }
    }

    async loginUser(email: string, password: string): Promise<User | null> {
        try {
            return await this.userRepository.loginUser(email, password);
        } catch (error) {
            throw new Error(`Error logging in user: ${(error as Error).message}`);
        }
    }
}