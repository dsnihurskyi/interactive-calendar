import styled from 'styled-components';
import { device } from '../../styles/breakPoints';

export const CalendarContainer = styled.div`
  padding: 20px;
  margin: auto;
  background-color: ${(props) => props.theme.colors.calendarBackground};
`;
