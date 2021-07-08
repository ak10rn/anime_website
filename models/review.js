const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ReviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
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