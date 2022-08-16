type valueProps = {
  [key: number]: number | string;
};

type deviceProps = {
  [key: string]: number;
};

type breakpointsProps = {
  cssProp?: string | string[];
  cssPropUnits?: string;
  values?: valueProps[];
  mediaQueryType?: string;
};

export const devices: deviceProps = {
  default: 100,
  smallDevices: 576,
  mediumDevices: 768,
  largeDevices: 992,
  veryLargeDevices: 1200,
};

export const breakpoints = ({
  cssProp = 'padding',
  cssPropUnits = 'px',
  values = [],
  mediaQueryType = 'min-width',
}: breakpointsProps): any => {
  let mediaQueries: string = '';

  values.forEach((value: valueProps) => {
    const [screenBreakpoint, cssPropBreakpoint] = [
      Object.keys(value)[0],
      Object.values(value)[0],
    ];

    let multipleCss = '';

    if (Array.isArray(cssProp)) {
      const cssPropsString = cssProp.reduce(
        (cssProps, prop) =>
          cssProps + `${prop}: ${cssPropBreakpoint}${cssPropUnits};`,
        '',
      );

      multipleCss = cssPropsString;
    } else {
      multipleCss = `${cssProp}: ${cssPropBreakpoint}${cssPropUnits};`;
    }

    mediaQueries += `
        @media screen and (${mediaQueryType}: ${screenBreakpoint}px) {
          ${multipleCss}
        }
    `;
  }, '');

  return mediaQueries;
};
