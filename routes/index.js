var express = require('express');
var router = express.Router();
const readerModel = require('../models/readers');
const bookModel = require('../models/books');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const readers = await readerModel.find();
  const books = await bookModel.find();

  res.render('index', { readers, books });
});

router.post('/add-reader', async (req, res) => {
  const searchReader = await readerModel.findOne({
    name: req.body.name
  });
  if (!searchReader) {
    const newReader = new readerModel({
      name: req.body.name,
      favoriteBooks: []
    });
    const savedReader = await newReader.save();
    res.redirect('/');
  }
});

router.post('/add-book', async (req, res) => {
  const searchBook = await bookModel.findOne({
    name: req.body.name
  });
  if (!searchBook) {
    const newBook = new bookModel({
      name: req.body.name,
      author: req.body.author,
      editor: req.body.editor,
      year: req.body.year,
      favoriteReaders: []
    });
    const savedBook = await newBook.save();
    res.redirect('/');
  }
});

router.get('/readers', async (req, res) => {
  const readers = await readerModel.find();
  res.render('readers', { readers });
});

router.get('/books', async (req, res) => {
  const books = await bookModel.find();
  res.render('books', { books });
});

router.get('/reader-page', async (req, res) => {
  const reader = await readerModel.findById(req.query.id).populate('favoriteBooks').exec();
  res.render('reader-page', { reader });
});

router.get('/book-page', async (req, res) => {
  const book = await bookModel.findById(req.query.id).populate('favoriteReaders').exec();
  res.render('book-page', { book });
});

router.post('/add-favorite-book', async (req, res) => {
  const reader = await readerModel.findById(req.body.reader);
  console.log(reader);

  const searchBook = reader.favoriteBooks.find(book => book.id === req.body.book);
  console.log(searchBook);
  if (!searchBook) {
    const book = await bookModel.findById(req.body.book);
    console.log(book);
    await readerModel.updateOne({
      name: reader.name
    }, {
      favoriteBooks: [...reader.favoriteBooks, book]
    });
    await bookModel.updateOne({
      name: book.name
    }, {
      favoriteReaders: [...book.favoriteReaders, reader]
    });
  }

  res.redirect('/');
})

router.get('/delete-reader', async (req, res) => {
  await readerModel.deleteOne({ name: req.query.name });
  res.redirect('/readers');
})

module.exports = router;
