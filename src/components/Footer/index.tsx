import React from 'react';
import { Button } from '../../common/Button';
import { Container } from './FooterStyles';

type Props = {
  nextQuestion: any;
};

const Footer: React.FC<Props> = ({ nextQuestion }) => {
  return (
    <Container>
      <Button onClick={nextQuestion}>Next</Button>
    </Container>
  );
};

export default Footer;
