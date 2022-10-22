import React, { useEffect } from 'react';
import { Container, Content } from './LoadingStyles';
import loadingFullPageGif from '../../images/loadingFullPage.gif';
import { DialogUtils } from '../../utils';

const LoadingFullPage = () => {
  useEffect(() => {
    DialogUtils.disableScrollbar();

    return () => {
      DialogUtils.resetScrollbar();
    };
  }, []);

  return (
    <Container>
      <Content>
        <img src={loadingFullPageGif} alt="" />
      </Content>
    </Container>
  );
};

export default LoadingFullPage;
