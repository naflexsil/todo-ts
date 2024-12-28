import React, { useState, useEffect } from "react";
import "../../styles/edit_modal.scss";

interface EditModalProps {
  task: { id: string; title: string; desc: string };
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: { id: string; title: string; desc: string }) => void;
}

const EditModal: React.FC<EditModalProps> = ({
  task,
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDesc(task.desc);
    }
  }, [task]);

  const handleSave = () => {
    if (title.trim() && desc.trim()) {
      onSave({ ...task, title, desc });
      onClose();
    } else {
      alert("Both fields must be filled.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Task</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
        />
        <div className="modal-buttons">
          <button onClick={handleSave} className="btn-confirm">
            Save
          </button>
          <button onClick={onClose} className="btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
