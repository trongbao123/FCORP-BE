const cors = require("fastify-cors")
const { GetBook, GetBookDetails, PostBook, UpdateBooks } = require("../Controller/BookController")
const routers = (fastify) => {
  fastify.register(cors)
  // GET /books
  fastify.get("/books", GetBook)

  // GET /books/:id
  fastify.get("/books/:id", GetBookDetails)

  // POST /books
  fastify.post("/books", PostBook)

  // PUT /books/:id
  fastify.put("/books/:id", UpdateBooks)
}

module.exports = routers
