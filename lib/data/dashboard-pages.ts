import { IDashboardPage } from "@/lib/types/dashboard-pages.type";
import {
  Users,
  LayoutDashboard,
  Truck,
  ShipWheel,
  UserCog,
  BadgeDollarSign,
  Building2Icon,
} from "lucide-react";

export const dashboardPages: IDashboardPage[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    name: "Sliders",
    icon: LayoutDashboard,
    href: "/admin/dashboard/sliders",
  },
  {
    name: "Users",
    icon: Users,
    href: "/dashboard/users",
  },
  {
    name: "Companies",
    icon: Building2Icon,
    href: "/dashboard/companies",
  },
  {
    name: "Roles",
    icon: UserCog,
    href: "/dashboard/roles",
  },
  {
    name: "Drivers",
    icon: ShipWheel,
    href: "/dashboard/drivers",
  },
  {
    name: "Vehicles",
    icon: Truck,
    href: "/dashboard/vehicles",
  },
  {
    name: "Rents",
    icon: BadgeDollarSign,
    href: "/dashboard/rents",
  },
];