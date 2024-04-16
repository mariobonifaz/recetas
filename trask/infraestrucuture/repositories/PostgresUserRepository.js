"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresUserRepository = void 0;
const UserModel_1 = __importDefault(require("../../domain/entities/UserModel"));
class PostgresUserRepository {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield UserModel_1.default.create({
                    name: user.name,
                    email: user.email,
                    password: user.password
                });
                return newUser.toJSON();
            }
            catch (error) {
                throw new Error(`Error creating user: ${error.message}`);
            }
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield UserModel_1.default.update({
                    name: user.name,
                    email: user.email,
                    password: user.password
                }, {
                    where: { id: user.id }
                });
                return user;
            }
            catch (error) {
                throw new Error(`Error updating user: ${error.message}`);
            }
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserModel_1.default.findByPk(userId);
                if (!user) {
                    throw new Error('User not found');
                }
                yield user.destroy();
            }
            catch (error) {
                throw new Error(`Error deleting user: ${error.message}`);
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserModel_1.default.findAll();
                return users.map(users => users.toJSON());
            }
            catch (error) {
                throw new Error(`Error getting all users: ${error.message}`);
            }
        });
    }
    findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserModel_1.default.findByPk(userId);
                return user ? user.toJSON() : null;
            }
            catch (error) {
                throw new Error(`Error finding user by ID: ${error.message}`);
            }
        });
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserModel_1.default.findOne({
                    where: {
                        email,
                        password
                    }
                });
                return user ? user.toJSON() : null;
            }
            catch (error) {
                throw new Error(`Error logging in user: ${error.message}`);
            }
        });
    }
}
exports.PostgresUserRepository = PostgresUserRepository;
