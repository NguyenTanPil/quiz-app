type valueProps = {
  [key: number]: number;
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
  const breakpointsCssProps: string = values.reduce(
    (mediaQueries: string, value: valueProps) => {
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

      return (mediaQueries += `
        @media screen and (${mediaQueryType}: ${screenBreakpoint}px) {
          ${multipleCss}
        }
    `);
    },
    '',
  );

  return breakpointsCssProps;
};
