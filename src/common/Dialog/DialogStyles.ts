import styled from 'styled-components';
import { breakpoints, devices } from '../../styles/breakpoints';

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
  padding-bottom: 1.6rem;
  padding-top: 1.6rem;
  text-align: center;

  ${breakpoints({
    cssProp: ['padding-left', 'padding-right'],
    cssPropUnits: 'rem',
    values: [{ [devices.default]: 0 }, { [devices.smallDevices]: 1.6 }],
  })};
`;

export const DialogFooter = styled.div<Props>`
  display: flex;
  justify-content: ${(props) => props.justifyContent};
  padding-bottom: ${(props) => props.pb || 1.6}rem;
  padding-left: ${(props) => props.pl || 1.6}rem;
  padding-right: ${(props) => props.pr || 1.6}rem;
  padding-top: ${(props) => props.pt || 1.6}rem;

  & > button {
    margin-right: 1.2rem;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const CreateQuizContent = styled(Content)`
  max-width: 80rem;
  width: 96%;
`;

export const QuizAnswers = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: -1.6rem;

  & > div {
    margin-bottom: 1.6rem;

    ${breakpoints({
      cssProp: 'width',
      cssPropUnits: '',
      values: [{ [devices.default]: '100%' }, { [devices.smallDevices]: 'calc(50% - 0.8rem)' }],
    })}
  }
`;

export const FormBody = styled.div`
  padding-left: 1.6rem;
  padding-right: 1.6rem;
`;

export const ElementGroup = styled.div`
  margin-top: 1.2rem;
  position: relative;

  &:last-child {
    margin-top: 2.4rem;
  }

  h3 {
    color: ${(props) => props.theme.titleColor};
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
    margin-top: 0;
    text-align: left;
  }

  input {
    padding-right: 1.6rem;
  }

  input[type='color'] {
    cursor: pointer;
    padding: 0.8rem 1.2rem;
  }
`;

export const QuizOptions = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-between;

  & > div {
    margin-bottom: 1.2rem;
    margin-top: 0;

    &:last-child {
      margin-top: 0;
    }

    ${breakpoints({
      cssProp: 'width',
      cssPropUnits: '',
      values: [{ [devices.default]: '100%' }, { [devices.smallDevices]: 'calc(50% - 0.8rem)' }],
    })};
  }
`;

export const ProfileContent = styled(CreateQuizContent)`
  max-width: 60rem;
`;

export const SelectedCategory = styled.div`
  margin-bottom: 0.8rem;
`;

export const CreateCategory = styled.div`
  padding-left: 1.6rem;
  padding-right: 1.6rem;
`;

export const SearchCategory = styled.div`
  margin-bottom: 1.2rem;
  padding-left: 1.6rem;
  padding-right: 1.6rem;
  padding-top: 2.4rem;
`;

export const CreateCategoryActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 2rem;

  & > button {
    margin-right: 1.2rem;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const PaginationWrap = styled.div`
  margin-top: 1.2rem;
  padding-left: 1.6rem;
  padding-right: 1.6rem;
`;
