const express = require('express');
const router = express.Router();
// const auth = require('../../middleware/auth');
// const isAuthor = require('../../middleware/isAuthor');

//Article Model
const Anime = require('../../models/anime.js');

// @route GET api/articles
// @desc Get All Articles
// @access Public
router.get('/', async(req, res) => {
    const articles = await Anime.find().sort({date: -1});
    res.json(articles)
});

// // @route POST api/articles
// // @desc Create A Post
// // @access Private
// router.post('/', auth, async (req, res) => {
//     //console.log("post",req.body);
//     const newArticle = new Article(req.body);

//     await newArticle.save().then(article => res.json(article));
// });

// // @route PUT api/articles
// // @desc Update A Post
// // @access Private and isAuthor//////////////////////////////////
// router.put('/:id', [auth,isAuthor], async (req, res) => {
//     //console.log("edit put user",req.user);
//     try {
//         article = await Article.findByIdAndUpdate(req.params.id,req.body);
//         res.json(article);
//     } catch (err) {
//         console.log(err);
//     }
// });

// // @route DELETE api/articles/:id
// // @desc Delete A Post
// // @access Private and isAuthor////////////////////////////////////
// router.delete('/:id', [auth,isAuthor], async (req, res) => {
//     try {
//         article = await Article.findByIdAndDelete(req.params.id);
//         res.json(article);
//     } catch (err) {
//         console.log(err);
//     }
// });

// // @route GET api/articles/:id
// // @desc Get an Article
// // @access Public
// router.get('/:id', async(req, res) => {
//     const article = await Article.findById(req.params.id);
//     res.json(article);
// });

module.exports = router;