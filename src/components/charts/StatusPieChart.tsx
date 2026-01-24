import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

/* ================= TYPES ================= */

type Stats = {
  total?: number;
  delivered?: number;
  inTransit?: number;
  cancelled?: number;
  pending?: number;
};

type Props = {
  stats?: Stats | null;
  loading?: boolean;
  height?: number;
  title?: string;
  mode?: "sender" | "receiver";
};

/* ================= COLOR PRESETS ================= */

const SENDER_COLORS = {
  delivered: "#34D399", // green
  inTransit: "#60A5FA", // blue
  pending: "#FBBF24", // amber
  cancelled: "#EF4444", // red
};

const RECEIVER_COLORS = {
  delivered: "#22C55E", // stronger green (success)
  inTransit: "#38BDF8", // calm blue
  pending: "#CBD5E1", // neutral gray (waiting)
  cancelled: "#F87171", // softer red
};

/* ================= COMPONENT ================= */

const StatusPieChart: React.FC<Props> = ({
  stats = null,
  loading = false,
  height = 280,
  title,
  mode = "sender",
}) => {
  const total = stats?.total ?? 0;
  const delivered = stats?.delivered ?? 0;
  const inTransit = stats?.inTransit ?? 0;
  const cancelled = stats?.cancelled ?? 0;

  const pending =
    typeof stats?.pending === "number" ?
      stats.pending
    : Math.max(0, total - (delivered + inTransit + cancelled));

  const colors = mode === "receiver" ? RECEIVER_COLORS : SENDER_COLORS;

  const data =
    mode === "receiver" ?
      [
        { name: "Received", value: delivered, color: colors.delivered },
        { name: "On the way", value: inTransit, color: colors.inTransit },
        { name: "Waiting", value: pending, color: colors.pending },
        { name: "Cancelled", value: cancelled, color: colors.cancelled },
      ]
    : [
        { name: "Delivered", value: delivered, color: colors.delivered },
        { name: "In transit", value: inTransit, color: colors.inTransit },
        { name: "Pending", value: pending, color: colors.pending },
        { name: "Cancelled", value: cancelled, color: colors.cancelled },
      ];

  const hasData = data.some((d) => d.value > 0);

  const resolvedTitle =
    title ??
    (mode === "receiver" ? "Incoming parcel status" : "Outgoing parcel status");

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div
        className="rounded-2xl border border-slate-100 bg-white p-4 flex items-center justify-center"
        style={{ height }}
      >
        <span className="text-sm text-slate-500">Loading chart…</span>
      </div>
    );
  }

  /* ---------- EMPTY ---------- */
  if (!hasData) {
    return (
      <div
        className="rounded-2xl border border-slate-100 bg-white p-4 flex items-center justify-center"
        style={{ height }}
      >
        <span className="text-sm text-slate-500">No data available yet</span>
      </div>
    );
  }

  /* ---------- CHART ---------- */
  return (
    <div
      className="rounded-2xl border border-slate-100 bg-white p-4 flex flex-col gap-3"
      style={{ height }}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-700">
          {resolvedTitle}
        </span>
        <span className="text-xs text-slate-400">Total: {total}</span>
      </div>

      {/* Chart area */}
      <div className="flex-1 min-h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={40}
              outerRadius={80}
              label
            >
              {data.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend (HTML, controlled layout) */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-600">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="truncate">
              {item.name}: {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusPieChart;
