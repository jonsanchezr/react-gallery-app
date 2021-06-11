import React, { useState } from 'react';
import axios from 'axios';

const ImageForm = () => {
    const [ file, setFile ] = useState();
    const [ title, setTitle ] = useState('');
    const [ uploadPercentage, setUploadPercentage ] = useState(0);

    const handleChange = e => {
        setFile(e.target.files[0]);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);

        return axios.post('/api/images/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress(progressEvent) {
                const { loaded, total } = progressEvent;
                const percent = parseInt((loaded * 100) / total);
                setUploadPercentage(percent);
            }
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    };

    return (
        <div className="col-md-4 offset-md-4">
            <div className="progress rounded-0">
                <div
                    className="progress-bar bg-success "
                    role="progressbar"
                    style={{width: uploadPercentage+'%'}}
                ></div>
            </div>
            <div className="card bg-dark text-light rounded-0 p-4">
                <div className="card-body">
                    <h3>Upload Image</h3>
                    <input
                        type="text"
                        className="form-control bg-dark text-light my-3 rounded-0"
                        placeholder="Write a title for your image"
                        onChange={e => setTitle(e.target.value)}
                    />
                    <input
                        type="file"
                        className="form-control bg-dark text-light rounded-0"
                        onChange={handleChange}
                    />
                    <div className="my-3">
                        <button className="btn btn-success rounded-0 w-100" onClick={(event) => {
                            handleSubmit(event);
                        }}>
                            Upload
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ImageForm;