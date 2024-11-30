import React, { useState, useRef } from "react";
//import InteractionsButtons from "../components/interactions_menu";
import DeleteTaskButton from "../components/delete_task_button";
// import EditModal from "../components/modals/edit_modal";

let lastActiveTask: HTMLDivElement | null = null;

interface TaskItemProps {
  id: string;
  title: string;
  desc: string;
  index: number;
  onDelete: () => void;
  onSave: (updatedTask: { id: string; title: string; desc: string }) => void;
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  title,
  desc,
  index,
  onDelete,
  onSave,
  onDragStart,
}) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskDesc, setTaskDesc] = useState(desc);

  const taskItemRef = useRef<HTMLDivElement>(null);

  const handleTaskClick = () => {
    if (lastActiveTask && lastActiveTask !== taskItemRef.current) {
      lastActiveTask.classList.remove("active");
    }

    setMenuVisible((prevVisible) => {
      const newVisibility = !prevVisible;
      if (newVisibility) {
        lastActiveTask = taskItemRef.current;
      } else {
        lastActiveTask = null;
      }
      return newVisibility;
    });
  };

  const handleEdit = () => {
    setEditModalOpen(true);
  };

  const handleSave = (updatedTask: { title: string; desc: string }) => {
    setTaskTitle(updatedTask.title);
    setTaskDesc(updatedTask.desc);
    onSave({ id, title: updatedTask.title, desc: updatedTask.desc });
    setEditModalOpen(false);
  };

  return (
    <div
      className={`task-item ${isMenuVisible ? "active" : ""}`}
      ref={taskItemRef}
      draggable
      onDragStart={onDragStart}
      onClick={handleTaskClick}
    >
      <div className="task-content">
        <h3 className="task-title">{taskTitle}</h3>
        <p className="task-desc">{taskDesc}</p>
      </div>
      <div className="delete-task-button">
        <DeleteTaskButton
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        />
      </div>
      {isMenuVisible && (
        <div className="interactions-container">
          <InteractionsButtons
            title={taskTitle}
            desc={taskDesc}
            onEdit={handleEdit}
          />
        </div>
      )}
      {isEditModalOpen && (
        <EditModal
          task={{ id, title: taskTitle, desc: taskDesc }}
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default TaskItem;
