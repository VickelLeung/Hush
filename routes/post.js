const router = require("express").Router();
let Post = require("../model/postModel");

router.route("/").get((req, res) => {
  Post.find()
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
});

// Categories endpoints
router.route("/love").get((req, res) => {
  Post.find({ category: "love" })
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/love/:id").get((req, res) => {
  let id = req.params.id;
  Post.find({ _id: id })
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/love/comment/:id").put((req, res) => {
  // let id = req.params.id;
  const username = req.body.username;
  const message = req.body.message;
  console.log(req.params.id);
  let update = [{ username: username, message: message }];
  Post.findByIdAndUpdate({ _id: req.params.id }, { $push: { comment: update } })
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
});

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

router.route("/employment").get((req, res) => {
  Post.find({ category: "employment" })
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/employment/:id").get((req, res) => {
  let id = req.params.id;
  Post.find({ _id: id })
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/family").get((req, res) => {
  Post.find({ category: "family" })
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/family/:id").get((req, res) => {
  let id = req.params.id;
  Post.find({ _id: id })
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/school").get((req, res) => {
  Post.find({ category: "school" })
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/school/:id").get((req, res) => {
  let id = req.params.id;
  Post.find({ _id: id })
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/work").get((req, res) => {
  Post.find({ category: "work" })
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/work/:id").get((req, res) => {
  let id = req.params.id;
  Post.find({ _id: id })
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/dating").get((req, res) => {
  Post.find({ category: "dating" })
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/dating/:id").get((req, res) => {
  let id = req.params.id;
  Post.find({ _id: id })
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/finance").get((req, res) => {
  Post.find({ category: "finance" })
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/finance/:id").get((req, res) => {
  let id = req.params.id;
  Post.find({ _id: id })
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/family").get((req, res) => {
  Post.find({ category: "family" })
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/family/:id").get((req, res) => {
  let id = req.params.id;
  Post.find({ _id: id })
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/test/:id").get((req, res) => {
  let id = req.params.id;
  console.log(id);
  Post.find({ _id: id })
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/miscellaneous").get((req, res) => {
  Post.find({ category: "miscellaneous" })
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/miscellaneous/:id").get((req, res) => {
  let id = req.params.id;
  Post.find({ _id: id })
    .then(post => res.json(post)) //return as json
    .catch(err => res.status(400).json("Error: " + err));
});

// End of categories endpoints

//add posts
router.route("/add").post((req, res) => {
  const title = req.body.title;
  const category = req.body.category;
  const description = req.body.description;
  const date = Date.parse(req.body.date);
  const user = req.body.user;
  const toExpire = req.body.toExpire;
  let expireAt = "";

  if (toExpire) {
    expireAt = Date.now();
  }

  const newPost = new Post({
    title,
    user,
    category,
    description,
    date,
    toExpire,
    expireAt
  });

  newPost
    .save()
    .then(item => res.json(item.id))
    .catch(err => res.status(400).json("Error: " + err));
});

//Search
// router.route("/search/:query").get((req, res) => {
router.route("/search/:query").get((req, res) => {
  let query = req.params.query;
  let results = [];
  console.log("p:" + query);

  Post.find({
    title: { $regex: ".*" + query + ".*", $options: "i" }
  }).then(info => {
    if (info.length !== 0) {
      results.push(info);
    } else {
      let temp = [];
      results.push(temp);
    }

    Post.find({
      description: { $regex: ".*" + query + ".*", $options: "i" }
    }).then(info => {
      if (info.length !== 0) {
        results.push(info);
      } else {
        let temp = [];
        results.push(temp);
      }

      console.log("inside desc : " + results);
      res.send(results);
    });
  });
});

//add comments

module.exports = router;
