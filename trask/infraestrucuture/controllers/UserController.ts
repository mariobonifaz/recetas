import { Request, Response } from 'express';
import { UserService } from '../../applicartion/services/user-cases/UserService'

export const createUser = async (req: Request, res: Response, userService: UserService) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export const updateUser = async (req: Request, res: Response, userService: UserService) => {
    try {
        const updatedUser = await userService.updateUser(req.body);
        res.status(200).json(updatedUser);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            // Manejar otros tipos de errores aquí
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

export const deleteUser = async(req:Request, res:Response, userService: UserService) =>{
    try {
        const userId = req.params.id;
        await userService.deleteUser(userId);
        res.status(204).send();
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            // Manejar otros tipos de errores aquí
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export const getAllUsers = async (req: Request, res:Response, userService: UserService) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch(err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            // Manejar otros tipos de errores aquí
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export const loginUser = async (req: Request, res: Response, userService: UserService) => {
    try {
        const { email, password } = req.body;
        const user = await userService.loginUser(email, password);
        if (!user) {
            res.status(401).json({ error: 'Invalid email or password' });
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
};