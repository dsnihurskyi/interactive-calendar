import React, { FC, FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AddTaskLabelFormProps } from './types';
import {
  TaskLabelsFormButtonsContainer,
  TaskLabelsForm,
  ColorPicker,
  ColorPickerItem,
} from './styled';
import { Input, PrimaryButton, SecondaryButton } from '../../global/styled';
import { TASK_LABEL_COLORS } from '../../consts/taskLabels';

const TaskLabelForm: FC<AddTaskLabelFormProps> = ({
  taskLabelToEdit,
  handleUpdateTaskLabel,
  handleCreateTaskLabel,
  onClose,
}) => {
  const [newLabelText, setNewLabelText] = useState<string>(taskLabelToEdit?.text || '');
  const [newLabelColor, setNewLabelColor] = useState<string>(
    taskLabelToEdit?.color || TASK_LABEL_COLORS[0]
  );

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (taskLabelToEdit && handleUpdateTaskLabel) {
      const updateTaskLabelPayload = {
        ...taskLabelToEdit,
        text: newLabelText,
        color: newLabelColor,
      };

      handleUpdateTaskLabel(updateTaskLabelPayload);
    } else if (handleCreateTaskLabel){
      const createTaskLabelPayload = {
        id: uuidv4(),
        text: newLabelText,
        color: newLabelColor,
      };

      handleCreateTaskLabel(createTaskLabelPayload);
    }

    onClose();
  }

  return (
    <TaskLabelsForm onSubmit={onSubmit}>
      <Input
        type='text'
        placeholder='Label text'
        value={newLabelText}
        onChange={({ target }) => setNewLabelText(target.value)}
        required
      />

      <ColorPicker>
        {TASK_LABEL_COLORS.map((color, idx) => (
          <ColorPickerItem
            key={color + idx}
            color={color}
            isActive={newLabelColor === color}
            onClick={() => setNewLabelColor(color)}
          />
        ))}
      </ColorPicker>

      <TaskLabelsFormButtonsContainer>
        <PrimaryButton type='submit'>
          Confirm
        </PrimaryButton>
        <SecondaryButton onClick={onClose}>
          Cancel
        </SecondaryButton>
      </TaskLabelsFormButtonsContainer>
    </TaskLabelsForm>
  )
}

export default TaskLabelForm;
