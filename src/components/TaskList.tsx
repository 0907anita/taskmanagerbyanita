import { useState, useMemo } from 'react';
import TaskItem from './TaskItem';
import { useTasks } from '../context/TaskContext';

const TaskList = () => {
  const { tasks, toggleTask, deleteTask, markAllCompleted } = useTasks();
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'allmarkedcompleted'>('all');

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      return true;
    });
  }, [tasks, filter]);

  return (
    <div>
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
        <button onClick={markAllCompleted}>All Mark Completed</button>
      </div>

      <ul>
        {filteredTasks.map(task => (
          <TaskItem key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
