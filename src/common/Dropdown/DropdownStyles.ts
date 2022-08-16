import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  button {
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

export const DropdownList = styled.ul`
  background-color: ${(props) => props.theme.backgroundColor};
  border: 0.1rem solid ${(props) => props.theme.borderColor};
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: calc(100% + 0.4rem);
  z-index: 200;
`;

type DropdownItemProps = {
  [key: string]: any;
};

export const DropdownItem = styled.li<DropdownItemProps>`
  border-bottom: 0.1rem solid ${(props) => props.theme.borderColor};

  &:last-child {
    border-bottom: none;
  }

  button {
    background-color: ${(props) =>
      props.selected ? props.theme.borderColor : props.theme.backgroundColor};
    border-radius: 0;
    color: ${(props) =>
      props.selected ? props.theme.mainColor : props.theme.fontColor};

    &:hover {
      background-color: ${(props) => props.theme.dropdownButtonHover};
    }
  }
`;
