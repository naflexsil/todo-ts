import React, { useState } from "react";

interface TaskInputProps {
  addTask: (title: string, desc: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleAddTask = () => {
    if (title.trim() && desc.trim()) {
      addTask(title, desc);
      setTitle("");
      setDesc("");
    }
  };

  return (
    <div className="input-wrapper">
      <input
        type="text"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description..."
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button onClick={handleAddTask}>+</button>
    </div>
  );
};

export default TaskInput;
