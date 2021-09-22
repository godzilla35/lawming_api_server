const express = require('express');
const { Post, User } = require('../models');
const { isValidAPI } = require('./middlewares');
const { Op } = require('sequelize');

const router = express.Router();




router.get('/', isValidAPI, async (req, res, next) => {
    const where = {};

    if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
        where.id = { [Op.lt]: parseInt(req.query.lastId, 10) }
    }

    try {
        const posts = await Post.findAll({
            where,
            limit: 10, 
            order: [
                ['createdAt', 'DESC'],
            ],
        });
        console.log(posts);
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }

});

// Get posts/1

router.get('/:userId', isValidAPI, async (req, res, next) => {

    console.log(`userID : ${req.params.userId}`);

    try {
        const posts = await Post.findAll({
            where : {userId: req.params.userId}, 
            order: [
                ['createdAt', 'DESC'],
            ],
        });
        console.log(posts);
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        next(error);
    }

});

module.exports = router;