import React, { FC, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { useDropzone } from 'react-dropzone';

import { Input, PrimaryButton, Select, TaskLabelSpan } from '../../global/styled';
import { useCalendarContext } from '../../contexts/calendarContext';
import TaskLabelsWidget from '../TaskLabelsWidget';
import { TaskLabel } from '../../global/types';
import TaskModal from '../TaskModal';
import {
  AppliedLabelFiltersContainer,
  AppliedLabelFiltersList,
  SearchLabelsContainer,
  ToolbarContainer,
  ToolbarItem,
} from './styled';
import { theme } from '../../styles/theme';
import { CALENDAR_ID } from '../../consts/calendar';
import { ParsedTaskData, ToolbarProps } from './types';
import { useCountries } from '../../hooks/useCountries';

const Toolbar: FC<ToolbarProps> = ({
  selectedCountryCode,
  setSelectedCountryCode,
}) => {
  const {
    taskLabels,
    tasks,
    handleFilterTasks,
    handleUpdateTasks,
    updateTaskLabelsList,
  } = useCalendarContext();
  const { data: countries } = useCountries();

  const [text, setText] = useState<string>('');
  const [selectedTaskLabels, setSelectedTaskLabels] = useState<TaskLabel[]>([]);
  const [isSearchLabelModalOpen, setSearchLabelModalOpen] = useState<boolean>(false);

  const handleResetFilters = () => {
    setText('');
    setSelectedTaskLabels([]);
  };

  useEffect(() => {
    handleResetFilters();
  }, [taskLabels, tasks]);

  useEffect(() => {
    handleResetFilters();
  }, [taskLabels, tasks]);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleFilterTasks(text, selectedTaskLabels);
    }, 500)

    return () => clearTimeout(timer);
  }, [text, handleFilterTasks, selectedTaskLabels]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'text/plain': ['.json'] },
    multiple: false,
    onDropAccepted: async acceptedFiles => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedCalendarData = e.target?.result as string;
          const parsedCalendarData = JSON.parse(importedCalendarData);
  
          if (parsedCalendarData?.tasks?.length) {
            const normalizedTasksList = parsedCalendarData.tasks.map((task: ParsedTaskData)=> ({
              ...task,
              date: new Date(task.date),
            }));
  
            handleUpdateTasks(normalizedTasksList);
          }
  
          if (parsedCalendarData?.taskLabels?.length) {
            updateTaskLabelsList(parsedCalendarData.taskLabels);
          }
        } catch (error) {
          return;
        }
      };
      reader.readAsText(acceptedFiles[0]);
    },
  });

  const handleExportToFile = () => {
    const calendarData = {
      tasks,
      taskLabels,
    };
    const jsonData = JSON.stringify(calendarData);
    const blob = new Blob([jsonData], { type: 'text/plain;charset=utf-8' });

    saveAs(blob, "calendarData.json");
  };

  const handleDownloadAsImage = () => {
    const calendarGridElement = document.getElementById(CALENDAR_ID);
    if (calendarGridElement) {
      html2canvas(calendarGridElement).then((canvas) => {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'calendar.png';
        link.click();
      });
    }
  };

  return (
    <ToolbarContainer>
      <ToolbarItem>
        <Select
          $color={theme.colors.textActive}
          $backgroundColor='white'
          value={selectedCountryCode}
          onChange={({target}) => setSelectedCountryCode(target.value)}
        >
          <option value={''} hidden>Select country 🌏</option>
          {countries?.map(country => (
            <option key={country.countryCode} value={country.countryCode}>
              {country.name}
            </option>
          ))}
        </Select>
      </ToolbarItem>

      <ToolbarItem>
        <PrimaryButton
          {...getRootProps()}
          $color={theme.colors.textActive}
          $backgroundColor='white'
        >
          <input {...getInputProps()} />
          Import from .json 📁
        </PrimaryButton>
        <PrimaryButton
          $color={theme.colors.textActive}
          $backgroundColor='white'
          onClick={handleExportToFile}
        >
          Export to .json 📁
        </PrimaryButton>
        <PrimaryButton
          $color={theme.colors.textActive}
          $backgroundColor='white'
          onClick={handleDownloadAsImage}
        >
          Download as .png 📸
        </PrimaryButton>
      </ToolbarItem>

      <ToolbarItem>
        <Input
          type='text'
          placeholder='Search tasks by title... 👀'
          $color={theme.colors.textActive}
          $backgroundColor='white'
          onChange={({ target }) => {
            setText(target.value);
          }}
          value={text}
        />

        {selectedTaskLabels.length ? (
          <AppliedLabelFiltersContainer>
            <AppliedLabelFiltersList>
              {selectedTaskLabels.map(taskLabel => (
                <TaskLabelSpan key={taskLabel.id} $color={taskLabel.color} />
              ))}
            </AppliedLabelFiltersList>

            <PrimaryButton
              $backgroundColor='white'
              $color={theme.colors.textActive}
              onClick={() => setSearchLabelModalOpen(true)}
            >
              Change label filters 👀
            </PrimaryButton>
          </AppliedLabelFiltersContainer>
        ) : (
          <PrimaryButton
            $backgroundColor='white'
            $color={theme.colors.textActive}
            onClick={() => setSearchLabelModalOpen(true)}
          >
            Search by labels 👀
          </PrimaryButton>
        )}
      </ToolbarItem>

      <TaskModal
        isShown={isSearchLabelModalOpen}
        hide={() => setSearchLabelModalOpen(false)}
        headerText='Select task labels for filtering...'
        modalContent={(
          <React.Fragment>
            <SearchLabelsContainer>
              <TaskLabelsWidget
                selectedTaskLabels={selectedTaskLabels}
                setSelectedTaskLabels={setSelectedTaskLabels}
              />
            </SearchLabelsContainer>
            <PrimaryButton onClick={() => setSearchLabelModalOpen(false)}>
              Done
            </PrimaryButton>
          </React.Fragment>
        )}
      />
    </ToolbarContainer>
  )
}

export default Toolbar;
