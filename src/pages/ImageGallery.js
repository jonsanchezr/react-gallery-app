import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const ImageGallery = () => {
    const [ images, setImages ] = useState([]);
    const history = useHistory();

    useEffect(() => {
        (async () => {
            const res = await axios.get('/api/images');
            setImages(res.data);
        })();
    }, []);

    return (
        <div className="row">
            {images.map(image => (
                <div
                    className="col-md-4 p-1 card-image"
                    onClick={() => history.push('/images/'+image._id)}
                    key={image._id}
                >
                    <img
                        src={'/uploads/images/'+image.key}
                        className="img-fluid h-100 w-100"
                        alt={'image '+image.key}
                    />
                </div>
            ))}
        </div>
    )
};

export default ImageGallery;