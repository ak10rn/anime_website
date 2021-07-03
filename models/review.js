const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ReviewSchema = new Schema({
    username: {
        type: String,
        default: "default username"
    },
    mal_id: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    },
    user_rating: {
        type: Number,
        default: null
    },
    comment: {
        type: String,
        default: "No comment"
    }
});

const Review = mongoose.model('review', ReviewSchema);

module.exports = Review;