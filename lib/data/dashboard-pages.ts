import { IDashboardPage } from "@/lib/types/dashboard-pages.type";
import {
  Users,
  LayoutDashboard,
  BookOpenText,
  ImageIcon
} from "lucide-react";

export const dashboardPages: IDashboardPage[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
  },
  {
    name: "Sliders",
    icon: ImageIcon,
    href: "/admin/dashboard/sliders",
  },
  {
    name: "Users",
    icon: Users,
    href: "/admin/dashboard/users",
  },
  {
    name: "Courses",
    icon: BookOpenText,
    href: "/admin/dashboard/courses",
  }
];