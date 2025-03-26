const booksService = require('./books-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getBooks(request, response, next) {
  try {
    const books = await booksService.getBooksPaginated(offset, limit);
    const offset = parseInt(request.query.offset) || 0;
    const limit = parseInt(request.query.limit) || 10;
    // Dapatkan total jumlah buku
    const totalBooks = await booksService.countBooks();

    // Hitung total halaman
    const totalPages = Math.ceil(totalBooks / limit);

    // Tentukan URL untuk next dan previous page
    const baseUrl = `${request.protocol}://${request.get('host')}${request.baseUrl}`;
    
    // Buat response dengan struktur PokeAPI
    const responseData = {
      count: totalBooks,
      next: offset + limit < totalBooks 
        ? `${baseUrl}?offset=${offset + limit}&limit=${limit}` 
        : null,
      previous: offset > 0 
        ? `${baseUrl}?offset=${Math.max(0, offset - limit)}&limit=${limit}` 
        : null,
      results: books
    };

    return response.status(200).json(books);
  } catch (error) {
    return next(error);
  }
}

async function createBook(request, response, next) {
  try {
    const { title } = request.body;

    if (!title) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Title is required');
    }

    const book = await booksService.create(title);

    return response.status(200).json(book);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getBooks,
  createBook,
};
