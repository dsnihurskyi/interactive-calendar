import React, { ReactNode, createContext, useState, useContext, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskLabel, CalendarContextData } from '../global/types';

const CalendarContext = createContext<CalendarContextData>({} as CalendarContextData);

export const CalendarProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [taskLabels, setTaskLabels] = useState<TaskLabel[]>([]);

  const handleUpdateTasks = (newTasksList: Task[]) => {
    setTasks(newTasksList);
    setFilteredTasks(newTasksList);
  };

  const handleTaskCreation = useCallback((title: string, date: Date, labelIds: string[]) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      date,
      labelIds,
    };

    handleUpdateTasks([...tasks, newTask]);
  }, [tasks]);

  const handleTaskUpdate = useCallback((taskId: string, updateTaskPayload: Task) => {
    const updatedTasksList = tasks.map(currentTask => (
      currentTask.id === taskId
        ? updateTaskPayload
        : currentTask
    ));

    handleUpdateTasks(updatedTasksList);
  }, [tasks]);

  const updateTaskLabelsList = (updatedLabelsList: TaskLabel[]) => {
    setTaskLabels(updatedLabelsList);
  };

  const handleFilterTasks = useCallback((searchValue: string, searchLabels: TaskLabel[]) => {
    if (!searchValue && !searchLabels.length) {
      setFilteredTasks(tasks);
    } else {
      const updatedTasksList = tasks.filter(currentTask => {
        const fitsSearchValue = !searchValue
          || currentTask.title.toLowerCase().includes(searchValue.toLowerCase());
  
        const fitsSearchLabels = !searchLabels.length
          || currentTask.labelIds.some(labelId => searchLabels.some(label => label.id === labelId));
  
        return fitsSearchValue && fitsSearchLabels;
      });
  
      setFilteredTasks(updatedTasksList);
    }
  }, [tasks]);

  return (
    <CalendarContext.Provider value={{
      tasks,
      filteredTasks,
      taskLabels,
      handleTaskCreation,
      handleTaskUpdate,
      updateTaskLabelsList,
      handleUpdateTasks,
      handleFilterTasks,
    }}>
      {children}
    </CalendarContext.Provider>
  )
}

export function useCalendarContext(): CalendarContextData {
  const context = useContext(CalendarContext);
  return context;
}
