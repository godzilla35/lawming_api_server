const express = require('express');

const { Post, User} = require('../models');

const router = express.Router();

const { isValidAPI } = require('./middlewares');

router.get('/:postId', async (req, res, next) => {

    console.log(`postId : ${req.params.postId}`);

    try {
        const post = await Post.findOne({where : {id: req.params.postId}});
        
        
        if(!post) {
            console.log('no post!');
            return res.status(403).json({message: 'no post'});
        }

        const applier = await post.getApplier({attributes : ['id', 'email', 'nick']});

        if(applier.length == 0) {
            console.log(`===### not applied post!`);
            return res.json({ message : 'not applied post!' });
        } else {
            for(var i = 0; i<applier.length; i++) {
                console.log(`id: ${applier[i].id} email: ${applier[i].email}`);
            }
        }

        return res.json({id: applier[0].id, email: applier[0].email, nick: applier[0].nick});

    } catch (error) {
        console.error(error);
        next(error);
    }

});

module.exports = router;