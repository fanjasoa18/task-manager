
import { create } from "zustand";

interface Task {
  id: number;
  title: string;
  completed: boolean
}

type TaskState = {
  tasks: Task[];
  searchTask: string;
  addTask: (newTask: Task) => void;
  updateTask: (id: number, updatedTask: Task) => void;
  deleteTask: (id: number) => void;
  setSearchTask: (searchTerm: string) => void;
};

const useTaskManager = create<TaskState>((set, get) => ({
  tasks: [],
  searchTask: '',
  addTask: (newTask) => {
    set((state) => ({ tasks: [...state.tasks, newTask] }));
  },
  updateTask: (id, updatedTask) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      ),
    }));
  },
  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },
  setSearchTask: (searchTerm) => {
    set({ searchTask: searchTerm });
  },
}));


export {
  useTaskManager
};