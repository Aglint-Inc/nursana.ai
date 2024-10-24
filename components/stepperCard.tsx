import { type FunctionComponent, type SVGProps } from "react";

type IconType = FunctionComponent<SVGProps<SVGSVGElement>>;

interface StepperCardProps {
  heading: string;
  description: string;
  color: "blue" | "orange" | "green";
  icon: IconType;
}

const StepperCard: React.FC<StepperCardProps> = ({
  heading,
  description,
  color,
  icon: Icon,
}) => {
  const backgroundColorClass =
    color === "blue"
      ? "bg-blue-500"
      : color === "orange"
      ? "bg-orange-500"
      : "bg-green-500";

  return (
    <div className="flex flex-col gap-4 md:items-center">
      <div
        className={`md:w-24 md:h-24 w-16 h-16 flex items-center justify-center rounded-md ${backgroundColorClass}`}
      >
        <Icon className="md:w-12 md:h-12 h-8 w-8 text-white" strokeWidth={1.2} />
      </div>
      <div className="flex flex-col gap-2 md:text-center">
        <div className="text-lg font-medium">{heading}</div>
        <div className="text-md text-muted-foreground">{description}</div>
      </div>
    </div>
  );
};

export default StepperCard;
