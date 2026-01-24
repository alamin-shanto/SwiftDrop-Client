import React from "react";

const stats = [
  { label: "Cities covered", value: "45+" },
  { label: "Active riders", value: "1,200+" },
  { label: "Daily deliveries", value: "8,000+" },
  { label: "Business clients", value: "600+" },
];

const ServiceCoverageSection: React.FC = () => {
  return (
    <section className="mb-16 bg-slate-50 dark:bg-slate-900 rounded-lg p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Our delivery network
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((item) => (
          <div key={item.label}>
            <div className="text-3xl font-bold text-sky-600">{item.value}</div>
            <div className="text-sm text-gray-500 mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceCoverageSection;
