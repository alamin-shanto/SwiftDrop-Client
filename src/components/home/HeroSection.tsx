import React from "react";
import { Link } from "react-router-dom";
import TrackingSearchWidget from "../parcels/TrackingSearchWidget";
import ShipmentsBarChart from "../charts/ShipmentsBarChart";
import StatusPieChart from "../charts/StatusPieChart";
import Button from "../common/Button";

type MonthlyShipment = {
  month: string;
  count: number;
};

type ParcelStats = {
  total: number;
  delivered: number;
  inTransit: number;
  monthly: MonthlyShipment[];
};

type Props = {
  stats?: ParcelStats;
  isLoading: boolean;
};

const HeroSection: React.FC<Props> = ({ stats, isLoading }) => {
  return (
    <section className="relative min-h-[65vh] mb-16 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center h-full">
        {/* LEFT */}
        <div className="space-y-6 animate-[fadeUp_0.8s_ease-out_forwards] opacity-0">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            SwiftDrop — parcel delivery that actually moves fast.
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300">
            Send, track and manage parcels across the country with real-time
            updates, transparent pricing and human-friendly support. Built for
            modern senders, trusted by local businesses.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/auth/register">
              <Button variant="primary">Create account</Button>
            </Link>
            <Link to="/features">
              <Button variant="outline">See features</Button>
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-semibold">
                {stats?.total ?? "—"}
              </div>
              <div className="text-xs text-gray-500">Shipments</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">
                {stats?.delivered ?? "—"}
              </div>
              <div className="text-xs text-gray-500">Delivered</div>
            </div>
            <div>
              <div className="text-2xl font-semibold">
                {stats?.inTransit ?? "—"}
              </div>
              <div className="text-xs text-gray-500">In transit</div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6 animate-[fadeUp_0.8s_ease-out_0.15s_forwards] opacity-0">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow tour-create-parcel">
            <h3 className="font-semibold mb-3">Track a parcel</h3>
            <TrackingSearchWidget />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow">
              <h4 className="font-medium mb-2">Monthly shipments</h4>
              <ShipmentsBarChart
                data={stats?.monthly ?? []}
                loading={isLoading}
              />
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow">
              <h4 className="font-medium mb-2">Status breakdown</h4>
              <StatusPieChart stats={stats} loading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
