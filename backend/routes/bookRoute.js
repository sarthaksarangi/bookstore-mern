import  express from 'express'
import { Book } from '../models/bookModel.js';
const router = express.Router();



//Route for saving a new Book
router.post("/", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.status(400).send({
          message: "Send all the required fields: title,author,publishYear",
        });
      }
      //Lets create a variable for our new book
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
      };
      const book = await Book.create(newBook);
  
      return res.status(201).send(book);
    } catch (e) {
      console.log(e.message);
      res.status(500).send({ message: e.message });
    }
  });
  
  // Route for Get All Books from database
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
  //Now route all the books from the database by its id
  
  router.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const book = await Book.findById(id);
      res.status(201).json(book);
    } catch (e) {
      console.log(e.message);
      res.status(500).send({ message: e.message });
    }
  });
  
  //Route to update a book
router.put("/:id", async (req, res) => {
    try {
      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.status(400).send({
          message: "Send all the required fields: title,author,publishYear",
        });
      }
  
      const {id} = req.params; //will get the id from the url 
      const result = await Book.findByIdAndUpdate(id, req.body)
  
      if(!result){
          return res.status(404).json({message: 'Book not found'})
  
      }
      return res.status(200).send({message : 'Book updated successfully'});
  
    } catch (e) {
      console.log(e.message);
      res.status(500).send({ message: e.message });
    }
  });
      //Route for deleting a book
  
router.delete('/:id', async (req,res)=>{
          try{
              const {id} = req.params; //will get the id from the url 
               const result = await Book.findByIdAndDelete(id)
               if(!result){
                  return res.status(404).json({message: 'Book not found'})
              }
              return res.status(200).send({message : 'Book deleted successfully'});
          }
          catch(e){
              console.log(e.message);
              res.status(500).send({ message: e.message });
          }
      })


export default router;