import React from "react";
import type { Parcel, User } from "../../types";
import { format } from "date-fns";

type Props = {
  parcel: Parcel;
  onView: (p: Parcel) => void;
  onCancel: (id: string) => void;
};

/** Narrow run-time check to see if receiver is an object shaped like a User */
function isReceiverObject(x: unknown): x is Partial<User> {
  return typeof x === "object" && x !== null;
}

export const ParcelRow: React.FC<Props> = ({ parcel, onView, onCancel }) => {
  // latest status: prefer last log, fallback to parcel.status
  const latestStatus =
    parcel.logs && parcel.logs.length > 0
      ? parcel.logs[parcel.logs.length - 1].status
      : parcel.status;

  // receiver may be a string (name) or a User object
  const receiverName =
    typeof parcel.receiver === "string"
      ? parcel.receiver
      : isReceiverObject(parcel.receiver)
      ? parcel.receiver.name ?? "-"
      : "-";

  const receiverPhone =
    typeof parcel.receiver === "string"
      ? "-"
      : isReceiverObject(parcel.receiver)
      ? parcel.receiver.phone ?? "-"
      : "-";

  const weightDisplay = parcel.weight ? `${parcel.weight} kg` : "-";
  const costDisplay =
    typeof parcel.cost === "number" && !Number.isNaN(parcel.cost)
      ? `৳ ${parcel.cost}`
      : "-";

  const createdAtDisplay = parcel.createdAt
    ? (() => {
        try {
          return format(new Date(parcel.createdAt), "dd MMM yyyy");
        } catch {
          return "-";
        }
      })()
    : "-";

  return (
    <tr className="border-b">
      <td className="px-3 py-2 text-sm">{parcel.trackingId}</td>

      <td className="px-3 py-2 text-sm">
        <div className="font-medium">{receiverName}</div>
        <div className="text-xs text-gray-500">{receiverPhone}</div>
      </td>

      <td className="px-3 py-2 text-sm">{weightDisplay}</td>

      <td className="px-3 py-2 text-sm">{latestStatus}</td>

      <td className="px-3 py-2 text-sm">{costDisplay}</td>

      <td className="px-3 py-2 text-sm">{createdAtDisplay}</td>

      <td className="px-3 py-2 text-sm">
        <div className="flex gap-2">
          <button
            onClick={() => onView(parcel)}
            className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-sm"
          >
            View
          </button>

          {parcel.status !== "dispatched" &&
          parcel.status !== "delivered" &&
          parcel.status !== "cancelled" ? (
            <button
              onClick={() => onCancel(parcel._id)}
              className="px-2 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600"
            >
              Cancel
            </button>
          ) : null}
        </div>
      </td>
    </tr>
  );
};

export default ParcelRow;
