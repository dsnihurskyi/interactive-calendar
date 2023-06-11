import React, { FC, ChangeEvent, useState } from 'react';
import { TaskLabel } from '../../global/types';
import {
  TaskLabelsWrapper,
  TaskLabelCheckbox,
  TaskLabelContainer,
  TaskLabelItem,
  TaskLabelText,
} from './styled';
import { SecondaryButton } from '../../global/styled';
import { useCalendarContext } from '../../contexts/calendarContext';
import { TaskLabelsWidgetProps } from './types';
import TaskLabelForm from './TaskLabelForm';

const TaskLabelsWidget: FC<TaskLabelsWidgetProps> = ({
  selectedTaskLabels,
  setSelectedTaskLabels,
}) => {
  const { taskLabels, updateTaskLabelsList } = useCalendarContext();
  const [taskLabelToEdit, setTaskLabelToEdit] = useState<TaskLabel | null>(null);
  const [isCreatingTaskLabel, setCreatingTaskLabel] = useState<boolean>(false);

  const handleSelectTaskLabels = (
    { target }: ChangeEvent<HTMLInputElement>,
    taskLabel: TaskLabel
  ) => {
    const preparedTaskLabels = target.checked
      ? [...selectedTaskLabels, taskLabel]
      : selectedTaskLabels.filter(selectedLabel => selectedLabel.id !== taskLabel.id);

    setSelectedTaskLabels(preparedTaskLabels);
  };

  const handleDeleteTaskLabel = (taskLabelToRemove: TaskLabel) => {
    const filteredTaskLabelsList = taskLabels.filter(taskLabel => (
      taskLabel.id !== taskLabelToRemove.id
    ));

    updateTaskLabelsList(filteredTaskLabelsList);
  };

  const handleUpdateTaskLabel = (updateTaskLabelPayload: TaskLabel) => {
    const updatedTaskLabelsList = taskLabels.map(taskLabel => (
      taskLabel.id === updateTaskLabelPayload.id
        ? updateTaskLabelPayload
        : taskLabel
    ));

    updateTaskLabelsList(updatedTaskLabelsList);
  };

  const handleCreateTaskLabel = (createTaskLabelPayload: TaskLabel) => {
    updateTaskLabelsList([...taskLabels, createTaskLabelPayload]);
  };

  return (
    <TaskLabelsWrapper>
      {taskLabels.map(taskLabel => (
        <TaskLabelItem key={taskLabel.id}>
          {taskLabelToEdit?.text === taskLabel.text ? (
            <TaskLabelForm
              taskLabelToEdit={taskLabelToEdit}
              handleUpdateTaskLabel={handleUpdateTaskLabel}
              onClose={() => setTaskLabelToEdit(null)}
            />
          ) : (
            <React.Fragment>
              <TaskLabelContainer>
                <TaskLabelCheckbox
                  checked={selectedTaskLabels.some(newTaskLabel => (
                    newTaskLabel.id === taskLabel.id
                  ))}
                  onChange={(event) => handleSelectTaskLabels(event, taskLabel)}
                />
                <TaskLabelText color={taskLabel.color}>
                  {taskLabel.text}
                </TaskLabelText>
              </TaskLabelContainer>
              <SecondaryButton onClick={() => setTaskLabelToEdit(taskLabel)}>
                Edit
              </SecondaryButton>
              <SecondaryButton onClick={() => handleDeleteTaskLabel(taskLabel)}>
                Delete
              </SecondaryButton>
            </React.Fragment>
          )}
        </TaskLabelItem>
      ))}

      {isCreatingTaskLabel ? (
        <TaskLabelForm
          handleCreateTaskLabel={handleCreateTaskLabel}
          onClose={() => setCreatingTaskLabel(false)}
        />
      ) : (
        <SecondaryButton onClick={() => setCreatingTaskLabel(true)}>
          Add new label +
        </SecondaryButton>
      )}
    </TaskLabelsWrapper>
  )
}

export default TaskLabelsWidget;
