import create from 'zustand';
const useLocalStorage = create((set) => {
  const storedTasks = localStorage.getItem('tasks');
  const initialTasks = storedTasks?JSON.parse(storedTasks): [];

  return {
    tasks: initialTasks,
    addTask: (title: string) => {
      set((state: { tasks: any; }) => {
        const updatedTasks = [...state.tasks, { title }];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return { tasks: updatedTasks };
      });
    },
    updateTask: (id: number, title: string, completed: boolean) => {
      set((state: { tasks: any; }) => {
        const updatedTasks = [...state.tasks];
        updatedTasks[id] = { ...updatedTasks[id], title , completed};
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return { tasks: updatedTasks };
      });
    },
    deleteTask: (id: number) => {
      set((state: { tasks: any[]; }) => {
        const updatedTasks = state.tasks.filter((_, i) => i !== id);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return { tasks: updatedTasks };
      });
    },
    searchTasks: (searchTerm: string) => {
      return [...state.tasks].filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
  }
})

export {
  useLocalStorage
};