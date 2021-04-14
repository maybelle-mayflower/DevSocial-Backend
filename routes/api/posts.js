const express = require('express');
const router = express.Router();

const {check, validationResult} = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');


//@route  POST api/posts
//@desc   Create a post
//@access private

router.post('/',[auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const newPost = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user:req.user.id
        };

        const post = new Post(newPost);

        await post.save();
        res.json(post);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    
    }
  
});

//@route  GET api/posts
//@desc   Get all posts
//@access private

router.get('/', auth, async(req, res) => {
    try {
        const posts = await Post.find().sort({date:-1});

        res.json(posts);
    } catch (error) {
        
        console.error(error.message);
        res.status(500).send('Server error');
    }
   

});

//@route  GET api/posts/:id
//@desc   Get posts by ID
//@access private

router.get('/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id).sort({date:-1});
        if(!post){
            res.status(404).json({msg: 'Post not found'});
        }
        res.json(post);
    } catch (error) {
        
        console.error(error.message);
        if(error.kind == 'ObjectId'){
            res.status(404).json({msg: 'Post not found'});
        }
        res.status(500).send('Server error');
    }
});

//@route  DELETE api/posts/:id
//@desc   Delete posts by ID
//@access private

router.delete('/:id', auth, async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);
        
        if(!post){
            return res.status(404).json({msg: 'Post not found'});
        }

        //Check if user deleting is user that owns post
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not authorized'});
        }
    
        await post.remove();

        res.json({msg: 'Post is deleted'});

    } catch (error) {
        console.error(error.message);

        if(error.kind == 'ObjectId'){
            res.status(404).json({msg: 'Post not found'});
        }
        res.status(500).send('Server error');
    }
});

//@route  PUT api/posts/like/:id
//@desc   Like a post
//@access private

router.put('/like/:id', auth, async (req, res) => {
    try {
        
        const post = await Post.findById(req.params.id);
        //Check if post has already been liked by user

        const likeArr = post.likes.filter(like => like.user.toString() === req.user.id);
        if(likeArr.length > 0){
           return res.status(400).json({msg: 'Post already liked'});
        }
        post.likes.unshift({user:req.user.id})
        await post.save();
        res.json(post.likes);

    } catch (error) {
        console.error(error.message);

        if(error.kind == 'ObjectId'){
            res.status(404).json({msg: 'Post not found'});
        }
        res.status(500).send('Server error');
    }
});

router.put('/unlike/:id', auth, async (req, res) => {
    try {
        
        const post = await Post.findById(req.params.id);
        //Check if post has already been liked by user

        const likeArr = post.likes.filter(like => like.user.toString() === req.user.id);
        
        if(likeArr.length === 0){
           return res.status(400).json({msg: 'Post not liked'});
        }
        //find unlike index
        const removeIndex = post.likes.map((like) => {
            return like.user.toString();
        }).indexOf(req.user.id);

        if(removeIndex > -1){
            post.likes.splice(removeIndex, 1);
        }

        post.save();
        res.json(post.likes);

    } catch (error) {
        console.error(error.message);

        if(error.kind == 'ObjectId'){
            res.status(404).json({msg: 'Post not found'});
        }
        res.status(500).send('Server error');
    }
});

//@route  POST api/posts/comment/:id
//@desc   Comment on a post
//@access private

router.post('/comment/:id',[auth, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user:req.user.id
        };

        post.comments.unshift(newComment);
        await post.save();

        res.json(post.comments);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
  
});

//@route  DELETE api/posts/comment/:id
//@desc   Delete own comment on a post
//@access private

router.delete('/comment/:post_id/:comment_id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        if(!post){
            return res.status(400).json({msg: 'Post not found'});
        }

        const myCommentsArr = post.comments.filter(comment => comment.user.toString() === req.user.id);

        if(myCommentsArr.length === 0){
            return res.status(400).json({msg: 'You have no comments'});
        }

        const commentIndex = myCommentsArr.map((comment) => {
            return comment.id
        }).indexOf(req.params.comment_id);

        if(commentIndex === -1){
            return res.status(400).json({msg: 'Comment not found'});
        }

        await post.comments.splice(commentIndex, 1);

        await post.save();

        res.json(post);
        
    } catch (error) {
        console.error(error.message);
        if(error.kind === 'ObjectId'){
            return res.status(400).json({msg: 'Post or Comment not found'});
        }
        res.status(500).send('Server error');
    }
});

module.exports = router;