import React from "react";
import { Link } from "react-router-dom";
import { AppShell } from "../../components/layout/AppShell";
import Button from "../../components/common/Button";
import { useParcelsStatsQuery } from "../../api/parcelsApi";
import { useEffect, useState } from "react";
import HeroSection from "../../components/home/heroSection";
import HowItWorksSection from "../../components/home/HowItWorksSection";
import ServiceCoverageSection from "../../components/home/ServiceCoverageSection";

const Home: React.FC = () => {
  const { data: stats, isLoading } = useParcelsStatsQuery();

  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setShowScroll(window.scrollY < 80);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AppShell>
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* HERO */}
        <HeroSection stats={stats} isLoading={isLoading} />

        {/* Scroll indicator (fixed to viewport) */}
        {showScroll && (
          <div className="hidden lg:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex-col items-center gap-2 text-gray-400 pointer-events-none">
            <span className="text-[10px] tracking-widest uppercase opacity-70">
              Scroll
            </span>

            <div className="w-6 h-10 rounded-full border border-gray-500 flex justify-center">
              <span className="w-1.5 h-2.5 bg-gray-400 rounded-full mt-1 animate-scrollDot" />
            </div>
          </div>
        )}

        {/* HOW IT WORKS */}
        <HowItWorksSection />

        {/* FEATURES */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Why people love SwiftDrop
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
              <h3 className="font-semibold">Fast pickup & delivery</h3>
              <p className="text-sm text-gray-500 mt-2">
                Same-day pickup in many areas, with accurate ETAs and live
                tracking for receivers.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
              <h3 className="font-semibold">Transparent pricing</h3>
              <p className="text-sm text-gray-500 mt-2">
                No surprise fees — estimate costs before you create a booking.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
              <h3 className="font-semibold">Business-ready</h3>
              <p className="text-sm text-gray-500 mt-2">
                Bulk upload, webhooks, and an admin console for teams and
                retailers.
              </p>
            </div>
          </div>
        </section>

        {/* SERVICE COVERAGE */}
        <ServiceCoverageSection />

        {/* TESTIMONIALS */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Trusted by local sellers & small teams
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <blockquote className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
              <div className="font-medium">
                "SwiftDrop cut our delivery headaches — fast pickup and zero
                surprises."
              </div>
              <footer className="mt-3 text-sm text-gray-500">
                — Rahim, e-commerce owner
              </footer>
            </blockquote>
            <blockquote className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
              <div className="font-medium">
                "Clean dashboard, useful notifications and stellar support."
              </div>
              <footer className="mt-3 text-sm text-gray-500">
                — Nusrat, operations
              </footer>
            </blockquote>
            <blockquote className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
              <div className="font-medium">
                "The tracking experience impressed our customers — fewer 'where
                is my parcel' messages."
              </div>
              <footer className="mt-3 text-sm text-gray-500">
                — Tanvir, marketplace vendor
              </footer>
            </blockquote>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-linear-to-r from-sky-600 to-indigo-600 rounded-lg text-white p-8">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold">Ready to ship smarter?</h3>
              <p className="mt-2 text-sky-100">
                Create an account and try SwiftDrop. Onboarding takes less than
                3 minutes.
              </p>
            </div>
            <div className="text-right">
              <Link to="/auth/register">
                <Button variant="primary">Get started — it's free</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  );
};

export default Home;
