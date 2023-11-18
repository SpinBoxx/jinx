"use client";

import React from "react";
import {
  Navbar as _Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  Skeleton,
} from "@nextui-org/react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRoutes } from "@/hooks/use-routes";
import { cn } from "@/lib/utils";
import { LogIn, LogOut } from "lucide-react";
import { useUserDropdownRoutes } from "@/hooks/use-user-dropdown-routes";

export default function Navbar() {
  const session = useSession();
  const routes = useRoutes();

  const userDropdownRoutes = useUserDropdownRoutes();
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <_Navbar disableAnimation isBordered className="w-full" maxWidth="2xl">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="pr-3 sm:hidden" justify="center">
        <NavbarBrand>
          <Link href="/">
            <Image alt="Jinx logo" width={20} height={20} src="/logo.png" />
            <p className="font-bold text-inherit">inx</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarBrand>
          <Image alt="Jinx logo" width={20} height={20} src="/logo.png" />
          <p className="font-bold text-inherit">inx</p>
        </NavbarBrand>
        {routes.map((route) => (
          <NavbarItem isActive={route.active}>
            <Link
              className={cn(
                "text-foreground",
                route.active && "text-secondary"
              )}
              href={route.href}
            >
              {route.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <Skeleton
          className={cn(
            session.data?.user !== undefined && "overflow-visible",
            "rounded-lg"
          )}
          isLoaded={session.data !== undefined}
        >
          {session.data?.user ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="rounded-full transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Profile Actions"
                variant="flat"
                items={userDropdownRoutes}
              >
                {(route) => (
                  <DropdownItem
                    href={route.href}
                    onClick={route.onClick}
                    startContent={<route.icon className="h-4 w-4" />}
                    color={route.key === "danger" ? "danger" : "default"}
                    className={cn(
                      route.className,
                      route.active && "bg-default-200/90"
                    )}
                    key={route.label}
                  >
                    {route.label}
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavbarItem className="flex">
              <Link href="/login">
                <Button
                  color="primary"
                  startContent={<LogIn className="h-5 w-5" />}
                >
                  Login
                </Button>
              </Link>
            </NavbarItem>
          )}
        </Skeleton>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </_Navbar>
  );
}
