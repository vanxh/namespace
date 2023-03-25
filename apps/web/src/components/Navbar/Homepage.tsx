import Image from "next/image";
import Link from "next/link";
import { Button } from "ui";

import Logo from "@/public/logo.png";

export default function NavbarHomepage() {
  return (
    <div className="top-0 flex w-full flex-row justify-between items-center gap-x-2 px-2 md:px-8 py-4">
      <Link href="/">
        <div className="flex flex-row items-center justify-between gap-x-2 md:gap-x-3">
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
