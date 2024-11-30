import React from "react";
import "../styles/delete_task_button.scss";

interface DeleteTaskButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const DeleteTaskButton: React.FC<DeleteTaskButtonProps> = ({ onClick }) => {
  return (
    <button className="delete-task-button" onClick={onClick}>
      ×
    </button>
  );
};

export default DeleteTaskButton;
