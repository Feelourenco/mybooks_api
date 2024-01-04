import { Request, Response } from 'express'
import prisma from '../database';
import bcrypt from 'bcrypt';

class UserController {
    
    async register(request: Request, response: Response){
        try {
            
            const { first_name, last_name, email, password, confirmPassword } = request.body;

            const userExist = await prisma.user.findUnique({where: {email}})

            if(userExist){
                return response.status(400).json({ error: 'Usuário já cadastrado!' });
            }

            if(password != confirmPassword) {
                return response.status(400).json({ error: 'As senhas devem ser iguais!' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.create({
                data: {
                    first_name,
                    last_name,
                    email,
                    password: hashedPassword
                }
            });

            return response.status(201).json({message: 'Usuário criado com sucesso !', user});

        } catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Erro no servidor...' });
        }
    }

}

export default UserController ;