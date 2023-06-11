import { Task } from "../../global/types";

export interface TaskItemProps {
  task: Task;
  index: number;
  moveTaskHandler: (dragIndex: number, hoverIndex: number) => void;
  handleInitiateUpdateTaskProcess: (task: Task) => void;
};

export interface TaskContainerProps {
  isDragging: boolean;
};
