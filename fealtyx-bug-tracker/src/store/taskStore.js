import { create } from 'zustand';
import { v4 as uuid } from 'uuid';

export const useTaskStore = create((set) => ({
  tasks: [],
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, { ...task, id: uuid(), timeLogs: [], status: 'Open', createdAt: new Date() }]
    })),
  updateTask: (id, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map(t => t.id === id ? { ...t, ...updatedTask } : t)
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter(t => t.id !== id)
    })),
  logTime: (id, duration) =>
    set((state) => ({
      tasks: state.tasks.map(t => t.id === id
        ? { ...t, timeLogs: [...t.timeLogs, { duration, date: new Date() }] }
        : t)
    }))
}));
