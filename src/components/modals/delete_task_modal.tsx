import React from "react";
import "../../styles/delete_task_modal.scss";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p>Are you sure you want to delete this task?</p>
        <div className="modal-buttons">
          <button onClick={onConfirm} className="btn-confirm">
            Yes
          </button>
          <button onClick={onClose} className="btn-cancel">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
