const express = require('express');

const { Post, User} = require('../models');

const router = express.Router();

const { isValidAPI } = require('./middlewares');

router.post('/', isValidAPI, async (req, res, next) => {
    try{
        
        console.log(req.user.id);

        const post = await Post.create({
            court: req.body.court,
            time : req.body.time,
            progressType : req.body.progressType,
            myPartyType : req.body.myPartyType,
            myName : req.body.myName,
            otherPartyType : req.body.otherPartyType,
            opponentName : req.body.opponentName,
            caseNum : req.body.caseNum,
            caseDetail : req.body.caseDetail,
            caseArgument : req.body.caseArgument,
            cost : req.body.cost,
            UserId: req.user.id,
        });

        res.status(200).json({ message : 'post success' });
    }catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;``