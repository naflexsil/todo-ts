import React from "react";
import "../../styles/info_modal.scss";

interface InfoModalProps {
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Info</h3>
        <div className="image-container">
          <img
            src="src/images/boom-cat.gif"
            alt="Boom Cat"
            className="modal-image"
          />
        </div>
        <div className="modal-buttons">
          <button onClick={onClose} className="btn-close">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
