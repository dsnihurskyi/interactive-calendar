export interface CountryData {
  countryCode: string;
  name: string;
};

export interface HolidayData {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: string[] | null;
  launchYear: number | null;
  types: string[];
}

export interface Day {
  date: Date;
  year: number;
  dayOfWeek: 0 | 2 | 1 | 3 | 4 | 5 | 6;
  dayOfMonth: number;
  isCurrentMonth: boolean;
};

export interface TaskLabel {
  id: string;
  color: string;
  text: string;
};

export interface Task {
  id: string;
  title: string;
  date: Date;
  labelIds: string[];
};

export interface CalendarContextData {
  tasks: Task[];
  filteredTasks: Task[];
  taskLabels: TaskLabel[];
  handleTaskCreation: (title: string, date: Date, labelIds: string[]) => void;
  handleTaskUpdate: (taskId: string, updateTaskPayload: Task) => void;
  updateTaskLabelsList: (updatedLabelsList: TaskLabel[]) => void;
  handleUpdateTasks: (newTasksList: Task[]) => void;
  handleFilterTasks: (searchValue: string, searchLabels: TaskLabel[]) => void;
};
