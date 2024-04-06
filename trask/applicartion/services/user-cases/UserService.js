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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const PasswordService_1 = require("./PasswordService");
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // Encriptar la contraseña del usuario antes de almacenarla en la base de datos
            const hashedPassword = yield PasswordService_1.PasswordService.hashPassword(user.password);
            const userWithHashedPassword = Object.assign(Object.assign({}, user), { password: hashedPassword });
            yield this.userRepository.createUser(userWithHashedPassword);
        });
    }
    updateUser(userId, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Primero, obtenemos el usuario que queremos actualizar
                const existingUser = yield this.userRepository.findById(userId);
                // Si el usuario no existe, lanzamos un error
                if (!existingUser) {
                    throw new Error('User not found');
                }
                // Actualizamos los campos proporcionados en userData
                Object.assign(existingUser, userData);
                // Guardamos los cambios en la base de datos
                const updatedUser = yield this.userRepository.update(existingUser);
                return updatedUser;
            }
            catch (error) {
                throw new Error(`Error updating user: ${error.message}`);
            }
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield this.userRepository.findById(userId);
                if (!existingUser) {
                    throw new Error('User not found');
                }
                yield this.userRepository.deleteUser(userId);
            }
            catch (error) {
                throw new Error(`Error deleting user: ${error.message}`);
            }
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.getAll();
            }
            catch (error) {
                throw new Error(`Error getting all users: ${error.message}`);
            }
        });
    }
}
exports.UserService = UserService;
