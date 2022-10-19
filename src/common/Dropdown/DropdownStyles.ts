import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  button {
    justify-content: flex-start;
    text-align: left;
    width: 100%;
  }
`;

export const SelectedValue = styled.div`
  cursor: pointer;
  position: relative;

  button {
    border: 0.2rem solid ${(props) => props.theme.borderColor};
    padding-right: 3.2rem;
    z-index: 200;
  }

  svg {
    color: ${(props) => props.theme.fontColor};
    font-size: 2.4rem;
    font-weight: 400;
    position: absolute;
    right: 0.4rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 100;
  }
`;
