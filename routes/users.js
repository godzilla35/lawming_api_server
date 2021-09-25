const express = require('express');

const { Post, User} = require('../models');

const router = express.Router();

const { isValidAPI } = require('./middlewares');

router.get('/:postID', async (req, res, next) => {

    console.log(`postID : ${req.params.postID}`);

    try {
        const users = await User.findAll({
            include: [{
                model : Post,
                as: 'Applied',
                through: 'Apply',
                where : {
                    id : req.params.postID,
                }
            }],
            
        });
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        next(error);
    }

});

module.exports = router;