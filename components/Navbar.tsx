"use client";

import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";

import Link from "next/link";
import WalletMultiButton from "./WalletMultiButton";
import { usePathname } from "next/navigation";
import { useRef } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Panel", href: "/panel" },
  { label: "Panel2", href: "/panel2" },
];

export const Nav = () => {
  const pathname = usePathname();
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  const handleMenuItemClick = () => {
    if (menuToggleRef.current) {
      menuToggleRef.current.click();
    }
  };

  return (
    <Navbar maxWidth="full">
      <NavbarMenuToggle
        /* @ts-ignore */
        ref={menuToggleRef}
      />

      <NavbarMenu>
        {navItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              href={item.href}
              onClick={handleMenuItemClick}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {navItems.map((item, index) => (
          <NavbarItem key={index} isActive={item.href === pathname}>
            <Link href={item.href}>{item.label}</Link>
          </NavbarItem>
        ))}
        <NavbarItem>
          <WalletMultiButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
