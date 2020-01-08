const router = require('express').Router();
let Post = require('../model/postModel');


router.route('/').get((req, res)=>{
    Post.find()
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
})

router.route('/love').get((req, res)=>{
    Post.find({category:"love"})
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
})

router.route('/job').get((req, res)=>{
    Post.find({category:"job"})
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
})

router.route('/add').post((req, res)=>{
   const title = req.body.title;
   const category = req.body.category;
   const description = req.body.description;
   const date = Date.parse(req.body.date);

    const newPost = new Post ({
        title,
        category,
        description,
        date 
    })

    newPost.save()
    .then((item)=> res.json(item.id))
    .catch(err => res.status(400).json("Error: " + err));

})

module.exports = router;
