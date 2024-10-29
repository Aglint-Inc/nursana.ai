import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type PropsWithChildren } from 'react';

import { cn } from '@/utils/cn';

import { ScoreWheel } from './ScoreWheel';

type ScoreWheelProps = Parameters<typeof ScoreWheel>[0];

type Variant = NonNullable<ScoreWheelProps['variant']>;

type BgVariant<T extends Variant = Variant> = { [Bg in T]: `bg-${Bg}-50` };

type ColorVariant<T extends Variant = Variant> = {
  [Color in T]: `text-${Color}-600`;
};

const containerVariant = cva(
  'flex flex-col items-center justify-center rounded-lg px-4 pt-4 pb-2',
  {
    variants: {
      variant: {
        pink: 'bg-pink-50',
        purple: 'bg-purple-50',
      } as const satisfies BgVariant,
    },
    defaultVariants: {
      variant: 'pink',
    },
  },
);

const scoreVariant = cva('font-medium', {
  variants: {
    variant: {
      pink: 'text-pink-600',
      purple: 'text-purple-600',
    } as const satisfies ColorVariant,
  },
  defaultVariants: {
    variant: 'pink',
  },
});

type CombinedVariantProps = VariantProps<typeof containerVariant> &
  VariantProps<typeof scoreVariant>;

type Props = {
  title: string;
} & ScoreWheelProps &
  CombinedVariantProps;

export const ScoreCard = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  ({ title, variant, children, ...wheelProps }, ref) => {
    return (
      <div ref={ref} className={cn(containerVariant({ variant }))}>
        <div className={cn(scoreVariant({ variant }))}>{title}</div>
        <ScoreWheel variant={variant} {...wheelProps} />
        {children}
      </div>
    );
  },
);
ScoreCard.displayName = 'ScoreCard';
