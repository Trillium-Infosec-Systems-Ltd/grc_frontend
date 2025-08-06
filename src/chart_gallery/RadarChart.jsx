import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
  { subject: 'Identify', score: 10 },
  { subject: 'Protect', score: 80 },
  { subject: 'Detect', score: 30 },
  { subject: 'Respond', score: 60 },
  { subject: 'Recover', score: 65 },
];

const labelColors = {
  Identify: '#FE5C73',
  Protect: '#40E0D0',
  Detect: '#F5A623',
  Respond: '#2C2E4A',
  Recover: '#3C89F5',
};

const CustomAngleTick = (props) => {
  const { payload, x, y, textAnchor } = props;
  const color = labelColors[payload.value] || '#000';

  return (
    <text
      x={x}
      y={y}
      textAnchor={textAnchor}
      fill={color}
      fontWeight="600"
      fontSize="16"
    >
      {payload.value}
    </text>
  );
};

const RadarChartGallery = () => {
  return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#2C2E4A" strokeWidth={3} />
          <PolarAngleAxis dataKey="subject" tick={CustomAngleTick} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
          dataKey="score"
          stroke="#4FD1C5"
          strokeWidth={5}
          fill="#4FD1C580"
          fillOpacity={0.4}
        />
        </RadarChart>
      </ResponsiveContainer>
    );
};

export default RadarChartGallery;
