const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: String,
    author: String,
    editor: String,
    year: String,
    favoriteReaders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'readers' }]
});

const bookModel = mongoose.model('books', bookSchema);

module.exports = bookModel;