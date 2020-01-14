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

router.route('/love/:id').get((req, res)=>{
    let id = req.params.id;
    Post.find({_id: id})
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
})

router.route('/love/:id').put((req, res)=>{
    // let id = req.params.id;
    // let newComment = [];
    // username:{type:String, require:true},
    // message:{type: String, require:true}
    console.log(req.params.id);
    let update = [{username:"john",message:'testing array'}];
    Post.findByIdAndUpdate({ _id: req.params.id}, {$push: {comment: update}})
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));

    // Post.find({_id: id})
    // // .then(post => res.json(post)) //return as json
    // // .catch(err => res.status(400).json("Error: " + err));
    // newComment.push("testing here");

    // const newPost = new Post ({
    //     newComment
    // })

    // newPost.save()

})

//REVISE
// router.route('/love/:_id').post((req, res)=>{
//     id = req.body.id;
//     let getComment =[];

//     Post.find(id, ()=>{
//         //add array
//         comments.push(getComment);
//     })

//     Post.save();

// })

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

//add posts
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
        date,
    })

    newPost.save()
    .then((item)=> res.json(item.id))
    .catch(err => res.status(400).json("Error: " + err));

})

//add comments

module.exports = router;
