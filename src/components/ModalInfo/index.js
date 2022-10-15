import ReactDOM from 'react-dom';

import './styles.css'

const ModalInfo = ({ photo , close }) => {
  return ReactDOM.createPortal(
    <div className="overlay">
      <div className="modal-content">
        <div className='modal-header'>
          <span id="info">{photo.objectName}</span>
          <img src={`assets/icon-close.svg`}
                id='close-modal'
                alt={`Close art information.`}
                onClick={ close }/>
        </div>
        <img src={photo.primaryImage} className='modal-image'
            alt={`Full description of selected art`}/>
        <div className="detailed-info">
          <p className="name-info">{photo.artistDisplayName}</p>
          <p className="date-info">{photo.objectDate}</p>
          <p>{photo.repository}</p>
          <p>{photo.medium}</p>
        </div>
      </div>
    </div>,
    document.getElementById('modal-info')
  );
}

export default ModalInfo;