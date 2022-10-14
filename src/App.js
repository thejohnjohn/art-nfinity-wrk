import { Fragment, useEffect, useState } from 'react';

import { ObjectIDs } from './utils/data.js';
import ModalInfo from './components/ModalInfo';

import './App.css';

const App = () => {
  const [timer, setTimer] = useState(0);
  const [index, setIndex] = useState(0);
  
  let pause = false;

  useEffect(() => {
    let countdown = setTimeout(() => {
      if(pause === false) {
        setTimer(timer - 1);
      }
      if (timer < 1) {
        let objectId = ObjectIDs[index];
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`)
        .then((response) => {
          return response.json();
        })
        .then(data => console.log(data));
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
        
        <span>{timer}</span>
      </header>
      <div className='image'>

      </div>
      { show && <ModalInfo show={show} close={closeModal} /> }
    </Fragment>
  );
};

export default App;