// src/components/parcels/StatusTimeline.tsx
import React from "react";
import type { Parcel, ParcelLog, User } from "../../types";
import { format } from "date-fns";

type Props = {
  parcel: Parcel;
};

function isUser(x: unknown): x is Partial<User> {
  return typeof x === "object" && x !== null && "name" in (x as object);
}

export const StatusTimeline: React.FC<Props> = ({ parcel }) => {
  const logs: ParcelLog[] = parcel.logs ?? [];
  if (!logs.length)
    return <div className="text-sm text-gray-500">No status updates yet.</div>;

  return (
    <ul className="space-y-3">
      {logs
        .slice()
        .reverse()
        .map((log: ParcelLog) => {
          const ts = log.timestamp
            ? (() => {
                try {
                  return format(new Date(log.timestamp), "dd MMM yyyy HH:mm");
                } catch {
                  return log.timestamp;
                }
              })()
            : "-";

          const updatedByLabel =
            log.updatedBy && isUser(log.updatedBy)
              ? log.updatedBy.name ?? String(log.updatedBy)
              : typeof log.updatedBy === "string"
              ? log.updatedBy
              : null;

          return (
            <li
              key={log._id ?? `${log.status}-${log.timestamp}`}
              className="flex items-start gap-3"
            >
              <div className="w-2 h-2 rounded-full mt-2 bg-blue-500" />
              <div>
                <div className="text-sm font-medium">{log.status}</div>
                <div className="text-xs text-gray-500">{ts}</div>
                {log.note && <div className="text-sm mt-1">{log.note}</div>}
                {updatedByLabel && (
                  <div className="text-xs text-gray-400 mt-1">
                    Updated by: {updatedByLabel}
                  </div>
                )}
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default StatusTimeline;
