import styled from 'styled-components';
import { device } from '../../styles/breakPoints';
import { TaskContainerProps } from './types';

export const TaskContainer = styled.div<TaskContainerProps>`
  display: flex;
  flex-direction: column;
  padding: 4px;

  opacity: ${(props) => props.isDragging ? 0.6 : 1};
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.taskBackground};

  cursor: pointer;
`;

export const TaskTitle = styled.p`
  margin: 0;
  padding: 0;

  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.textMuted};

  @media only screen and ${device.xs} {
    font-size: 0.625rem;
  }
`;

export const TaskLabelsContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
`;
