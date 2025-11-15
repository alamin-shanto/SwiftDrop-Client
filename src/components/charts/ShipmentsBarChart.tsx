import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type MonthPoint = { month: string; count: number };
type Props = { data: MonthPoint[]; loading?: boolean };

export const ShipmentsBarChart: React.FC<Props> = ({
  data = [],
  loading = false,
}) => {
  if (loading)
    return (
      <div className="h-48 flex items-center justify-center">
        Loading chart...
      </div>
    );
  return (
    <div style={{ width: "100%", height: 280 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" name="Shipments" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ShipmentsBarChart;
