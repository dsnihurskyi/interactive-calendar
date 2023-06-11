import styled from 'styled-components';
import { device } from '../styles/breakPoints';

export const PrimaryButton = styled.button<{ $color?: string, $backgroundColor?: string }>`
  padding: 0.3rem;
  width: max-content;
  height: 28px;
  box-sizing: border-box;

  border: none;
  border-radius: 0.3rem;
  color: ${(props) => props.$color || props.theme.colors.textSecondary};
  background: ${(props) => props.$backgroundColor || props.theme.colors.textActive};
  opacity: 0.8;
  transition: opacity, 0.3s;

  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  @media only screen and ${device.sm} {
    padding: 0.15rem;
    font-size: 0.5rem;
  }
`;

export const SecondaryButton = styled.button<{ $color?: string }>`
  padding: 0.3rem;
  width: max-content;
  height: 28px;
  box-sizing: border-box;

  border: none;
  color: ${(props) => props.$color || props.theme.colors.textActive};
  background: transparent;
  opacity: 0.8;
  transition: opacity, 0.3s;

  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  @media only screen and ${device.sm} {
    padding: 0.15rem;
    font-size: 0.5rem;
  }
`;

export const Select = styled.select<{ $color?: string, $backgroundColor?: string }>`
  padding: 0.3rem;
  width: max-content;
  height: 28px;
  box-sizing: border-box;

  border: none;
  border-radius: 0.3rem;
  color: ${(props) => props.$color || props.theme.colors.textActive};
  background: ${(props) => props.$backgroundColor || props.theme.colors.textSecondary};
  opacity: 0.8;
  transition: opacity, 0.3s;

  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  @media only screen and ${device.sm} {
    padding: 0.15rem;
    font-size: 0.5rem;
  }
`;

export const Input = styled.input<{ $color?: string, $backgroundColor?: string }>`
  padding: 0.3rem;
  width: max-content;
  height: 28px;
  box-sizing: border-box;

  border: none;
  border-radius: 0.3rem;
  color: ${(props) => props.$color || props.theme.colors.textPrimary};
  background: ${(props) => props.$backgroundColor || props.theme.colors.dayBackground};
  opacity: 0.8;
  transition: opacity, 0.3s;

  &:hover {
    opacity: 1;
  }

  &::placeholder {
    color: ${(props) => props.$color || props.theme.colors.textPrimary};
  }

  &:-ms-input-placeholder {
    color: ${(props) => props.$color || props.theme.colors.textPrimary};
  }

  &::-ms-input-placeholder {
    color: ${(props) => props.$color || props.theme.colors.textPrimary};
  }

  @media only screen and ${device.sm} {
    padding: 0.15rem;
    font-size: 0.5rem;
  }
`;

export const TaskLabelSpan = styled.span<{ $color: string; }>`
  height: 8px;
  width: 32px;
  border-radius: 8px;
  background-color: ${(props) => props.$color};

  @media only screen and ${device.sm} {
    height: 4px;
    width: 16px;
    border-radius: 4px;
  }
`;
