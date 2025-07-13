const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if(username&&password){
    if(!isValid(username)){
        users.push({"username": username, "password": password});
        res.status(200).json("User succesfully registered, Now you can Login")
    }else{
        res.status(404).json("User already exists");
    }
  }else{
  return res.status(404).json({message: "Unable to register us"});
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let allBooks = JSON.stringify(books, null, 2);
  if(Object.keys(books).length>0){
  res.status(200).send(allBooks);
  }else{
  return res.status(404).json({message: "No books available"});
  }
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];
  if(isbn.length>0){
    res.status(200).json(book);
  }else{
  return res.status(404).json({message: "Invalid ISBN"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let booksByAuthor = [];
  for(let key in books){
    if(books[key].author.toLowerCase() === author.toLowerCase()){
        booksByAuthor.push(books[key]);
    }
  }
  if(booksByAuthor.length > 0){
    res.status(200).json(booksByAuthor);
  }else{
  return res.status(404).json({message: "No books found for the given author"});
  }
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let booksByTitle = [];
  for(let key in books){
    if(books[key].title.toLowerCase() === title.toLowerCase()){
        booksByTitle.push(books[key]);
    }
  }
  if(booksByTitle.length > 0){
    res.status(200).json(booksByTitle);
  }else{
  return res.status(404).json({message: "No books found for the given author"});
  }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];

  
  if(book && book.reviews && Object.keys(book.reviews).length > 0){
    res.status(200).json(book.reviews);
  }else{
  return res.status(404).json({message: "No reviews found for the book"});
  }
});

module.exports.general = public_users;
