import Book from '../models/Book';


function load(req, res, next, id) {
  User.get(id)
    .then((book) => {
      req.book = book; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}


function get(req, res) {
  return res.json(req.book);
}


function create(req, res, next) {
  const newBook = new Book({
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    publisher: req.body.publisher
  });

  newBook.save()
    .then(savedBook => res.json(savedBook))
    .catch(e => next(e));
}


function update(req, res, next) {
  const book = req.book;
 
  book.isbn= req.body.isbn;
  book.title= req.body.title;
  book.author= req.body.author;
  book.publisher=req.body.publisher;

  book.save()
    .then(savedBook => res.json(savedBook))
    .catch(e => next(e));
}


function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Book.list({ limit, skip })
    .then(books => res.json(books))
    .catch(e => next(e));
}


function remove(req, res, next) {
  const book = req.book;
  book.remove()
    .then(deletedBook => res.json(deletedBook))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
