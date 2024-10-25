import React from 'react';
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from 'recharts';

interface RadialProgressProps {
  chartData: {
    name: string;
    value: number;
    fill: string;
    path?: string;
  }[];
  size?: number; // Optional prop for size (defaults to 48px if not provided)
}

const RadialProgress: React.FC<RadialProgressProps> = ({
  chartData,
  size = 48,
}) => {
  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  // Update chartData to include default 'path' if not provided
  const updatedChartData = chartData.map((item) => ({
    ...item,
    fill: `${item.fill}`,
    path: item.path || '#E2E8F0',
  }));

  return (
    <div style={containerStyle}>
      <ResponsiveContainer width='100%' height='100%'>
        <RadialBarChart
          cx='50%'
          cy='50%'
          innerRadius='60%'
          outerRadius='80%'
          barSize={10}
          data={updatedChartData}
          startAngle={180}
          endAngle={-180}
        >
          <PolarAngleAxis
            type='number'
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background={{ fill: updatedChartData[0].path }} // Use 'path' color for background
            dataKey='value'
            angleAxisId={0}
            data={updatedChartData}
            cornerRadius={5}
          />
          <text
            x='50%'
            y='50%'
            textAnchor='middle'
            dominantBaseline='middle'
            style={{
              fill: chartData[0].fill,
              fontSize: '24px',
              fontWeight: 'bold',
            }} // Dynamically use the fill color from chartData
          >
            {chartData[0].value && chartData[0].value.toFixed(1)}
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadialProgress;
