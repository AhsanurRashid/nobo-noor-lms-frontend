"use client";
import { dashboardPages } from "@/lib/data/dashboard-pages";
import { IDashboardPage } from "@/lib/types/dashboard-pages.type";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [activePage, setActivePage] = useState<string>();
  const pathname = usePathname();

  useEffect(() => {
    const pathNameArray = pathname.split("/");

    if (pathNameArray.length > 3) {
      const pageName = pathNameArray[3].toLowerCase();

      const page = dashboardPages.find((page: IDashboardPage) => {
        return pageName === page.name.toLowerCase();
      });

      if (page) {
        setActivePage(page.name);
      } else {
        setActivePage("dashboard");
      }
    } else {
      setActivePage("Dashboard");
    }
    
  }, [pathname]);

  return (
    <div className="flex flex-col gap-1">
      {dashboardPages.map((page: IDashboardPage) => (
        <Link href={page.href} key={page.name}>
          <div
            className={cn(
              activePage === page.name && "bg-primary text-primary-foreground",
              "flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-primary hover:text-primary-foreground"
            )}
          >
            <page.icon size={15} />
            <p className="text-sm tracking-wide">{page.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
