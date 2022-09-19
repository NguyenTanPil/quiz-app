import React from 'react';
import { Arrow, Container, Content } from './ToolTipStyles';

type ToolTipProps = {
  children: React.ReactElement;
  content: string;
  position?: string;
};

const ToolTip = ({ children, content, position }: ToolTipProps) => {
  return (
    <Container>
      {children}
      <Content position={position}>
        <span>{content}</span>
        <Arrow position={position} />
      </Content>
    </Container>
  );
};

ToolTip.defaultProps = {
  position: 'top',
};

export default ToolTip;
