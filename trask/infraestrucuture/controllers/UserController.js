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
exports.getAllUsers = exports.deleteUser = exports.updateUser = exports.registerUser = void 0;
const registerUser = (req, res, userRepository, userService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield userService.createUser(req.body);
        res.status(201).json(newUser);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        }
        else {
            // Manejar otros tipos de errores aquí
            res.status(500).json({ error: "Internal server error" });
        }
    }
});
exports.registerUser = registerUser;
const updateUser = (req, res, userRepository, userService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id; // Suponiendo que el id del usuario está en los parámetros de la solicitud
        const updatedUser = yield userService.updateUser(userId, req.body); // Llama al método de actualización del servicio de usuarios
        res.status(200).json(updatedUser);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        }
        else {
            // Manejar otros tipos de errores aquí
            res.status(500).json({ error: "Internal server error" });
        }
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, userRepository, userService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        yield userService.deleteUser(userId);
        res.status(204).send(); // No Content
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
});
exports.deleteUser = deleteUser;
const getAllUsers = (req, res, userRepository, userService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield userService.getAllUsers();
        res.status(200).json(allUsers);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
        else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
});
exports.getAllUsers = getAllUsers;
