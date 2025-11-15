import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Stats = {
  total?: number;
  delivered?: number;
  inTransit?: number;
  cancelled?: number;
};

type Props = { stats?: Stats | null; loading?: boolean };

const COLORS = ["#60A5FA", "#34D399", "#F59E0B", "#EF4444"];

export const StatusPieChart: React.FC<Props> = ({ stats, loading }) => {
  if (loading)
    return (
      <div className="h-48 flex items-center justify-center">
        Loading chart...
      </div>
    );
  const data = [
    { name: "Delivered", value: stats?.delivered ?? 0 },
    { name: "In Transit", value: stats?.inTransit ?? 0 },
    {
      name: "Pending",
      value:
        (stats?.total ?? 0) -
        ((stats?.delivered ?? 0) +
          (stats?.inTransit ?? 0) +
          (stats?.cancelled ?? 0)),
    },
    { name: "Cancelled", value: stats?.cancelled ?? 0 },
  ];

  return (
    <div style={{ width: "100%", height: 240 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            innerRadius={40}
            outerRadius={80}
            label
          >
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusPieChart;
