import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../src/components/redux/store";
import {
  addTask,
  updateTask,
  deleteTask,
  moveTask,
} from "../src/components/redux/tasks_slice";
import TaskInput from "../src/components/task_input";
import DeleteModal from "../src/components/modals/delete_task_modal";
import DraggableTaskList from "../src/components/draggable_task_list";

const App: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  const handleAddTask = (title: string, desc: string) => {
    const newTask = { id: Date.now().toString(), title, desc };
    dispatch(addTask(newTask));
  };

  const handleUpdateTask = (updatedTask: {
    id: string;
    title: string;
    desc: string;
  }) => {
    dispatch(updateTask(updatedTask));
  };

  const handleOpenDeleteModal = (taskId: string) => {
    setTaskToDelete(taskId);
    setModalOpen(true);
  };

  const handleConfirmDeleteTask = () => {
    if (taskToDelete) {
      dispatch(deleteTask(taskToDelete));
    }
    setModalOpen(false);
    setTaskToDelete(null);
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.dataTransfer.setData("taskIndex", index.toString());
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    const fromIndex = parseInt(event.dataTransfer.getData("taskIndex"), 10);
    const toIndex = parseInt(event.currentTarget.dataset.index || "-1", 10);
    if (fromIndex !== toIndex && toIndex >= 0) {
      dispatch(moveTask({ fromIndex, toIndex }));
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="app">
      <TaskInput addTask={handleAddTask} />
      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        <DraggableTaskList
          tasks={tasks}
          onDelete={handleOpenDeleteModal}
          onSave={handleUpdateTask}
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        />
      )}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDeleteTask}
      />
    </div>
  );
};

export default App;
