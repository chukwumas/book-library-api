# Book Library API

A comprehensive RESTful API for managing a collection of African books, with a focus on Nigerian and Ghanaian literature.

## Project Overview

This is the backend development project for Group 6, Subgroup B. The API allows users to perform CRUD operations on a book collection, featuring works from prominent African authors.

## Features

- Full CRUD operations for book management
- Filter books by country (Nigeria, Ghana)
- Filter available books
- Comprehensive error handling
- Request logging middleware
- Static HTML interface for testing
- CORS enabled for cross-origin requests

## Tech Stack

- Node.js
- Express.js
- JavaScript (ES6+)
- CORS
- dotenv

## Installation

1. Clone the repository
   ```bash
   git clone https://github.com/chukwumas/book-library-api.git
   cd book-library-api
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a .env file (already included)
   ```
   PORT=5000
   NODE_ENV=development
   ```

4. Start the server
   ```bash
   npm start
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

### Welcome Endpoint
- **GET** `/` - Returns welcome message

### Book Operations

#### Get All Books
- **GET** `/books`
- Returns all books in the collection

#### Get Book by ID
- **GET** `/books/:id`
- Returns a specific book by ID

#### Create a New Book
- **POST** `/books`
- Request body:
  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "genre": "Genre",
    "country": "Nigeria",
    "available": true,
    "year": 2024
  }
  ```
- Required fields: title, author, genre, country

#### Update a Book
- **PUT** `/books/:id`
- Request body: Any fields to update
  ```json
  {
    "title": "New Title",
    "available": false
  }
  ```

#### Delete a Book
- **DELETE** `/books/:id`
- Removes a book from the collection

### Filter Endpoints

#### Filter by Country
- **GET** `/books/filter/country/:country`
- Returns books from a specific country (Nigeria, Ghana)

#### Get Available Books
- **GET** `/books/filter/available`
- Returns only available books

## Sample Data

The API includes 6 pre-loaded African books:

1. Things Fall Apart - Chinua Achebe (Nigeria)
2. Half of a Yellow Sun - Chimamanda Ngozi Adichie (Nigeria)
3. The Beautyful Ones Are Not Yet Born - Ayi Kwei Armah (Ghana)
4. Americanah - Chimamanda Ngozi Adichie (Nigeria)
5. The Famished Road - Ben Okri (Nigeria)
6. Aya of Yop City - Marguerite Abouet (Ghana)

## Testing

### Using the Web Interface
1. Navigate to `http://localhost:5000` in your browser
2. Use the interactive interface to test all endpoints

### Using cURL
```bash
# Get all books
curl http://localhost:5000/books

# Get a specific book
curl http://localhost:5000/books/1

# Add a new book
curl -X POST http://localhost:5000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"New Book","author":"Author","genre":"Fiction","country":"Nigeria"}'

# Update a book
curl -X PUT http://localhost:5000/books/1 \
  -H "Content-Type: application/json" \
  -d '{"available":false}'

# Delete a book
curl -X DELETE http://localhost:5000/books/1

# Filter by country
curl http://localhost:5000/books/filter/country/Nigeria

# Get available books
curl http://localhost:5000/books/filter/available
```

### Using Postman
Import the provided Postman collection to test all endpoints with a user-friendly interface.

## Project Structure

```
book-library-api/
├── server.js           # Main Express application
├── package.json        # Project dependencies
├── .env                # Environment variables
├── .gitignore          # Git ignore rules
├── public/
│   └── index.html      # Web interface for testing
└── README.md           # This file
```

## Error Handling

The API includes comprehensive error handling:
- 400 Bad Request: Missing required fields
- 404 Not Found: Resource not found
- 500 Internal Server Error: Server errors

All responses include a success flag and descriptive messages.

## Middleware

### Request Logging
All requests are logged with timestamp, method, and path:
```
[2024-06-03T11:25:00.000Z] GET /books
[2024-06-03T11:25:05.000Z] POST /books
```

### CORS
Cross-Origin Resource Sharing is enabled for all routes.

## Author

Chukwuma Stephen Nwala

## License

ISC

## Notes

This is a student project for backend development coursework. The API uses in-memory storage and will reset when the server restarts.
