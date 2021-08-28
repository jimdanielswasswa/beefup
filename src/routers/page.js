const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const auth = require('../middlewares/auth');
const Page = require('../db/models/Page');
const PageImage = require('../db/models/PageImage');

const router = new express.Router();
const imageUpload = multer({
    limits: {
        files: 4,
        fileSize: 6000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('File must be either a png, a jpg or a jpeg'), false);
        }
        cb(undefined, true);
    }
});

router.get('/page-content/', auth, async (req, res) => {
    const pageImages = await PageImage.find({  }, { image: 1 });
    return res.render('page-content', { layout: 'admin-master', pageImages });
});
router.get('/page-content/:id', auth, async (req, res) => {
    const id = (req.params.id) ? req.params.id : 0;
    const pageContent = await Page.findById(id);
    if (!pageContent) {
        // TODO Handle 404
    }
    return res.render('page-contents', { layout: 'admin-master' });
});
router.post('/page-content/', auth, imageUpload.array('pageimages', 4), async (req, res) => {
    const pagename = "Gallery";
    const files = req.files;
    uploaded = [];
    if (!pagename) {
        return res.status(401).json('Page Name Is Required.');
    }
    let pageContent = new Page({ pagename, createdby: req.user._id });
    pageContent = await pageContent.save();
    files.forEach(async (element) => {
        const pageImages = new PageImage({ image: await sharp(element.buffer).resize({ cover: 'Crop' }).jpeg().toBuffer(), page: pageContent._id });
        await pageImages.save();
    });
    if (pageContent) {
        return res.redirect(`/page-content/`);
    }
    // TODO: Handle Save Fail.
});
//Handle PATCH and PUT
router.post('/page-content/:id', auth, async (req, res) => {
    const { pagename } = "Gallery";
    const page_id = (req.params.id) ? req.params.id : 0;
    if (!pagename) {
        return res.status(401).json('Page Name Is Required.');
    }
    let pageContent = await Page.findById(page_id);
    if (pageContent) {
        pageContent.pagename = pagename;
    } else {
        return res.status(404).json('Not Found');
    }
    pageContent = await pageContent.save();
    if (pageContent) {
        return res.redirect(`/page-content/`);
    }
});
router.delete('/page-content/:id', auth, async (req, res) => {
    const id = (!(req.params.id == undefined)) ? req.params.id : 0;
    console.log(req.params.id);
    let pageContent = await PageImage.findByIdAndDelete(id);
    if (pageContent) {
        return res.status(200).json({ error: undefined, message: 'Page Content Successfully Deleted.', data: pageContent });
    }
});
router.get('/page-content/:id/image', async (req, res) => {
    const id = (req.params.id) ? req.params.id : 0;
    const pageContent = await PageImage.findById(id);
    if(pageContent){
        return res.send(pageContent.image);
    }
});

module.exports = router;