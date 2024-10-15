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
    <div className="flex flex-col gap-4 items-center">
      <div
        className={`w-24 h-24 flex items-center justify-center rounded-md ${backgroundColorClass}`}
      >
        <Icon className="w-12 h-12 text-white" strokeWidth={1.2} />
      </div>
      <div className="flex flex-col gap-2 text-center">
        <div className="text-lg font-medium">{heading}</div>
        <div className="text-md text-muted-foreground">{description}</div>
      </div>
    </div>
  );
};

export default StepperCard;
