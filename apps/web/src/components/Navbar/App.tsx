import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Menu } from "lucide-react";

import Logo from "@/public/logo.png";
import clsx from "clsx";

export default function NavbarApp() {
  const router = useRouter();
  const links = [
    {
      name: "Home",
      href: "/app",
    },
    {
      name: "Owned",
      href: "/app/owned",
    },
  ];

  return (
    <div className="top-0 bg-[#101828] flex w-full flex-row justify-between items-center gap-x-2 px-2 md:px-8 py-4">
      <button className="md:hidden">
        <Menu className="text-white" />
      </button>
      <Link href="/">
        <div className="flex flex-row items-center justify-between gap-x-2 md:gap-x-3">
          <Image
            src={Logo}
            alt="Logo"
            width={32}
            height={32}
            draggable={false}
          />
          <h1 className="text-2xl font-bold text-white">Meroku</h1>
        </div>
      </Link>

      <div className="hidden md:flex flex-row gap-x-4 text-white font-medium">
        {links.map((link) => (
          <Link
            className={clsx(router.pathname === link.href && "text-blue-500")}
            key={link.href}
            href={link.href}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <ConnectButton
        showBalance={{
          smallScreen: false,
          largeScreen: false,
        }}
      />
    </div>
  );
}
