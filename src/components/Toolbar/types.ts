import { Task } from "../../global/types";

export interface ParsedTaskData extends Omit<Task, 'date'> {
  date: string;
};

export interface ToolbarProps {
  selectedCountryCode: string;
  setSelectedCountryCode: (countryCode: string) => void;
};
