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
const PasswordService_1 = require("../../applicartion/services/user-cases/PasswordService");
class PostgresUserRepository {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Encriptar la contraseña antes de almacenarla en la base de datos
                const hashedPassword = yield PasswordService_1.PasswordService.hashPassword(user.password);
                // Crear un nuevo usuario en la base de datos
                const newUser = yield UserModel_1.default.create({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phone: user.phone,
                    email: user.email,
                    password: hashedPassword
                });
                // Devolver el usuario recién creado
                return newUser.toJSON();
            }
            catch (error) {
                // Manejar errores de validación o de la base de datos aquí
                const errorMessage = (error instanceof Error && error.message) ? error.message : 'Unknown error';
                throw new Error(`Error creating user: ${errorMessage}`);
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
                throw new Error(`Error finding user: ${error.message}`);
            }
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield UserModel_1.default.update({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phone: user.phone,
                    email: user.email,
                    // Agrega aquí los demás campos que necesites actualizar
                }, {
                    where: { id: user.id } // Condición de búsqueda
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
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserModel_1.default.findAll();
                return users.map(user => user.toJSON());
            }
            catch (error) {
                throw new Error(`Error getting all users: ${error.message}`);
            }
        });
    }
}
exports.PostgresUserRepository = PostgresUserRepository;
