import React from 'react';
import LinesPopup from '../Popup/LineCreate';
import './Pages.css';

const Lines = () => {
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  return (
    <div className="page-container">
      {isPopupOpen && (
        <LinesPopup
          onClose={() => setIsPopupOpen(false)}
          onCreated={() => setIsPopupOpen(false)}
        />
      )}

      <div className="page-header">
        <h1>Lines</h1>
        <button className='create-line-btn' onClick={() => setIsPopupOpen(true)}>
          Create Lines
        </button>
      </div>

      <div className="stories-grid">
      </div>
    </div>
  );
};

export default Lines;