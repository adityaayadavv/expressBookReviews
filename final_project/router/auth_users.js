const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ 
let userswithsamename = users.filter((user)=>{
    return user.username ===username;
})
if(userswithsamename.length>0){
return true;
}else {return false;}
}

const authenticatedUser = (username,password)=>{ 
let validUsers = users.filter((user)=>{
    return (user.username === username && user.password === password);
})
if(validUsers.length>0){return true;}
else{return false;}

}


regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (!username || !password) {
      return res.status(400).json({message: "Username and password are required"});
    }
  
    if (authenticatedUser(username, password)) {
      let accessToken = jwt.sign(
        { data: username },
        'access', 
        { expiresIn: 60 * 60 } // 1 hour
      );
  
      req.session.authorization = {
        accessToken,
        username
      };
  
      return res.status(200).json({message: "Login successful"});
    } else {
      return res.status(401).json({message: "Invalid login. Check username and password."});
    }
  });


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  
  const isbn = req.params.isbn;
  const review = req.query.review; 
  const username = req.session.authorization.username;

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found" });
  }

  // Add or update the user's review
  books[isbn].reviews[username] = review;

  return res.status(200).json({
    message: "Review added/updated successfully"
  });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization.username;
  
    // Check if the book exists
    if (!books[isbn]) {
      return res.status(404).json({ message: "Book not found" });
    }
  
    // Check if a review by the user exists
    if (books[isbn].reviews[username]) {
      delete books[isbn].reviews[username]; // Remove user's review
      return res.status(200).json({ message: "Review deleted successfully" });
    } else {
      return res.status(404).json({ message: "No review by this user to delete" });
    }
  });

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
