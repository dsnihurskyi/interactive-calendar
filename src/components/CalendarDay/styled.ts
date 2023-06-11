import styled from 'styled-components';
import { device } from '../../styles/breakPoints';
import { CalendarDayProps } from './types';

export const DayContainer = styled.div<CalendarDayProps>`
  display: flex;
  flex-direction: column;
  min-height: 100px;
  padding: 10px;

  border-radius: 4px;
  opacity: ${(props) => props.day.isCurrentMonth ? 1 : 0.4};
  background-color: ${(props) => props.theme.colors.dayBackground};
`;

export const DayTitleContainer = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.4rem;

  color: ${(props) => props.theme.colors.textPrimary};
`;

export const DayNumber = styled.span`
  display: inline-block;
  font-weight: 700;

  @media only screen and ${device.xs} {
    font-size: 0.875rem;
  }
`;

export const HolidayItem = styled.span`
  display: flex;
  align-items: center;
  padding: 4px;

  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.textActive};
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.875rem;

  cursor: default;

  @media only screen and ${device.xs} {
    font-size: 0.625rem;
  }
`;

export const TasksAmount = styled.span`
  display: inline-block;
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.textMuted};

  @media only screen and ${device.xs} {
    font-size: 0.625rem;
  }
`;

export const TasksContainer = styled.div`
  margin-top: 4px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  overflow-y: auto;
`;

export const TaskForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const UpdateLabelsContainer = styled.div`
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
`;
