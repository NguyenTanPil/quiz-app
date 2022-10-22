import React from 'react';
import { InlineContent } from './LoadingStyles';
import loadingInlineGif from '../../images/loadingInline.gif';

const LoadingInline = () => {
  return (
    <InlineContent>
      <img src={loadingInlineGif} alt="" />
    </InlineContent>
  );
};

export default LoadingInline;
