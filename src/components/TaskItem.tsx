import type { Task } from '../types/Task';
import { memo } from 'react';
import './TaskItem.css';

interface TaskItemProps {
  task: Task;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TaskItem = ({ task, toggleTask, deleteTask }: TaskItemProps) => {
  return (
    <li className="task-item">
    <input
      type="checkbox"
      checked={task.completed}
      onChange={() => toggleTask(task.id)}
    />
    <span className={task.completed ? 'completed' : ''}>{task.title}</span>
    <button onClick={() => deleteTask(task.id)}>Delete</button>
  </li>
  );
};

export default memo(TaskItem);
