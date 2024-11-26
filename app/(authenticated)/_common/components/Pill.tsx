import { cn } from '@/utils/cn';

interface PillProps {
  level: 'high' | 'medium' | 'low' | 'neutral';
  text: string;
}

const Pill: React.FC<PillProps> = ({ level, text }) => {
  const colors = {
    high: 'bg-red-500 text-white',
    medium: 'bg-yellow-500 text-black',
    low: 'bg-green-500 text-white',
    neutral: 'bg-gray-200 text-black',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs',
        colors[level],
      )}
    >
      {text?.charAt(0).toUpperCase() + text?.slice(1)}
    </div>
  );
};

export default Pill;
