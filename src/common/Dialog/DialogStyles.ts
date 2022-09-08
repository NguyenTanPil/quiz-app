import styled from 'styled-components';

type Props = {
  [key: string]: any;
};

export const Container = styled.div`
  background-color: rgba(91, 112, 131, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: auto;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  z-index: 2000;
`;

export const Content = styled.div<Props>`
  background-color: ${(props) => props.theme.backgroundColor};
  border-radius: 0.8rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-left: 0.6rem;
  margin-right: 0.6rem;
  max-width: 48rem;
  min-width: 30.8rem;
`;

export const DialogHeader = styled.div`
  border-bottom: 0.1rem solid ${(props) => props.theme.borderColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem;
`;

export const DialogTitle = styled.div`
  color: ${(props) => props.theme.titleColor};
  font-size: 1.6rem;
  font-weight: 600;
`;

export const DialogBody = styled.div`
  color: ${(props) => props.theme.fontColor};
  font-size: 1.4rem;
  font-weight: 400;
  line-height: 2.4rem;
  padding: 1.6rem;
  text-align: center;
`;

export const DialogFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 1.6rem;

  & > button {
    margin-left: 1.2rem;
  }
`;
