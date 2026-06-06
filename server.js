require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Custom logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// In-memory database for books
let books = [
  {
    id: 1,
    title: "Things Fall Apart",
    author: "Chinua Achebe",
    genre: "Fiction",
    country: "Nigeria",
    available: true,
    year: 1958
  },
  {
    id: 2,
    title: "Half of a Yellow Sun",
    author: "Chimamanda Ngozi Adichie",
    genre: "Fiction",
    country: "Nigeria",
    available: true,
    year: 2006
  },
  {
    id: 3,
    title: "The Beautyful Ones Are Not Yet Born",
    author: "Ayi Kwei Armah",
    genre: "Fiction",
    country: "Ghana",
    available: false,
    year: 1968
  },
  {
    id: 4,
    title: "Americanah",
    author: "Chimamanda Ngozi Adichie",
    genre: "Fiction",
    country: "Nigeria",
    available: true,
    year: 2013
  },
  {
    id: 5,
    title: "The Famished Road",
    author: "Ben Okri",
    genre: "Fiction",
    country: "Nigeria",
    available: true,
    year: 1991
  },
  {
    id: 6,
    title: "Aya of Yop City",
    author: "Marguerite Abouet",
    genre: "Graphic Novel",
    country: "Ghana",
    available: true,
    year: 2005
  }
];

let nextId = 7;

// GET / - Welcome message
app.get('/', (req, res) => {
  res.json({ message: "My Week 2 API!" });
});

// GET /books - Retrieve all books
app.get('/books', (req, res) => {
  res.json({
    success: true,
    count: books.length,
    data: books
  });
});

// GET /books/:id - Retrieve a specific book
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({
      success: false,
      message: `Book with id ${req.params.id} not found`
    });
  }
  res.json({
    success: true,
    data: book
  });
});

// POST /books - Create a new book
app.post('/books', (req, res) => {
  const { title, author, genre, country, available, year } = req.body;

  // Validation
  if (!title || !author || !genre || !country) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: title, author, genre, country"
    });
  }

  const newBook = {
    id: nextId++,
    title,
    author,
    genre,
    country,
    available: available !== undefined ? available : true,
    year: year || new Date().getFullYear()
  };

  books.push(newBook);
  res.status(201).json({
    success: true,
    message: `Book "${title}" has been added successfully`,
    data: newBook
  });
});

// PUT /books/:id - Update a book
app.put('/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({
      success: false,
      message: `Book with id ${req.params.id} not found`
    });
  }

  const { title, author, genre, country, available, year } = req.body;
  
  if (title) book.title = title;
  if (author) book.author = author;
  if (genre) book.genre = genre;
  if (country) book.country = country;
  if (available !== undefined) book.available = available;
  if (year) book.year = year;

  res.json({
    success: true,
    message: `Book with id ${req.params.id} has been updated`,
    data: book
  });
});

// DELETE /books/:id - Delete a book
app.delete('/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Book with id ${req.params.id} not found`
    });
  }

  const deletedBook = books.splice(index, 1);
  res.json({
    success: true,
    message: `Book "${deletedBook[0].title}" has been deleted`,
    data: deletedBook[0]
  });
});

// GET /books/filter/country/:country - Filter books by country
app.get('/books/filter/country/:country', (req, res) => {
  const country = req.params.country;
  const filteredBooks = books.filter(b => b.country.toLowerCase() === country.toLowerCase());
  
  res.json({
    success: true,
    count: filteredBooks.length,
    country: country,
    data: filteredBooks
  });
});

// GET /books/filter/available - Get only available books
app.get('/books/filter/available', (req, res) => {
  const availableBooks = books.filter(b => b.available === true);
  
  res.json({
    success: true,
    count: availableBooks.length,
    data: availableBooks
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "An error occurred",
    error: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found"
  });
});

app.listen(PORT, () => {
  console.log(`Book Library API is running on http://localhost:${PORT}`);
});
