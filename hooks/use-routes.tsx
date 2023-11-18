"use client";

import { Home, Import, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Accueil",
        href: "/",
        active: pathname === "/",
        isMobile: true,
        icon: Home,
      },
    ],
    [pathname]
  );

  return routes;
};
