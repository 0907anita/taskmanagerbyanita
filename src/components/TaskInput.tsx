import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import './TaskInput.css';

const TaskInput = () => {
  const [title, setTitle] = useState('');
  const { addTask } = useTasks();

  const handleAdd = () => {
    addTask(title);
    setTitle('');
  };

  return (
    <div className="task-input-container">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Add a task..."
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default TaskInput;
