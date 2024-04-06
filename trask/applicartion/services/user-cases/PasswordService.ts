import * as bcrypt from 'bcrypt';

export class PasswordService {
    static async hashPassword(password: string): Promise<string> { // Asegúrate de especificar que la función devuelve una promesa de tipo string
        const saltRounds = 10;
        const hashedPassword: string = await bcrypt.hash(password, saltRounds); // Aquí también especifica que hashedPassword es de tipo string
        return hashedPassword;
    }

    static async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}