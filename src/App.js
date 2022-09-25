import PhotoAlbum from "react-photo-album";
import photos from "./utils/photos";
import { Fragment, useEffect, useState } from 'react';
import ModalInfo from './components/ModalInfo';

const App = () => {
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?dateBegin=1700&dateEnd=1800&hasImages=true&q=African';

    const [quantity, setQuantity] = useState(25);
    const [photoGallery, setPhotoGallery] = useState([]);
    const [galleryPage, setGalleryPage] = useState(0);

    const doAjax = async () => {
        const response = await fetch(url);
        if (response.ok) {
            const jsonValue = await response.json();
            return Promise.resolve(jsonValue);
        } else {
            return Promise.reject('*** file not found');
        }
    }

    useEffect(() => {
        const test = setTimeout(() => {
            setGalleryPage(prev => prev + 1);
            console.log(galleryPage);
        }, 3000);
        console.log('test');
        return () => clearTimeout(test);
    },[galleryPage]);

    //Modal
    const [show, setShow] = useState(false);
    const openModal = () => setShow(true);
    const closeModal = () => setShow(false);

    return(
        <Fragment>
            <PhotoAlbum photos={photos} 
                        onClick={(key) => {
                            openModal();
                        }} 
                        layout="masonry" />
            { show && <ModalInfo show={show} close={closeModal} /> }
        </Fragment>
    );
};

export default App;