/*
 * Title: Youtube Video Downloader
 * Description: A simple Node JS library to download videos from YouTube
 * Author: Saud M.
 * GitHub: https://github.com/saud06
 * LinkedIn: https://www.linkedin.com/in/saud06
 */

const express = require('express');

const router = express.Router();

const ytdl = require('ytdl-core');
const config = require('../config');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: config.title, config });
});

router.post('/', (req, res) => {
  ytdl.getInfo(req.body.url, (err, info) => {
    res.send(info);
  });
});

module.exports = router;
