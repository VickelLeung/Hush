const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const postSchema = new Schema({
    category:{type: String, require:true},
    description:{type:String, require:true},
    date: {type: Date, require:true}
})

const Post = mongoose.model("Post", postSchema);

module.exports = Post;