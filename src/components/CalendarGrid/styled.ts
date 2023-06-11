import styled from 'styled-components';
import { device } from '../../styles/breakPoints';

export const CalendarContainer = styled.div`
  padding: 20px;
  margin: auto;
  background-color: ${(props) => props.theme.colors.calendarBackground};
`;

export const CalendarHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const CalendarButton = styled.button`
  border: none;
  border-radius: 0.3rem;

  color: ${(props) => props.theme.colors.textPrimary};
  background-color: ${(props) => props.theme.colors.dayBackground};
  transition: background-color ease 0.3s;

  padding: 0.5rem 1rem;

  cursor: pointer;
`;

export const SelectedMonth = styled.span`
  margin: auto;
  width: fit-content;
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.textPrimary};
  font-weight: 700;
`;

export const Calendar = styled.div`
  display: grid;
  gap: 0.3rem;
  grid-template-columns: repeat(7, 1fr);
  grid-column: 1 / 7;
  overflow: auto;

  @media only screen and ${device.xs} {
    padding: 0.5rem;
    gap: 0.25rem;
    border-radius: 1rem;
  }
`;

export const WeekDay = styled.div`
  text-align:center;
  color: ${(props) => props.theme.colors.textMuted};
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 700;

  @media only screen and ${device.xs} {
    font-size: 0.625rem;
    padding: 0.15rem 0.25rem;
  }
`;
