import mongoose from 'mongoose';

(async () => {
    mongoose.connect('mongodb://localhost/galleryapp', { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to Database");
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    });
})();