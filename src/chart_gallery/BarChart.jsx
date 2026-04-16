import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const dataSet = [
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

const COLORS = {
  Low: "#00b050",
  "Medium": "#ffe602",
  "High": "#ffb302",
  "Very High": "#ff2a04",
};

const BarChartGallery = ({ data = dataSet, isStacked = false }) => {
  const textColor = "#718EBF";
  const BARS = [...new Set(data?.map((d) => Object.keys(d))?.flat()?.filter(k => k?.toLowerCase() !== 'name'))];

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
        {isStacked ? (
          <>
          {BARS?.map((k) => 
        <Bar dataKey={k} stackId='a' fill={COLORS[k]} barSize={40} />
          )}
        {/* <Bar dataKey="pv" name='Alert' stackId='a' barSize={10} fill="#FE5C73" radius={[10, 10, 10, 10]} />
        <Bar dataKey="uv" name='Resolved' stackId='a' barSize={10} fill="#16DBCC" radius={[10, 10, 10, 10]} /> */}
        </>
        ) : (
          <>
        <Bar dataKey="pv" name='Alert' barSize={10} fill="#FE5C73" radius={[10, 10, 10, 10]} />
        <Bar dataKey="uv" name='Resolved' barSize={10} fill="#16DBCC" radius={[10, 10, 10, 10]} />
        </>
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartGallery;
