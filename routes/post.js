const router = require("express").Router();
let Post = require("../model/postModel");

getInfo = (req, res) => {
  Post.find()
    .then((post) => res.json(post)) //return as json
    .catch((err) => res.status(400).json("Error: " + err));
};

getInfoCategory = (request, resources, userCategory) => {
  Post.find({ category: userCategory })
    .then((post) => resources.json(post)) //return as json
    .catch((err) => resources.status(400).json("Error: " + err));
};

getPostId = (request, resources, id) => {
  Post.find({ _id: id })
    .then((post) => resources.json(post)) //return as json
    .catch((err) => resources.status(400).json("Error: " + err));
};

commentPost = (req, res, id) => {
  const username = req.body.username;
  const message = req.body.message;

  let update = [{ username: username, message: message }];
  Post.findByIdAndUpdate({ _id: id }, { $push: { comment: update } })
    .then((post) => res.json(post)) //return as json
    .catch((err) => res.status(400).json("Error: " + err));
};

router.route("/").get((req, res) => {
  getInfo(req, res);
});

// Categories endpoints
router.route("/love").get((req, res) => {
  getInfoCategory(req, res, "love");
});

router.route("/love/:id").get((req, res) => {
  let id = req.params.id;
  getPostId(req, res, id);
});

router.route("/employment").get((req, res) => {
  getInfoCategory(req, res, "employment");
});

router.route("/employment/:id").get((req, res) => {
  getPostId(req, res, req.params.id);
});

router.route("/family").get((req, res) => {
  getInfoCategory(req, res, "family");
});

router.route("/family/:id").get((req, res) => {
  getPostId(req, res, req.params.id);
});

router.route("/school").get((req, res) => {
  getInfoCategory(req, res, "school");
});

router.route("/school/:id").get((req, res) => {
  getPostId(req, res, req.params.id);
});

router.route("/work").get((req, res) => {
  getInfoCategory(req, res, "work");
});

router.route("/work/:id").get((req, res) => {
  getPostId(req, res, req.params.id);
});

router.route("/dating").get((req, res) => {
  getInfoCategory(req, res, "dating");
});

router.route("/dating/:id").get((req, res) => {
  getPostId(req, res, req.params.id);
});

router.route("/finance").get((req, res) => {
  getInfoCategory(req, res, "finance");
});

router.route("/finance/:id").get((req, res) => {
  getPostId(req, res, req.params.id);
});

router.route("/family").get((req, res) => {
  getInfoCategory(req, res, "family");
});

router.route("/family/:id").get((req, res) => {
  getPostId(req, res, req.params.id);
});

router.route("/miscellaneous").get((req, res) => {
  getInfoCategory(req, res, "miscellaneous");
});

router.route("/miscellaneous/:id").get((req, res) => {
  getPostId(req, res, req.params.id);
});

router.route("/love/comment/:id").put((req, res) => {
  commentPost(req, res, req.params.id);
});

router.route("/employment/comment/:id").put((req, res) => {
  commentPost(req, res, req.params.id);
});

router.route("/family/comment/:id").put((req, res) => {
  commentPost(req, res, req.params.id);
});

router.route("/school/comment/:id").put((req, res) => {
  commentPost(req, res, req.params.id);
});

router.route("/dating/comment/:id").put((req, res) => {
  commentPost(req, res, req.params.id);
});

router.route("/work/comment/:id").put((req, res) => {
  commentPost(req, res, req.params.id);
});

router.route("/finance/comment/:id").put((req, res) => {
  commentPost(req, res, req.params.id);
});

router.route("/family/comment/:id").put((req, res) => {
  commentPost(req, res, req.params.id);
});

router.route("/miscellaneous/comment/:id").put((req, res) => {
  commentPost(req, res, req.params.id);
});

// End of categories endpoints

//add posts
router.route("/add").post((req, res) => {
  const title = req.body.title;
  const category = req.body.category;
  const description = req.body.description;
  const date = Date.parse(req.body.date);
  const email = req.body.email;
  const user = req.body.user;
  const toExpire = req.body.toExpire;
  let expireAt = "";

  if (toExpire) {
    expireAt = Date.now();
  }

  const newPost = new Post({
    title,
    user,
    email,
    category,
    description,
    date,
    toExpire,
    expireAt,
  });

  newPost
    .save()
    .then((item) => res.json(item.id))
    .catch((err) => res.status(400).json("Error: " + err));
});

//Search
router.route("/search/:query").get((req, res) => {
  let query = req.params.query;
  let results = [];
  console.log("p:" + query);

  Post.find({
    title: { $regex: ".*" + query + ".*", $options: "i" },
  }).then((info) => {
    if (info.length !== 0) {
      results.push(info);
    } else {
      let temp = [];
      results.push(temp);
    }

    Post.find({
      description: { $regex: ".*" + query + ".*", $options: "i" },
    }).then((info) => {
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

router.route("/user/:email").get((req, res) => {
  let email = req.params.email;

  Post.find({ email: email })
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
