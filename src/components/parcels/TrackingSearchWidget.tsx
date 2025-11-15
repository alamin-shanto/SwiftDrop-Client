// src/components/parcels/TrackingSearchWidget.tsx
import React, { useState } from "react";
import { useTrackByTrackingIdQuery } from "../../api/parcelsApi";
import Button from "../common/Button";
import ParcelDetails from "./ParcelDetails";

export const TrackingSearchWidget: React.FC = () => {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const {
    data: parcel,
    isFetching,
    isError,
  } = useTrackByTrackingIdQuery(
    { trackingId: submitted },
    { skip: !submitted }
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(query.trim());
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow">
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter tracking ID"
          className="input flex-1"
        />
        <Button type="submit" variant="primary">
          Track
        </Button>
      </form>

      <div className="mt-4">
        {isFetching ? (
          <div className="text-center py-6">Searching...</div>
        ) : isError ? (
          <div className="text-red-500 text-center py-6">
            Error. Check tracking ID.
          </div>
        ) : !parcel ? (
          <div className="text-sm text-gray-500">
            Enter tracking ID to search.
          </div>
        ) : (
          <ParcelDetails parcel={parcel} />
        )}
      </div>
    </div>
  );
};

export default TrackingSearchWidget;
