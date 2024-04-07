import { User } from '../../domain/entities/user'

export interface UserRepository {
    createUser(user: User): Promise<User>;
    loginUser(email: string, password: string): Promise<User | null>;
    updateUser(user: User): Promise<User>;
    deleteUser(userId: string): Promise<void>;
    getAllUsers(): Promise<User[]>;
    findById(userId: string): Promise<User | null>
}