import { Pie, PieChart, ResponsiveContainer, Legend, Cell } from "recharts";

const dataSet = [
  { name: "Assets", value: 300 },
  { name: "Vulnerabilities", value: 300 },
  { name: "Controls", value: 300 },
  { name: "Incidents", value: 400 },
];

const COLORS = {
  Incidents: "#4C78FF",
  Vulnerabilities: "#FF82AC",
  Assets: "#16DBCC",
  Controls: "#FFBB38",
  Compliant: "#00b050",
  "Partially Compliant": "#ffb302",
  "Non-Compliant": "#ff2a04",

  Low: "#00b050",
  "Medium": "#ffe602",
  "High": "#ffb302",
  "Very High": "#ff2a04",
};
const INNER_COLORS = {
  Incidents: "#3464F3",
  Vulnerabilities: "#FF6195",
  Assets: "#1EC6B8",
  Controls: "#FFB11F",
  Low: "#00b050",
  "Medium": "#ffe602",
  "High": "#ffb302",
  "Very High": "#ff2a04",

  Compliant: "#00b050",
  "Partially Compliant": "#ffb302",
  "Non-Compliant": "#ff2a04",
};

const renderLegend = ({ payload }) => {
  const unique = [];
  const seen = new Set();
  payload.forEach((item) => {
    if (!seen.has(item.value)) {
      seen.add(item.value);
      unique.push(item);
    }
  });

  return (
    <ul
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "24px",
        listStyle: "none",
        marginTop: "16px",
        padding: 0,
      }}
    >
      {unique.map((entry, index) => (
        <li
          key={`legend-${index}`}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              backgroundColor: entry.color,
              borderRadius: "50%",
              display: "inline-block",
            }}
          />
          <span style={{ color: "#718EBF", fontSize: 14 }}>{entry.value}</span>
        </li>
      ))}
    </ul>
  );
};

export default function DoughnutChart({ data = dataSet }) {
  return (
    <>
      <style>
        {`
  .recharts-sector:focus {
    outline: none;
  }
`}
      </style>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            startAngle={90}
            endAngle={-270}
            innerRadius={40}
            outerRadius={100}
            dataKey="value"
            paddingAngle={0}
          >
            {data?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.name]}
                strokeWidth={0}
              />
            ))}
          </Pie>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={90}
            endAngle={-270}
            innerRadius={35}
            outerRadius={60}
            dataKey="value"
            paddingAngle={0}
          >
            {data.map((entry, index) => (
              <Cell
                key={`inner-${index}`}
                fill={INNER_COLORS[entry.name]}
                strokeWidth={0}
              />
            ))}
          </Pie>

          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
