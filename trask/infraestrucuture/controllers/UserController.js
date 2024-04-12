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
exports.loginUser = exports.getAllUsers = exports.deleteUser = exports.updateUser = exports.createUser = void 0;
const createUser = (req, res, userService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = yield userService.createUser(req.body);
        res.status(201).json(newUser);
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
exports.createUser = createUser;
const updateUser = (req, res, userService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield userService.updateUser(req.body);
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
const deleteUser = (req, res, userService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        yield userService.deleteUser(userId);
        res.status(204).send();
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
const getAllUsers = (req, res, userService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService.getAllUsers();
        res.status(200).json(users);
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
exports.getAllUsers = getAllUsers;
const loginUser = (req, res, userService) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userService.loginUser(email, password);
        if (!user) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }
        res.status(200).json(user);
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
exports.loginUser = loginUser;
