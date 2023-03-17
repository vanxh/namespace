import Image from "next/image";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "ui";

import Logo from "@/public/logo.png";

export function NavbarHomepage() {
  return (
    <div className="top-0 flex w-full flex-row justify-between items-center px-4 md:px-8 py-4">
      <Link href="/">
        <div className="flex flex-row items-center justify-between gap-x-3">
          <Image
            src={Logo}
            alt="Logo"
            width={32}
            height={32}
            draggable={false}
          />
          <h1 className="text-2xl font-bold">Meroku</h1>
        </div>
      </Link>

      <Link href="/app">
        <Button>Get Started</Button>
      </Link>
    </div>
  );
}

export function NavbarApp() {
  return (
    <div className="top-0 bg-[#101828] flex w-full flex-row justify-between items-center px-4 md:px-8 py-4">
      <Link href="/">
        <div className="flex flex-row items-center justify-between gap-x-3">
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

      <ConnectButton
        showBalance={{
          smallScreen: false,
          largeScreen: false,
        }}
      />
    </div>
  );
}
