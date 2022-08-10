import React from 'react';
import { Button } from '../../common/Button';

type Props = {
  nextQuestion: any;
};

const Footer: React.FC<Props> = ({ nextQuestion }) => {
  return (
    <>
      <Button onClick={nextQuestion}>Next</Button>
    </>
  );
};

export default Footer;
