const client = require("../DB/Db.config")

// GET /books
const GetBook = async (req, res) => {
  try {
    const { body } = await client.search({
      index: "books",
      body: {
        query: {
          match_all: {}
        }
      }
    })
    res.status(200).send(body.hits.hits.map((hit) => hit))
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "fail", error: error.message })
  }
}

// GET /books/:id
const GetBookDetails = async (req, res) => {
  try {
    const { body } = await client.get({
      index: "books",
      id: req.params.id
    })
    res.status(200).send({ message: "success", data: body._source })
  } catch (error) {
    if (error.statusCode === 404) {
      res.status(404).send({ message: "fail", error: "Book not found" })
    } else {
      res.status(500).send({ message: "fail", error: error.message })
    }
  }
}

// POST /books
const PostBook = async (req, res) => {
  try {
    const { title, author, publishedDate, description, price } = req.body
    const { body } = await client.index({
      index: "books",
      body: {
        title,
        author,
        publishedDate,
        description,
        price
      }
    })
    res.status(201).send({ message: "success", data: body })
  } catch (error) {
    res.status(500).send({ message: "fail", error: error.message })
  }
}

// PUT /books/:id
const UpdateBooks = async (req, res) => {
  try {
    const { title, author, publishedDate, description, price } = req.body
    const { body } = await client.update({
      index: "books",
      id: req.params.id,
      body: { doc: { title, author, publishedDate, description, price } }
    })
    res.status(200).send({ message: "success", data: body })
  } catch (error) {
    if (error.statusCode === 404) {
      res.status(404).send({ message: "Book not found" })
    } else {
      res.status(500).send({ message: "fail", error })
    }
  }
}

module.exports = {
  GetBook,
  GetBookDetails,
  PostBook,
  UpdateBooks
}
