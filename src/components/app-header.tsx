'use client';

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import { Button } from '@heroui/react';

import { siteConfig } from '@/config/site';

export function AppHeader() {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="text-xl font-bold">{siteConfig.title}</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button>Log out</Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
