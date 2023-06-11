import styled from 'styled-components';
import { device } from '../../styles/breakPoints';
import { ColorPickerItemProps, TaskLabelTextProps } from './types';

export const TaskLabelsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TaskLabelItem = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
`;

export const TaskLabelsForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ColorPicker = styled.div`
  display: grid;
  gap: 0.3rem;
  grid-template-columns: repeat(4, 1fr);
  grid-column: 1 / 4;

  @media only screen and ${device.xs} {
    padding: 0.5rem;
    gap: 0.25rem;
    border-radius: 1rem;
  }
`;

export const ColorPickerItem = styled.span<ColorPickerItemProps>`
  width: 100%;
  aspect-ratio : 1 / 1;
  box-sizing: border-box;

  background-color: ${(props) => props.color};
  opacity: ${(props) => props.isActive ? 1 : 0.5};
  border: ${(props) => props.isActive ? '2px dashed black' : 'none'};
  border-radius: 4px;
  transition: opacity 0.3s;

  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

export const TaskLabelsFormButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const TaskLabelContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const TaskLabelCheckbox = styled.input.attrs({ type: "checkbox" })``;

export const TaskLabelText = styled.span<TaskLabelTextProps>`
  display: inline-block;
  font-size: 0.875rem;
  color: ${(props) => props.color};

  @media only screen and ${device.xs} {
    font-size: 0.625rem;
  }
`;
