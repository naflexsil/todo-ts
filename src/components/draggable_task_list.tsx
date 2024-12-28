import React from "react";
import TaskItem from "../components/task_item";

interface Task {
  id: string;
  title: string;
  desc: string;
}

interface DraggableTaskListProps {
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onSave: (updatedTask: { id: string; title: string; desc: string }) => void;
  onDragStart: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
}

const DraggableTaskList: React.FC<DraggableTaskListProps> = ({
  tasks,
  onDelete,
  onSave,
  onDragStart,
  onDrop,
  onDragOver,
}) => {
  return (
    <div className="task-list" onDragOver={onDragOver}>
      {tasks.map((task, index) => (
        <div
          key={task.id}
          data-index={index}
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <TaskItem
            id={task.id}
            title={task.title}
            desc={task.desc}
            index={index}
            onDelete={() => onDelete(task.id)}
            onSave={onSave}
            onDragStart={(e) => onDragStart(e, index)}
          />
        </div>
      ))}
    </div>
  );
};

export default DraggableTaskList;
