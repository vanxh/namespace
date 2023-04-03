import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { CheckCircleIcon } from "lucide-react";
import { Button } from "ui";

import useOwnedDomains from "@/lib/hooks/useOwnedDomains";
import NavbarApp from "@/components/Navbar/App";
import Spacer from "@/components/Spacer";
import Spinner from "@/components/Spinner";

export default function OwnedInfo() {
  const router = useRouter();
  const { address } = useAccount();
  const { isLoading, error, appNfts, devNfts } = useOwnedDomains();

  const appName = router.query.name as string;

  if (![...appNfts, ...devNfts].includes(appName)) {
  }

  return (
    <div className="h-full flex flex-col items-center justify-center min-h-screen w-[100vw] bg-gray-50">
      <NavbarApp />
      <Spacer />

      <div className="flex flex-col items-center justify-start max-w-[95%] md:max-w-[80%] lg:max-w-[50%] text-left md:text-center gap-y-4 md:gap-y-10 w-full min-h-[90vh] py-4">
        <div className="flex flex-col items-start justify-center w-full gap-y-4">
          <h1 className="font-bold text-4xl md:text-6xl">App Details</h1>
        </div>

        {!address && (
          <div className="flex flex-col justify-center items-center gap-y-2 w-full">
            <p className="text-[#909090] text-xs text-center">
              Connect your wallet to view your domains
            </p>
          </div>
        )}

        {address && [...devNfts, ...appNfts].length === 0 && isLoading && (
          <Spinner />
        )}

        {address && [...devNfts, ...appNfts].length === 0 && !isLoading && (
          <div className="flex flex-col justify-center items-center gap-y-2 w-full">
            <p className="text-[#909090] text-xs text-center">
              You don&apos;t have any domains yet
            </p>
          </div>
        )}

        {address &&
          ![...appNfts, ...devNfts].includes(appName) &&
          !isLoading &&
          [...devNfts, ...appNfts].length !== 0 && (
            <div className="flex flex-col justify-center items-center gap-y-2 w-full">
              <p className="text-[#909090] text-xs text-center">
                {appName} not found
              </p>
            </div>
          )}

        {/* && !isLoading */}
        {address && (
          <div className="flex flex-col w-full gap-y-3 text-left">
            <div className="flex flex-row items-center justify-between w-full px-4 py-3 rounded-lg bg-white">
              <div className="flex flex-row gap-x-2 items-center justify-center">
                <CheckCircleIcon className="text-green-500" />
                <p>{appName}</p>
              </div>

              {/* Registered On */}
              <div className=""></div>

              {/* Expires On */}
              <div className=""></div>
            </div>

            <div className="flex flex-col items-center justify-start w-full rounded-lg bg-white shadow-[0_20_20_60_#0000000D] overflow-hidden">
              <div className="bg-[#101828] h-60 w-full" />

              <div className="flex flex-row items-center w-full px-8 gap-x-4">
                <Image
                  src="https://picsum.photos/160"
                  alt="App Image"
                  width={160}
                  height={160}
                  className="rounded-lg border-4 border-white -mt-16"
                />

                <div className="flex flex-col gap-y-1">
                  <h3 className="text-[#101828] font-semibold text-3xl">
                    App Name
                  </h3>
                  <h4 className="text-[#475467] font-normal text-[16px]">
                    App Category
                  </h4>
                </div>

                <Spacer direction="horizontal" />

                <Button disabled className="bg-green-500 hover:bg-green-600">
                  Edit Details
                </Button>
              </div>

              <div className="p-8 w-full">
                <h3 className="text-[#101828] text-lg font-semibold">
                  Description
                </h3>
                <p className="text-[#475467] text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <Spacer />
    </div>
  );
}
