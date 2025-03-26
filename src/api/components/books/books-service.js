const booksRepository = require('./books-repository');

async function getBooks() {
  return booksRepository.getBooks();
}

async function create(title) {
  return booksRepository.create(title);
}

async function getBooksPaginated(offset, limit) {
  try {
    const books = await Book.find()
      .skip(offset)
      .limit(limit);
    return books;
  } catch (error) {
    throw error;
  }
}

async function countBooks() {
  try {
    return await Book.countDocuments();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getBooks,
  create,
  getBooksPaginated,
  countBooks,
};
