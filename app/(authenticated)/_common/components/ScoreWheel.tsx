import { forwardRef } from 'react';

import RadialProgress from '@/dashboard/components/RadialProgress';

type Variant = 'pink' | 'purple' | 'error';

type Props = {
  score?: number;
  variant?: Variant;
  size?: number;
};

export const ScoreWheel = forwardRef<HTMLDivElement, Props>(
  ({ score = 0, variant = 'pink', size = 225 }, ref) => {
    const chartData = [
      {
        name: 'Score',
        value: score,
        ...getStyles(variant),
      },
    ];
    return (
      <div ref={ref}>
        <RadialProgress
          chartData={chartData}
          size={size}
          error={variant === 'error'}
        />
      </div>
    );
  },
);
ScoreWheel.displayName = 'ScoreWheel';

const getStyles = (variant: Variant): Styles => {
  switch (variant) {
    case 'error':
      return {
        fill: '#797979',
        path: '#e2e2e2',
      };
    case 'purple':
      return {
        fill: '#8b5cf6',
        path: '#ddd6fe',
      };

    default:
      return {
        fill: '#db2777',
        path: '#fbcfe8',
      };
  }
};

type Styles = {
  fill: `#${string}`;
  path: `#${string}`;
};
