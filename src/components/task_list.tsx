import React from "react";
import TaskItem from "../components/task_item";

interface Task {
  id: string;
  title: string;
  desc: string;
}

interface TaskListProps {
  tasks: Task[];
  onDelete: (taskId: string) => void;
  onSave: (updatedTask: { id: string; title: string; desc: string }) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDelete, onSave }) => {
  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          desc={task.desc}
          index={index}
          onDelete={() => onDelete(task.id)}
          onSave={onSave}
          onDragStart={(event) => console.log(`Dragging task ${task.id}`)}
        />
      ))}
    </div>
  );
};

export default TaskList;
