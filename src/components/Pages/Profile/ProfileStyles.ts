import styled from 'styled-components';
import { breakpoints, devices } from '../../../styles/breakpoints';

type Props = {
  [key: string]: any;
};

export const Container = styled.main`
  margin-bottom: 6rem;
  margin-top: 4rem;
`;

export const Content = styled.div`
  margin: 0 auto;
  max-width: 96rem;
`;

export const ProfileHeader = styled.div`
  background-color: #f2f2f2;
  border-radius: 0.8rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ${breakpoints({
    cssProp: 'flex-direction',
    cssPropUnits: '',
    values: [{ [devices.default]: 'column' }, { [devices.smallDevices]: 'row' }],
  })};

  ${breakpoints({
    cssProp: 'padding',
    cssPropUnits: '',
    values: [{ [devices.default]: '2rem 1.2rem' }, { [devices.smallDevices]: '4rem 3.2rem' }],
  })};
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const UserAvatar = styled.div`
  ${breakpoints({
    cssProp: ['height', 'width'],
    cssPropUnits: 'rem',
    values: [{ [devices.default]: 9 }, { [devices.smallDevices]: 12 }],
  })};

  img {
    border-radius: 50%;
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;

export const UserDetail = styled.div`
  margin-left: 3.2rem;
`;

export const UserName = styled.h3`
  color: ${(props) => props.theme.titleColor};
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
  margin-top: 0;
`;

export const UserEmail = styled.h4`
  color: ${(props) => props.theme.mainColor};
  font-size: 1.4rem;
  font-weight: 400;
  margin-bottom: 0;
  margin-top: 0;
`;

export const Actions = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  ${breakpoints({
    cssProp: 'flex-direction',
    cssPropUnits: '',
    values: [{ [devices.default]: 'row' }, { [devices.smallDevices]: 'column' }],
  })};
`;

export const ButtonActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    ${breakpoints({
      cssProp: 'padding',
      cssPropUnits: '',
      values: [{ [devices.default]: '1.2rem' }, { [devices.smallDevices]: '1.2rem 1.6rem' }],
    })};

    svg {
      font-size: 1.6rem;
      font-weight: 600;
      margin-right: 0.4rem;
    }

    span {
      ${breakpoints({
        cssProp: 'display',
        cssPropUnits: '',
        values: [{ [devices.default]: 'none' }, { [devices.smallDevices]: 'inline-block' }],
      })};
    }
  }
`;

export const MoreInfo = styled.ul`
  display: flex;
  margin-top: 2.4rem;
`;

export const MoreInfoItem = styled.li`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-left: 2.4rem;

  &:first-child {
    margin-left: 0;
  }

  h5 {
    color: ${(props) => props.theme.titleColor};
    font-size: 2.4rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    margin-top: 0;
  }

  span {
    color: ${(props) => props.theme.fontColor};
    font-size: 1.2rem;
    font-weight: 400;
  }
`;

export const ProfileQuizList = styled.ul`
  background-color: #f2f2f2;
  border-radius: 0.8rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 3.2rem;

  ${breakpoints({
    cssProp: 'flex-direction',
    cssPropUnits: '',
    values: [{ [devices.default]: 'column' }, { [devices.smallDevices]: 'row' }],
  })};

  ${breakpoints({
    cssProp: ['padding-left', 'padding-right'],
    cssPropUnits: 'rem',
    values: [{ [devices.default]: 1.2 }, { [devices.smallDevices]: 3.2 }],
  })};
`;

export const ProfileQuizItem = styled.li`
  border: 0.1rem solid ${(props) => props.theme.borderColor};
  border-radius: 0.4rem;
  box-sizing: border-box;
  display: flex;
  margin-bottom: 2.4rem;
  padding: 1.2rem;

  ${breakpoints({
    cssProp: 'width',
    cssPropUnits: '',
    values: [{ [devices.default]: '100%' }, { [devices.mediumDevices]: 'calc(50% - 0.8rem)' }],
  })};
`;

export const ProfileQuizAvatar = styled.div`
  background-color: ${(props) => props.theme.successColor};
  border-radius: 0.8rem;
  height: 8rem;
  margin-right: 3.2rem;
  width: 8rem;

  ${breakpoints({
    cssProp: 'display',
    cssPropUnits: '',
    values: [{ [devices.default]: 'none' }, { [devices.smallDevices]: 'block' }],
  })};

  img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`;

export const ProfileQuizContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileQuizName = styled.h3`
  color: ${(props) => props.theme.titleColor};
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0;
  margin-top: 0;
`;

export const ProfileQuizDetails = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  & > div {
    color: ${(props) => props.theme.fontColor};
    display: flex;
    align-items: center;
    margin-bottom: 0.8rem;
    margin-top: 0.8rem;
    margin-right: 2rem;

    &:last-child {
      margin-right: 0;
    }

    svg {
      font-size: 1.6rem;
      margin-right: 0.4rem;
    }

    span {
      font-size: 1.6rem;
      font-weight: 400;
    }
  }
`;

export const ProfileQuizTime = styled.div`
  color: ${(props) => props.theme.fontColor};
  display: flex;
  align-items: center;
  margin-top: 0.8rem;

  svg {
    font-size: 1.6rem;
    margin-right: 0.4rem;
  }

  span {
    font-size: 1.6rem;
    font-weight: 400;
  }
`;

export const NoExam = styled.div`
  width: 100%;
`;

export const ExamBlock = styled.div`
  background-color: #f2f2f2;
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
  margin-top: 3.2rem;
  padding-bottom: 2rem;
  padding-top: 2rem;
`;

export const BlockFilter = styled.div<Props>`
  display: flex;
  flex-wrap: ${(props) => (props.noWrap ? 'nowrap' : 'wrap')};

  & > div {
    margin-top: 2.4rem;

    ${breakpoints({
      cssProp: ['margin-left', 'margin-right'],
      cssPropUnits: 'rem',
      values: [{ [devices.default]: 1.2 }, { [devices.smallDevices]: 3.2 }],
    })};

    & > button {
      width: 100%;
    }
  }

  & > span {
    margin-top: 2.4rem;

    ${breakpoints({
      cssProp: 'margin-right',
      cssPropUnits: 'rem',
      values: [{ [devices.default]: 1.2 }, { [devices.smallDevices]: 3.2 }],
    })};

    button {
      min-height: 4.8rem;

      svg {
        font-size: 2rem;
      }
    }
  }

  & > div:first-child {
    flex-grow: 3;
    min-width: 24.8rem;
  }

  & > div:last-child {
    flex-grow: 1;
  }
`;

export const BlockContent = styled.div`
  margin-top: 3.2rem;

  & > ul {
    padding-top: 0;

    ${breakpoints({
      cssProp: ['padding-left', 'padding-right'],
      cssPropUnits: 'rem',
      values: [{ [devices.default]: 1.2 }, { [devices.smallDevices]: 3.2 }],
    })};

    & > li {
      min-height: auto;
    }
  }
`;

export const PaginationWrap = styled.div`
  margin-top: 2.4rem;

  ${breakpoints({
    cssProp: ['margin-left', 'margin-right'],
    cssPropUnits: 'rem',
    values: [{ [devices.default]: 1.2 }, { [devices.smallDevices]: 3.2 }],
  })};
`;

export const CreateCategoryBlock = styled.div`
  margin-top: 2.4rem;

  ${breakpoints({
    cssProp: ['margin-left', 'margin-right'],
    cssPropUnits: 'rem',
    values: [{ [devices.default]: 0 }, { [devices.smallDevices]: 1.6 }],
  })};
`;

export const StudentResult = styled.div`
  margin-top: 3.2rem;

  ${breakpoints({
    cssProp: ['padding-left', 'padding-right'],
    cssPropUnits: 'rem',
    values: [{ [devices.default]: 1.2 }, { [devices.smallDevices]: 3.2 }],
  })};
`;

export const ReportList = styled.div`
  margin-top: 0.8rem;
`;

export const ReportItem = styled.div`
  border: 0.1rem solid ${(props) => props.theme.borderColor};
  border-radius: 0.4rem;
  box-sizing: border-box;
  padding: 1.2rem;

  & > ul {
    border: none;
    margin-bottom: 2.4rem;
    padding: 0;
  }

  & > div {
    padding-left: 1.2rem;
    padding-right: 1.2rem;
  }
`;

export const BlockReport = styled.div`
  margin-top: 3.2rem;

  ${breakpoints({
    cssProp: ['margin-left', 'margin-right'],
    cssPropUnits: 'rem',
    values: [{ [devices.default]: 1.2 }, { [devices.smallDevices]: 3.2 }],
  })};
`;

export const DetailInfo = styled.div`
  ${breakpoints({
    cssProp: ['padding-left', 'padding-right'],
    cssPropUnits: 'rem',
    values: [{ [devices.default]: 0 }, { [devices.smallDevices]: 1.6 }],
  })};

  & > ul > li {
    padding: 1.6rem;
  }
`;

export const QuizListWrap = styled.div`
  ${breakpoints({
    cssProp: ['padding-left', 'padding-right'],
    cssPropUnits: 'rem',
    values: [{ [devices.default]: 0.4 }, { [devices.smallDevices]: 0 }],
  })};

  & > ul {
    margin-top: 2rem;
  }
`;

export const InfoTitle = styled.h4`
  color: ${(props) => props.theme.titleColor};
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  margin-top: 0;
  width: 100%;
`;

export const InfoContent = styled.ul`
  width: 100%;

  & > li {
    color: ${(props) => props.theme.fontColor};
    font-size: 1.4rem;
    font-weight: 400;
    padding-bottom: 0.8rem;

    &:last-child {
      padding-bottom: 0;
    }
  }
`;

export const DetailColor = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 1.6rem;

  ${breakpoints({
    cssProp: ['padding-left', 'padding-right'],
    cssPropUnits: 'rem',
    values: [{ [devices.default]: 1.6 }, { [devices.smallDevices]: 3.2 }],
  })};

  & > div:first-child {
    ${breakpoints({
      cssProp: 'margin-bottom',
      cssPropUnits: 'rem',
      values: [{ [devices.default]: 3.2 }, { [devices.mediumDevices]: 0 }],
    })};
  }
`;

export const DetailColorItem = styled.div`
  flex-direction: column;
  position: relative;

  ${breakpoints({
    cssProp: 'width',
    cssPropUnits: '',
    values: [{ [devices.default]: '100%' }, { [devices.mediumDevices]: 'calc(50% - 0.8rem)' }],
  })};

  h3 {
    margin-bottom: 1.6rem;
  }
`;

export const AnswerContent = styled.span<Props>`
  color: ${(props) => (props.isAnswerClicked ? props.theme.mainColor : props.theme.fontColor)};
`;
