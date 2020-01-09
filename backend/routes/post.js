const router = require('express').Router();
let Post = require('../model/postModel');


router.route('/').get((req, res)=>{
    Post.find()
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
})

// Categories endpoints
router.route('/love').get((req, res)=>{
    Post.find({category:"love"})
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
})

router.route('/love/:_id').get((req, res)=>{
    Post.find({category:"love"})
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
})

router.route('/employment').get((req, res)=>{
    Post.find({category:"employment"})
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
})

router.route('/family').get((req, res)=>{
    Post.find({category:"family"})
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
})

router.route('/school').get((req, res)=>{
    Post.find({category:"school"})
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
})

// End of categories endpoints

router.route('/add').post((req, res)=>{
   const title = req.body.title;
   const category = req.body.category;
   const description = req.body.description;
   const date = Date.parse(req.body.date);
   const user = req.body.user;

    const newPost = new Post ({
        title,
        user,
        category,
        description,
        date 
    })

    newPost.save()
    .then((item)=> res.json(item.id))
    .catch(err => res.status(400).json("Error: " + err));

})

module.exports = router;
