const express = require('express');

const { Post, User} = require('../models');

const router = express.Router();

const { isValidAPI } = require('./middlewares');

router.get('/:postID', async (req, res, next) => {

    console.log(`postID : ${req.params.postID}`);

    try {
        const users = await User.findAll({
            attributes: ['id', 'email', 'nick'],
            include: [{
                model : Post,
                through: 'Apply',
                where : {
                    id : req.params.postID,
                },
                attributes: ['id'],
            }],
            order: [
                //['createdAt', 'DESC'],
                [{model: Post, through: 'Apply'}, 'createdAt', 'DESC']
              ],
        });

        console.log(users[0]);
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        next(error);
    }

});

module.exports = router;