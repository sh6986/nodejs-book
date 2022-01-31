const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {Post, Hashtag} = require('../models');
const {isLoggedIn} = require('./middlewares');

const router = express.Router();

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({ // body-parser로는 multipart/form-data를 해석 불가하므로 multer 패키지 필요
    storage: multer.diskStorage({
        destination(req, file, cb) {    // 저장경로
            cb(null, 'uploads/');   // 첫번째 파라미터는 에러
        },
        filename(req, file, cb) {   // 저장할 파일명(파일명 + 날짜 + 확장자 형식)
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: {fileSize: 5 * 1024 * 1024},
});

router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
    console.log(req.file);
    res.json({url: `/img/${req.file.filename}`});   // 파일주소
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
    try {
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            UserId: req.user.id,
        });

        const hashtags = req.body.content.match(/#[^\s#]*/g);

        if (hashtags) {
            const result = await Promise.all(
                hashtags.map(tag => {
                    return Hashtag.findOrCreate({   // db에 해당 해시태그가 존재하지 않으면 생성
                        where: {title: tag.slice(1).toLowerCase()},
                    })
                }),
            );
            console.log(result);
            await post.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;