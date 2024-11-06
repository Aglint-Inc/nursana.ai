export const CustomLabel = (props: any) => {
  const { x, y, value, height, name } = props;
  return (
    <text
      x={x + 5}
      y={y + height / 2}
      fill='#fff'
      textAnchor='start'
      dominantBaseline='middle'
    >
      {`${name}: ${value}`}
    </text>
  );
};
