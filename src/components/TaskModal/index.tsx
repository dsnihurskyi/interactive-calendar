import React, { FC } from 'react';

import {
  Wrapper,
  Header,
  StyledModal,
  HeaderText,
  CloseButton,
  Content,
  Backdrop,
} from './styled';
import { TaskModalProps } from './types';

const TaskModal: FC<TaskModalProps> = ({
  isShown,
  hide,
  modalContent,
  headerText,
}) => {
  return isShown ? (
    <React.Fragment>
      <Backdrop onClick={hide} />
      <Wrapper>
        <StyledModal>
          <Header>
            <HeaderText>{headerText}</HeaderText>
            <CloseButton onClick={hide}>X</CloseButton>
          </Header>
          <Content>{modalContent}</Content>
        </StyledModal>
      </Wrapper>
    </React.Fragment>
  ) : null;
};

export default TaskModal;
