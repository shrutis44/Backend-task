const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true 
    },
    image: String,
    description: { 
        type: String, 
        required: true 
    },
    tags: [String],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', PostSchema);
