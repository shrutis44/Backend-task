const Post = require('../models/post');

exports.createPost = async (req, res) => {
    const { title, image, description, tags } = req.body;
    const post = new Post({ title, image, description, tags, author: req.user.id });
    await post.save();
    res.status(201).json(post);
};

exports.getPosts = async (req, res) => {

    const { title, tags } = req.query;  
    const filter = {};

    if (title) {
        filter.title = title; 
    }
    if (tags) {
        filter.tags = { $in: tags.split(',') };
    }

    try {
        const posts = await Post.find(filter);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch posts', error });
    }
    
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch post', error });
    }
};




exports.updatePost = async (req, res) => {

    const { id } = req.params;
    const { title, image, description, tags } = req.body;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized to edit this post' });
        }

        post.title = title || post.title;
        post.image = image || post.image;
        post.description = description || post.description;
        post.tags = tags || post.tags;

        const updatedPost = await post.save();
        res.json({ message: 'Post updated successfully', post: updatedPost });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update post', error });
    }

};

exports.deletePost = async (req, res) => {

    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized to delete this post' });
        }

        await post.deleteOne();
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: 'Failed to delete post', error: error.message });
    }

    
    
};
