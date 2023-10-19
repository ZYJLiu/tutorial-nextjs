"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";

import Image from "next/image";
import Link from "next/link";
import SolanaFoundationLogo from "../public/solanaFoundationLogo.svg";
import SolanaLogo from "../public/solanaLogo.svg";
import { usePathname } from "next/navigation";
import { useRef } from "react";

// Hardcoded navigation items
// Panel pages are for testing purposes
const navItems = [
  { label: "Course", href: "/modules" },
  // { label: "Test Panel", href: "/panel" },
];

// Navbar component
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
        className="sm:hidden"
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

      <NavbarBrand>
        <Link
          href="/"
          className="rounded-md border border-transparent p-2 transition duration-300 hover:border-gray-400"
        >
          <Image src={SolanaLogo} alt="Solana Logo" width={100} />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="end">
        {navItems.map((item, index) => (
          <NavbarItem
            key={index}
            isActive={item.href === pathname}
            className="border-b border-transparent transition duration-300 hover:border-b hover:border-gray-400"
          >
            <Link href={item.href}>{item.label}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>
    </Navbar>
  );
};
