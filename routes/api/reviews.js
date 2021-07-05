const express = require('express');
const router = express.Router();
// const auth = require('../../middleware/auth');
// const isAuthor = require('../../middleware/isAuthor');

//Article Model
const Review = require('../../models/review.js');

// @route GET api/reviews
// @desc Get All reviews
// @access Public
router.get('/', async(req, res) => {
    try {
        const reviews = await Review.find().sort({ date: -1 });
        res.json(reviews);
    } catch (err) {
        console.log(err);
    }
});

// @route POST api/reviews
// @desc Create An review
// @access Private
router.post('/', async (req, res) => {
    //console.log("post",req.body);
    try {
        const newReview = new Review(req.body);
        await newReview.save().then(review => res.json(review));
    } catch (err) {
        console.log(err);
    }
});

// @route PUT api/reviews
// @desc Update An review
// @access Private and isAuthor
router.put('/:id', async (req, res) => {
    try {
        review = await Review.findByIdAndUpdate(req.params.id);
        res.json(review);
    } catch (err) {
        console.log(err);
    }
});

// @route DELETE api/reviews/:id
// @desc Delete An review
// @access Private and isAuthor////////////////////////////////////
router.delete('/:id', async (req, res) => {
    try {
        review = await Review.findByIdAndDelete(req.params.id);
        res.json(review);
    } catch (err) {
        console.log(err);
    }
});

// @route GET api/reviews/:id
// @desc Get an review
// @access Public
router.get('/:id', async(req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        res.json(review);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;