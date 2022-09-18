import { keyframes } from 'styled-components';

export const jelly = keyframes` 
  0% {
     transform: translateY(-50%) scale3d(1,1,1);
  }
  30% {
    transform: translateY(-50%) scale3d(.75,1.25,1);
  }
  40% {
    transform: translateY(-50%) scale3d(1.25,.75,1) ;
  }
  50% {
     transform: translateY(-50%) scale3d(.85,1.15,1);
  }
  65% {
    transform: translateY(-50%) scale3d(1.05,.95,1);
  }
  75% {
    transform: translateY(-50%) scale3d(.95,1.05,1);
  }
  100% {
    transform: translateY(-50%) scale3d(1,1,1) ;
  }
`;
