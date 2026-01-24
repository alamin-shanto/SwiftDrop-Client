import React from "react";

const steps = [
  {
    step: "01",
    title: "Create a shipment",
    description:
      "Enter pickup & delivery details, choose parcel type, and get instant pricing before confirming.",
  },
  {
    step: "02",
    title: "We pick it up",
    description:
      "Our rider picks up the parcel from your location and updates status in real time.",
  },
  {
    step: "03",
    title: "Track till delivery",
    description:
      "Sender and receiver can track the parcel live until successful delivery.",
  },
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-semibold mb-8 text-center">
        How SwiftDrop works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((item) => (
          <div
            key={item.step}
            className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow text-center"
          >
            <div className="text-sky-600 font-bold text-xl mb-2">
              {item.step}
            </div>
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
