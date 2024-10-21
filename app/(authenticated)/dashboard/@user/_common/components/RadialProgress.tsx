import React from 'react';
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer
} from 'recharts';

interface RadialProgressProps {
  chartData: {
    name: string;
    value: number;
    fill: string;
  }[];
  size?: number; // Optional prop for size (defaults to 48px if not provided)
}

const RadialProgress: React.FC<RadialProgressProps> = ({ chartData, size = 48 }) => {
  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div style={containerStyle}>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="80%"
          barSize={10}
          data={chartData}
          startAngle={180}
          endAngle={-180}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background
            dataKey="value"
            angleAxisId={0}
            data={chartData}
            cornerRadius={5}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fill: '#6B46C1', fontSize: '24px', fontWeight: 'bold' }}
          >
            {chartData[0].value.toFixed(1)}
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadialProgress;
