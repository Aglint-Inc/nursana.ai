import { Minus, Plus } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NumberInputProps {
  value: number;
  min?: number;
  max?: number;
  inputWidth?: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: number) => void;
  disabled?: boolean;
}

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  min = 1,
  max = Infinity,
  inputWidth = "w-16",
  onChange,
}) => {
  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        disabled={value <= min}
        onClick={handleDecrement}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        className={inputWidth}
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
      />
      <Button
        variant="outline"
        disabled={value >= max}
        onClick={handleIncrement}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default NumberInput;
