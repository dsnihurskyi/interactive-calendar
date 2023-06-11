import { TaskLabel } from "../../global/types";

export interface TaskLabelsWidgetProps {
  selectedTaskLabels: TaskLabel[];
  setSelectedTaskLabels: (selectedLabelsList: TaskLabel[]) => void;
};

export interface AddTaskLabelFormProps {
  taskLabelToEdit?: TaskLabel;
  handleUpdateTaskLabel?: (updateTaskLabelPayload: TaskLabel) => void;
  handleCreateTaskLabel?: (createTaskLabelPayload: TaskLabel) => void;
  onClose: () => void;
};

export interface TaskLabelTextProps {
  color: string;
};

export interface ColorPickerItemProps {
  isActive: boolean;
  color: string;
};
