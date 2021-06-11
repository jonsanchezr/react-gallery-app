import { Router } from 'express';
import Image from '../models/Image';
import path from 'path';

const router = Router();

router.post('/api/images/upload', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const { file } = req.files;
    const uploadPath = 'public/uploads/images/' + file.name;

    file.mv(uploadPath, function(err) {
        if (err) {
            return res.status(500).send(err);
        }
    });

    const image = new Image({
        url: uploadPath,
        key: file.name,
        title: req.body.title
    });

    await image.save();

    return res.json(image);
});

router.get('/api/images', async (req, res) => {
    const images = await Image.find();
    return res.json(images);
});

router.get('/api/images/:id', async (req, res) => {
    const image = await Image.findById(req.params.id);
    return res.json(image);
});

router.delete('/api/images/:id', async (req, res) => {
    const deletedImage = await Image.findByIdAndDelete(req.params.id);
    res.json({
        msg: "Imagen Deleted",
        image: deletedImage
    });
});

router.get("/uploads/images/:img", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/uploads/images/"+req.params.img));
});

export default router;