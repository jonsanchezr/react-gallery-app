import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const ImageDetail = () => {
    const [ image, setImage ] = useState({
        title: '',
        url: '',
        key: '',
        _id: ''
    });

    const params = useParams();
    const history = useHistory();

    useEffect(() => {
        (async () => {
            const res = await axios.get('/api/images/'+params.id);
            setImage(res.data);
        })();
    }, [params.id]);

    const handleDelete = async () => {
        const res = await axios.delete('/api/images/'+params.id);
        console.log(res);
        history.push('/');
    };

    return (
        <div className="row">
            <div className="col-md-4 offset-md4">
                <div className="card bg-dark">
                    <img src={'/uploads/images/'+image.key} alt={image.title} className="card-img-top" />
                    <div className="card-body">
                        <h1>{image.title}</h1>
                        <button className="btn btn-outline-danger" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ImageDetail;