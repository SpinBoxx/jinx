"use client";

import { Home, Import, LogOut, Settings, User } from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useUserDropdownRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Voir mon profil",
        href: "/mon-profil",
        active: pathname === "/mon-profil",
        icon: User,
      },
      {
        onClick: async () => signOut({ callbackUrl: "/login" }),
        className: "text-danger",
        // bg color on hover
        key: "danger",
        label: "Se déconnecter",
        icon: LogOut,
      },
    ],
    [pathname]
  );

  return routes;
};
