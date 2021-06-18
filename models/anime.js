const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const AnimeSchema = new Schema({
    name: {
        type: String,
        default: "default userid"
    },
    date: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        default: 0
    }
});

const Anime = mongoose.model('anime', AnimeSchema);

module.exports = Anime;