import { Request, Response } from 'express'
import prisma from '../database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

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

            return response.status(201).json({message: 'Usuário cadastrado com sucesso!', user});

        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: 'Ops! Parece que algo deu errado. Estamos trabalhando para resolver isso. Por favor, tente novamente mais tarde.'
            });
        }
    }

    async login (request: Request, response: Response){
        try {
            const { email, password } = request.body;
            
            const user = await prisma.user.findUnique({where: {email}})
            
            if(!user){
                return response.status(400).json({ error: 'Usuário não cadastrado!' });
            }

            const loginPassword = await bcrypt.compare(password, user.password);

            if (!loginPassword) {
                return response.status(401).json({ error: 'Senha incorreta!' });
            }

            const jwtSecret = process.env.JWT_SECRET;
            const userPayload = { id: user.id, email: user.email };
            const token = jwt.sign(userPayload, jwtSecret!, { expiresIn: '1h' });


            return response.status(200).json({message: 'Login efetuado com sucesso!', token});
            
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: 'Ops! Parece que algo deu errado. Estamos trabalhando para resolver isso. Por favor, tente novamente mais tarde.'
            });
        }
    }

}

export default UserController ;