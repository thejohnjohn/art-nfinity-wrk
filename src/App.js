import { Fragment, useEffect, useState } from 'react';

import { ObjectIDs } from './utils/data.js';
import ModalInfo from './components/ModalInfo';

import './App.css';

const App = () => {
  const [timer, setTimer] = useState(0);
  const [index, setIndex] = useState(0);
  const [photo, setPhoto] = useState("");
  
  let pause = false;

  useEffect(() => {
    let countdown = setTimeout(() => {
      pause === false && setTimer(timer - 1);
      
      if (timer < 1) {
        let objectId = ObjectIDs[index];
        
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`)
        .then(response => { return response.json() })
        .then(data => setPhoto(data));
        console.log(countdown);
        setIndex(prev => prev + 1);
        setTimer(10);
      }
    }, 1250);

    return () => {
      clearTimeout(countdown);
    };
  },[timer]);

  //Modal
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  return(
    <Fragment>
      <header>
        <div className="logo-container">
          <p className="logo">art</p>
          <img id="nfinity" src="assets/nfinity.svg" />
          <p className="logo">wrk</p>
        </div>
        <div className="timer">
          <img id="timer-img" src="assets/timer.svg"/>
          <span id="timer-counter">{timer}</span>
        </div>
      </header>
      <div className="image-container" onClick={() => {setShow(true); pause = !pause;}}>
        <img id="image" src={photo.primaryImage} />
      </div>
      <div className="basic-info">
        <h1>{photo.objectName}</h1>
        <p className="date">{photo.objectDate}</p>
        <span className="name">{photo.artistDisplayName}</span>{' '}<span className="nationality">{photo.artistNationality}</span>
      </div>
      { show && <ModalInfo photo={photo} close={closeModal} /> }
    </Fragment>
  );
};

export default App;