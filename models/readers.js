const mongoose = require('mongoose');

const readerSchema = new mongoose.Schema({
    name: String,
    favoriteBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'books' }]
});

const readerModel = mongoose.model('readers', readerSchema);

module.exports = readerModel;