import React, { FC, FormEvent, useState, useMemo } from 'react';
import { format } from 'date-fns';
import { useDrop } from 'react-dnd';

import { CalendarDayProps } from './types';
import { HolidayData, Task, TaskLabel } from '../../global/types';
import TaskItem from '../TaskItem';
import TaskModal from '../TaskModal';
import TaskLabelsWidget from '../TaskLabelsWidget';
import { Input, PrimaryButton, SecondaryButton } from '../../global/styled';
import {
  DayContainer,
  DayNumber,
  DayTitleContainer,
  HolidayItem,
  TaskForm,
  TasksAmount,
  TasksContainer,
  UpdateLabelsContainer,
} from './styled';
import { useCalendarContext } from '../../contexts/calendarContext';

const CalendarDay: FC<CalendarDayProps> = ({ day, holidays }) => {
  const {
    handleTaskCreation,
    handleTaskUpdate,
    filteredTasks,
    taskLabels,
  } = useCalendarContext();

  const [currentHolidays, setCurrentHolidays] = useState<HolidayData[] | null>(null);
  const [orderedTasks, setOrderedTasks] = useState<Task[]>([]);
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState<Task | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedTaskLabels, setSelectedTaskLabels] = useState<TaskLabel[]>([]);

  useMemo(() => {
    const currentDayHolidays = holidays?.filter(holiday => (
      format(new Date(holiday.date), 'yyyy-MM-dd') === format(day.date, 'yyyy-MM-dd')
    ));

    setCurrentHolidays(currentDayHolidays?.length ? currentDayHolidays : null);
  }, [holidays, day.date])

  useMemo(() => {
    const currentDayTasks = filteredTasks.filter(task => (
      format(task.date, 'yyyy-MM-dd') === format(day.date, 'yyyy-MM-dd')
    ));

    if (!currentDayTasks.length && !orderedTasks.length) {
      return;
    }
    if (!currentDayTasks.length) {
      setOrderedTasks([]);
      return;
    }

    const newTasks = currentDayTasks.filter(task => (
      !orderedTasks.some(orderedTask => orderedTask.id === task.id)
    ));
    const updatedRemainingOrderedTasks = orderedTasks
      .map(orderedTask => (
        currentDayTasks.find(currentDayTask => currentDayTask.id === orderedTask.id)
          || orderedTask
      ))
      .filter(orderedTask => (
        currentDayTasks.some(currentDayTask => currentDayTask.id === orderedTask.id)
      ));
    const preparedTasks = newTasks.length
      ? updatedRemainingOrderedTasks.concat(newTasks)
      : updatedRemainingOrderedTasks;

    setOrderedTasks(preparedTasks);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredTasks, day.date])

  const [, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: ({ task }: { task: Task }) => {
      if (format(task.date, 'yyyy-MM-dd') !== format(day.date, 'yyyy-MM-dd')) {
        const updateTaskPayload = {
          ...task,
          date: day.date,
        };

        handleTaskUpdate(task.id, updateTaskPayload);
      }
    },
  }), [handleTaskUpdate]);

  const moveTaskHandler = (dragIndex: number, hoverIndex: number) => {
    const dragItem = orderedTasks[dragIndex];

    if (dragItem) {
      setOrderedTasks((prev: Task[]): Task[] => {
        const reorderedTasks = [...prev];

        const [draggedTask] = reorderedTasks.splice(dragIndex, 1);
        reorderedTasks.splice(hoverIndex, 0, draggedTask);

        return reorderedTasks;
      });
    }
  };

  const handleCloseTaskModal = () => {
    setNewTaskTitle('');
    setTaskModalOpen(false);
    setTaskToUpdate(null);
    setSelectedTaskLabels([]);
  };

  const handleInitiateUpdateTaskProcess = (task: Task) => {
    const currentTaskLabelsList = taskLabels.filter(taskLabel => (
      task.labelIds.includes(taskLabel.id)
    ));

    setSelectedTaskLabels(currentTaskLabelsList);
    setTaskToUpdate(task);
    setNewTaskTitle(task.title);
    setTaskModalOpen(true);
  };

  const handleSubmitTask = (event: FormEvent) => {
    event.preventDefault();

    const taskLabelIdsList = selectedTaskLabels.map(label => label.id);

    if (taskToUpdate) {
      const updateTaskPayload = {
        ...taskToUpdate,
        title: newTaskTitle,
        labelIds: taskLabelIdsList,
      };

      handleTaskUpdate(taskToUpdate.id, updateTaskPayload);
    } else {
      handleTaskCreation(newTaskTitle, day.date, taskLabelIdsList);
    }

    handleCloseTaskModal();
  };

  return (
    <DayContainer ref={drop} day={day}>
      <DayTitleContainer>
        <DayNumber>{day.dayOfMonth}</DayNumber>
        {Boolean(orderedTasks.length) && (
          <TasksAmount>
            {orderedTasks.length > 1
                ? `${orderedTasks.length} tasks`
                : `${orderedTasks.length} task`
            }
          </TasksAmount>
        )}
        <SecondaryButton onClick={() => setTaskModalOpen(true)}>
          Add +
        </SecondaryButton>
      </DayTitleContainer>

      <TasksContainer>
        {currentHolidays?.map(holiday => (
          <HolidayItem key={holiday.localName}>
            {holiday.localName}
          </HolidayItem>
        ))}
        {orderedTasks.map((task, index) => (
          <TaskItem
            key={task.id}
            task={task}
            index={index}
            moveTaskHandler={moveTaskHandler}
            handleInitiateUpdateTaskProcess={handleInitiateUpdateTaskProcess}
          />
        ))}
      </TasksContainer>

      <TaskModal
        isShown={isTaskModalOpen}
        hide={handleCloseTaskModal}
        headerText={taskToUpdate ? 'Update task' : 'Create task'}
        modalContent={(
          <React.Fragment>
            <UpdateLabelsContainer>
              <TaskLabelsWidget
                selectedTaskLabels={selectedTaskLabels}
                setSelectedTaskLabels={setSelectedTaskLabels}
              />
            </UpdateLabelsContainer>

            <TaskForm onSubmit={handleSubmitTask}>
              <Input
                type='text'
                placeholder='Task title'
                value={newTaskTitle}
                onChange={({ target }) => setNewTaskTitle(target.value)}
                required
              />

              <PrimaryButton type='submit'>
                Submit
              </PrimaryButton>
            </TaskForm>
          </React.Fragment>
        )}
      />
    </DayContainer>
  )
}

export default CalendarDay;
