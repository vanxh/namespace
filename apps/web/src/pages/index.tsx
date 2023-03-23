import { useState } from "react";
import { useRouter } from "next/router";
import { Input, Button } from "ui";

import { NavbarHomepage } from "@/components/Navbar";
import Spacer from "@/components/Spacer";

export default function Page() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <>
      <NavbarHomepage />
      <Spacer />

      <div className="flex flex-col items-center justify-center max-w-[95%] md:max-w-[80%] lg:max-w-[50%] text-left md:text-center gap-y-4 md:gap-y-12">
        <h1 className="font-bold text-4xl md:text-7xl">
          Claim your own <span className="text-blue-500">.dev</span> and{" "}
          <span className="text-blue-500">.app</span> NFTs
        </h1>

        <h3 className="text-[#475467] text-lg md:text-lg">
          Secure your digital brand by reserving your application name on the
          blockchain with our user-friendly platform
        </h3>

        <div className="flex flex-col md:flex-row gap-x-3 gap-y-3 w-full md:w-[70%] md:py-4 md:px-4 rounded-lg md:border-[0.5px] md:border-solid md:border-[#D1D1D1] md:bg-gradient-to-r md:to-[#E3F3FE] md:from-[#FBFDFE]">
          <Input
            placeholder="Quick Search"
            className=""
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            onClick={async () => {
              await router.push("/app", {
                query: {
                  q: search,
                },
              });
            }}
          >
            Search
          </Button>
        </div>
      </div>

      <Spacer />
    </>
  );
}
