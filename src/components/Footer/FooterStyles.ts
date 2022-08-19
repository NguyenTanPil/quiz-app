import styled from 'styled-components';

export const Container = styled.footer`
  background-color: #f7f7f7;
  padding-bottom: 4.8rem;
  padding-top: 4.8rem;
`;

export const Content = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  max-width: 112rem;
`;

export const FooterInfo = styled.div`
  max-width: 27.2rem;
  padding-right: 4.8rem;

  span {
    color: ${(props) => props.theme.mainColor};
  }

  p {
    color: ${(props) => props.theme.mainColor};
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 2.4rem;
    margin-top: 2.4rem;
  }
`;

export const FooterLinks = styled.ul`
  column-count: 2;
  display: inline-block;
  padding-left: 2.4rem;

  li {
    color: ${(props) => props.theme.mainColor};
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 2.4rem;
    margin-right: 0.8rem;
  }
`;
