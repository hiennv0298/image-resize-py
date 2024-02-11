import { useState } from 'react';
import axios from 'axios';

const ImageUploadForm = () => {
    const [height, setHeight] = useState('1024');
    const [width, setWidth] = useState('1024');
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('height', height);
        formData.append('width', width);
        formData.append('image', file);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                responseType: 'blob'
            });

            const objectURL = URL.createObjectURL(response.data);
            setImage(objectURL);
        } catch (error) {
            console.error('error uploading file', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="container my-4">
                <div className="mb-3">
                    <label htmlFor="height" className="form-label">Height:</label>
                    <input type="number" className="form-control" id="height" value={height} onChange={(e) => setHeight(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="width" className="form-label">Width:</label>
                    <input type="number" className="form-control" id="width" value={width} onChange={(e) => setWidth(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image:</label>
                    <input type="file" className="form-control" id="image" onChange={(e) => setFile(e.target.files[0])} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            {image && <img src={image} />}
        </>
    );
}

export default ImageUploadForm;