const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const postSchema = new Schema({
    title:{type:String, require:true},
    user:{type:String, require:true},
    category:{type: String, require:true},
    description:{type:String, require:true},
    date: {type: Date, require:true}
})

const Post = mongoose.model("Post", postSchema);

module.exports = Post;