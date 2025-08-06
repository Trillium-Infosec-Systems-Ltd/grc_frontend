import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Jul',
    uv: 40,
  },
  {
    name: 'Aug',
    uv: 70,
  },
  {
    name: 'Sep',
    uv: 120,
  },
  {
    name: 'Oct',
    uv: 190,
  },
  {
    name: 'Nov',
    uv: 50,
  },
  {
    name: 'Dec',
    uv: 145,
  },
  {
    name: 'Jan',
    uv: 60,
  },
];

const AreaLineChart = () => {
   const textColor = "#718EBF";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
      >
      <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2D60FF" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#2D60FF" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke='#DFE5EE' />
        <XAxis dataKey="name" axisLine={false} tick={{ fill: textColor }} />
        <YAxis axisLine={false} tick={{ fill: textColor }} />
        <Area type="monotone" dataKey="uv" stroke="#FE5C73" strokeWidth={3} fill="url(#colorUv)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaLineChart;
