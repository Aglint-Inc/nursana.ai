import { Progress } from '@/components/ui/progress';

export const RatingBar: React.FC<{
  label: string;
  score: number;
  explanation: string;
  icon?: React.ReactNode;
  maxValue?: number;
}> = ({ label, score, explanation, icon, maxValue = 5 }) => (
  <>
    <div className='flex flex-col gap-1'>
      <div className='flex max-md:flex-col max-md:gap-2 md:justify-between'>
        <div className='flex items-start space-x-2'>
          {icon && icon}
          <span className='text-md font-medium lg:text-lg'>{label}</span>
        </div>

        <div className='flex w-40 items-center space-x-2'>
          <Progress value={score * 20} className='h-1.5 w-full' />
          <span className='text-xs text-muted-foreground'>
            {score}/{maxValue}
          </span>
        </div>
      </div>

      <p className='text-muted-foreground'>{explanation}</p>
    </div>
  </>
);
