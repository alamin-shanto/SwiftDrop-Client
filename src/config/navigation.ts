import { HomeIcon, CubeIcon } from "@heroicons/react/24/outline";

export type NavItem = {
  name: string;
  to: string;
  icon?: React.ElementType;
  auth?: boolean;
  role?: "admin" | "receiver" | "sender";
};

export const navigation: NavItem[] = [
  // ---------- ADMIN ----------
  {
    name: "Admin Dashboard",
    to: "/dashboard/admin",
    icon: HomeIcon,
    auth: true,
    role: "admin",
  },
  {
    name: "Track Parcels",
    to: "/dashboard/tracking",
    icon: CubeIcon,
    auth: true,
    role: "admin",
  },

  // ---------- RECEIVER ----------
  {
    name: "Receiver Dashboard",
    to: "/dashboard/receiver",
    icon: HomeIcon,
    auth: true,
    role: "receiver",
  },
  {
    name: "Track Parcels",
    to: "/dashboard/tracking",
    icon: CubeIcon,
    auth: true,
    role: "receiver",
  },

  // ---------- SENDER ----------
  {
    name: "Sender Dashboard",
    to: "/dashboard/sender",
    icon: HomeIcon,
    auth: true,
    role: "sender",
  },
  {
    name: "Track Parcels",
    to: "/dashboard/tracking",
    icon: CubeIcon,
    auth: true,
    role: "sender",
  },
];
