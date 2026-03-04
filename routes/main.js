import express from 'express'
import WordModel from '../models/word.js'

const router = express.Router();

router.get('/', async (req, res) => {
    const words = await WordModel.find().lean();
    res.render('anasayfa', { words })

});
router.get('/ekle', async (req, res) => {

    res.render('ekle')
});
router.get('/edit/:id', async (req, res) => {
    const word = await WordModel.findById(req.params.id).lean();
    res.render('edit', { word })
});

router.get('/search', async (req, res) => {

    const arananKelime = req.query.q;


    if (!arananKelime) {
        return res.redirect('/');
    }

    const word = await WordModel.find({
        $or: [
            { text: { $regex: arananKelime, $options: 'i' } },
            { author: { $regex: arananKelime, $options: 'i' } }
        ]
    }).lean();
    res.render('anasayfa', { words: word });
});
router.post('/ekle', async (req, res) => {
    console.log(req.body);

    try {
        await WordModel.create(req.body)

        res.redirect('/')
    }
    catch (e) {
        console.log(e);

    }
});
router.post('/sil/:id', async (req, res) => {
    try {
        await WordModel.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (e) {
        console.log(e);
        res.redirect('/');
    }
});

router.post('/edit/:id', async (req, res) => {
    try {
        await WordModel.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/');
    } catch (e) {
        console.log(e);
        res.redirect('/');
    }
});
export default router;