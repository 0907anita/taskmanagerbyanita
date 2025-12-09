import { createContext, useContext, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type { Task } from '../types/Task';

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  markAllCompleted: ()=> void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within TaskProvider');
  return context;
};

interface TaskProviderProps {
  children: React.ReactNode;
}

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);

  const addTask = useCallback((title: string) => {
    if (title.trim() === '') return;
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };
    setTasks(prev => [...prev, newTask]);
  }, [setTasks]);

  const toggleTask = useCallback((id: number) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, [setTasks]);

  const markAllCompleted = useCallback(()=>{
setTasks(prev=>
      prev.map(task=> ({...task, completed: true}))
      )
  },[setTasks])

  const deleteTask = useCallback((id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, [setTasks]);

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask,markAllCompleted }}>
      {children}
    </TaskContext.Provider>
  );
};
