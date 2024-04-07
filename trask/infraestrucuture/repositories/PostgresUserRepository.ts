import { User } from '../../domain/entities/user'
import { UserRepository } from "../repositories/UserRepository";
import UserModel from "../../domain/entities/UserModel";
import { Recipe } from '../../domain/entities/Recepie';
import { deleteUser } from '../controllers/UserController';

export class PostgresUserRepository implements UserRepository {
    async createUser(user: User): Promise<User> {
        try {
            const newUser = await UserModel.create({
                name: user.name,
                email: user.email,
                password: user.password
            });
            return newUser.toJSON() as User;
        } catch (error) {
            throw new Error(`Error creating user: ${(error as Error).message}`);
        }
    }

    async updateUser(user: User): Promise<User> {
        try {
            await UserModel.update(
                {
                    name: user.name,
                    email: user.email,
                    password: user.password
                },
                {
                    where: { id: user.id}
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

    async getAllUsers(): Promise<User[]>{
        try {
            const users = await UserModel.findAll();
            return users.map(users => users.toJSON() as User);
        } catch (error) {
            throw new Error(`Error getting all users: ${(error as Error).message}`);
        }
    }

    async findById(userId: string): Promise<User | null>{
        try {
            const user = await UserModel.findByPk(userId);
            return user ? user.toJSON() as User : null;
        } catch (error) {
            throw new Error(`Error finding user by ID: ${(error as Error).message}`);
        }
    }

    async loginUser(email: string, password: string): Promise<User | null> {
        try {
            const user = await UserModel.findOne({
                where: {
                    email,
                    password
                }
            });
            return user ? user.toJSON() as User : null;
        } catch (error) {
            throw new Error(`Error logging in user: ${(error as Error).message}`);
        }
    }
}