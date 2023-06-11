import React, { FC, useRef, useMemo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { TaskItemProps } from './types';
import { TaskContainer, TaskLabelsContainer, TaskTitle } from './styled';
import { Task } from '../../global/types';
import { useCalendarContext } from '../../contexts/calendarContext';
import { TaskLabelSpan } from '../../global/styled';

const TaskItem: FC<TaskItemProps> = ({ task, index, moveTaskHandler, handleInitiateUpdateTaskProcess }) => {
  const { taskLabels } = useCalendarContext();
  const ref = useRef(null);

  const currentTaskLabels = useMemo(() => {
    return taskLabels.filter(taskLabel => (
      task.labelIds.some(labelId => taskLabel.id === labelId)
    ));
  }, [taskLabels, task])

  const [, drop] = useDrop(() => ({
    accept: 'TASK',
    hover: (item: { task: Task; index: number }, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveTaskHandler(dragIndex, hoverIndex);
      item.index = index;
    }
  }), [task, index, moveTaskHandler]);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { task, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [task, index]);

  drag(drop(ref));

  return (
    <TaskContainer ref={ref} isDragging={isDragging} onClick={() => handleInitiateUpdateTaskProcess(task)}>
      <TaskLabelsContainer>
        {currentTaskLabels.map(label => (
          <TaskLabelSpan key={label.id} $color={label.color} />
        ))}
      </TaskLabelsContainer>
      <TaskTitle>{task.title}</TaskTitle>
    </TaskContainer>
  )
}

export default TaskItem;
