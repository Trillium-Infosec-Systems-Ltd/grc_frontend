import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Sat",
    uv: 250,
    pv: 480,
  },
  {
    name: "Sun",
    uv: 120,
    pv: 350,
  },
  {
    name: "Mon",
    uv: 280,
    pv: 330,
  },
  {
    name: "Tue",
    uv: 380,
    pv: 480,
  },
  {
    name: "Wed",
    uv: 240,
    pv: 150,
  },
  {
    name: "Thu",
    uv: 220,
    pv: 400,
  },
  {
    name: "Fri",
    uv: 360,
    pv: 400,
  },
];

const BarChartGallery = () => {
  const textColor = "#718EBF";

  return (
    <ResponsiveContainer width="100%" height='100%'>
      <BarChart data={data} barGap={10}>
        <CartesianGrid vertical={false} stroke="#F3F3F5" />
        <XAxis dataKey="name" axisLine={false} tick={{ fill: textColor }} />
        <YAxis axisLine={false} tick={{ fill: textColor }} />
        <Legend
          verticalAlign="top"
          align="right"
          iconType="circle"
          wrapperStyle={{
            paddingBottom: 20,
          }}
          formatter={(value, entry) => (
            <span style={{ color: textColor }}>{value}</span>
          )}
        />
        <Bar dataKey="pv" name='Alert' barSize={10} fill="#FE5C73" radius={[10, 10, 10, 10]} />
        <Bar dataKey="uv" name='Resolved' barSize={10} fill="#16DBCC" radius={[10, 10, 10, 10]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartGallery;
