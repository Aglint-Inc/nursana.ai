import RadialProgress from '@/dashboard/components/RadialProgress';
import { forwardRef } from 'react';

type Variant = 'pink' | 'purple';

type Props = {
  score: number;
  variant?: Variant;
  size?: number;
};

export const ScoreWheel = forwardRef<HTMLDivElement, Props>(
  ({ score, variant = 'pink', size = 225 }, ref) => {
    const chartData = [
      {
        name: 'Score',
        value: score,
        ...getStyles(variant),
      },
    ];
    return (
      <div ref={ref}>
        <RadialProgress chartData={chartData} size={size} />
      </div>
    );
  },
);
ScoreWheel.displayName = 'ScoreWheel';

const getStyles = (variant: Variant): Styles => {
  switch (variant) {
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
