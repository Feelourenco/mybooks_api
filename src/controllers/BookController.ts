import { Request, Response } from 'express';
import prisma from '../database';
import dotenv from 'dotenv';

dotenv.config();

class BookController {
    
  async register(request: Request, response: Response) {
    
    try {
      const { book_name, resume, userId } = request.body;

      const book = await prisma.book.findFirst({
        where: {
          book_name: book_name,
          userId: userId
        }
      });

      if(book){
        return response.status(400).json({error: "Esse livro já está cadastrado!"});
      }

      await prisma.book.create({
        data: {
            book_name: book_name,
            resume: resume,
            userId: userId
        }
      })

      return response.status(201).json({message: "Livro cadastrao com sucesso!"});

    } catch (error) {
        console.error(error);
        return response.status(500).json({
            error: 'Ops! Parece que algo deu errado. Estamos trabalhando para resolver isso. Por favor, tente novamente mais tarde.'
        });
    }
  }

  async getAllUserBooks(request: Request, response: Response){

    try {

        const {userId} = request.body;

        const books = await prisma.book.findMany({
            where: {
                userId: userId
            }
        })

        if (!userId) {
            return response.status(400).json({ error: 'ID do usuário necessário!' });
          }

        return response.status(200).json(books)
        
        
    } catch (error) {
        console.error(error);
        return response.status(500).json({
            error: 'Ops! Parece que algo deu errado. Estamos trabalhando para resolver isso. Por favor, tente novamente mais tarde.'
        });
    }
  }

  async getBook(request: Request, response: Response){
    try {
      
      const {userId} = request.body;
      const {bookId} = request.params;

      const book = await prisma.book.findFirst({
        where: {
          id: parseInt(bookId, 10),
          userId: userId
        }
      });

      if (!userId) {
        return response.status(400).json({ error: 'ID do usuário necessário!' });
      }

      if(!bookId){
        return response.status(400).json({ error: 'Este Livro não existe !' });
      }

      return response.status(200).json(book);

    } catch (error) {
        console.error(error);
        return response.status(500).json({
            error: 'Ops! Parece que algo deu errado. Estamos trabalhando para resolver isso. Por favor, tente novamente mais tarde.'
        });
    }
  }
}


export default BookController;
