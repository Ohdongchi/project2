const express = require('express');
const fs = require('fs');
const router = express.Router();

const { User } = require('../models');

router.get('/', async(req, res, next) => {
    try {
        res.render('layout', {
            title: 'Project2',
            user: req.user,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
})

module.exports = router;