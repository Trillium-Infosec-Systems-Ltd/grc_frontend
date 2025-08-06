import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "5",
    uv: 50,
  },
  {
    name: "10",
    uv: 250,
  },
  {
    name: "15",
    uv: 180,
  },
  {
    name: "20",
    uv: 380,
  },
  {
    name: "25",
    uv: 210,
  },
  {
    name: "30",
    uv: 300,
  },
];

export default function LineChartGallery() {
  const textColor = "#718EBF";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#DFE5EE"
          vertical={false}
        />
        <XAxis dataKey="name" axisLine={false} tick={{ fill: textColor }} />
        <YAxis axisLine={false} tick={{ fill: textColor }} />
        <Line dataKey="uv" stroke="#FCAA0B" strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
}
