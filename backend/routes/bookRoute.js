import express from 'express'
import { Book } from '../models/bookModels.js';


const router = express.Router();


//Route for save new books
router.post('/', async (request, resposne) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return resposne.status(400).send({
                message: 'Send all required fields'
            })
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        }
        const book = await Book.create(newBook)

        return resposne.status(201).send(book)
    } catch (error) {
        console.log(error.message);
        resposne.status(500).send({ message: error.message })
    }
})

//Route for Get all Books from data base
router.get('/', async (request, resposne) => {
    try {
        const books = await Book.find({});

        return resposne.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error.message);
        resposne.status(500).send({ message: error.message })
    }
})


//Route for Get One Book  from database by id
router.get('/:id', async (request, resposne) => {
    try {

        const { id } = request.params
        const book = await Book.findById(id);

        return resposne.status(200).json(book)
    } catch (error) {
        console.log(error.message);
        resposne.status(500).send({ message: error.message })
    }
})

//Route for Update Book
router.put('/:id', async (request, response) => {
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
      ) {
        return response.status(400).send({
          message: 'Send all required huy: title, author, publishYear',
        });
      }
  
      const { id } = request.params;
  
      const result = await Book.findByIdAndUpdate(id, request.body);
  
      if (!result) {
        return response.status(404).json({ message: 'Book not found' });
      }
  
      return response.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

//Route for deleting Book 
router.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await Book.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).json({ message: 'Book not found' });
      }
  
      return response.status(200).send({ message: 'Book deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });  



  export default router