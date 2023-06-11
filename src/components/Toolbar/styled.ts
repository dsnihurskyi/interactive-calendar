import styled from 'styled-components';
import { device } from '../../styles/breakPoints';

export const ToolbarContainer = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.3rem;

  background-color: #f5d020;
  background-image: linear-gradient(315deg, #f5d020 0%, #f53803 74%);

  @media only screen and ${device.xs} {
    padding: 0.5rem;
    gap: 0.25rem;
  }
`;

export const ToolbarItem = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

export const AppliedLabelFiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

export const AppliedLabelFiltersList = styled.div`
  max-width: 150px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const SearchLabelsContainer = styled.div`
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
`;
