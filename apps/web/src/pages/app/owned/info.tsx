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
import Divider from "@/components/Divider";

// TODO: refactor to reusable components
export default function OwnedInfo() {
  const router = useRouter();
  const { address } = useAccount();
  const { isLoading, error, appNfts, devNfts } = useOwnedDomains();

  const appName = router.query.name as string;

  if (![...appNfts, ...devNfts].includes(appName) && !isLoading) {
    return <div>Not found.</div>;
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

              <div className="flex flex-row items-center w-full px-4 md:px-8 gap-x-4">
                <Image
                  src="https://picsum.photos/160"
                  alt="App Image"
                  width={160}
                  height={160}
                  className="rounded-lg border-4 border-white -mt-16"
                />

                <div className="flex flex-col gap-y-1">
                  <h3 className="text-[#101828] font-semibold text-2xl md:text-3xl">
                    App Name
                  </h3>
                  <h4 className="text-[#475467] font-normal text-[14px] md:text-[16px]">
                    App Category
                  </h4>
                </div>

                <Spacer direction="horizontal" />

                <Button
                  disabled
                  className="bg-green-500 hover:bg-green-600 hidden md:block"
                >
                  Edit Details
                </Button>
              </div>

              <Button
                disabled
                className="bg-green-500 hover:bg-green-600 self-start mt-4 mx-4 min-w-[50%] md:hidden"
              >
                Edit Details
              </Button>

              <div className="p-4 md:p-8 w-full gap-y-6 flex flex-col">
                <div className="flex flex-col gap-y-2">
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

                <Divider />

                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-y-4 w-full justify-between items-center">
                  <div className="flex flex-col gap-y-1">
                    <p className="text-[#667085] font-medium text-[16px]">
                      URL
                    </p>
                    <p className="text-[#2678FD] font-semibold text-[16px]">
                      appname.com
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-1">
                    <p className="text-[#667085] font-medium text-[16px]">
                      Repo URL
                    </p>
                    <p className="text-[#2678FD] font-semibold text-[16px]">
                      appname.com
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-1">
                    <p className="text-[#667085] font-medium text-[16px]">
                      Dapp ID
                    </p>
                    <p className="text-[#2678FD] font-semibold text-[16px]">
                      appname.com
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-1">
                    <p className="text-[#667085] font-medium text-[16px]">
                      Language
                    </p>
                    <p className="text-[#344054] font-semibold text-[16px]">
                      English
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-1">
                    <p className="text-[#667085] font-medium text-[16px]">
                      Chain ID
                    </p>
                    <p className="text-[#344054] font-semibold text-[16px]">
                      80001
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-1">
                    <p className="text-[#667085] font-medium text-[16px]">
                      Minimum Age
                    </p>
                    <p className="text-[#344054] font-semibold text-[16px]">
                      18
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-1">
                    <p className="text-[#667085] font-medium text-[16px]">
                      Version
                    </p>
                    <p className="text-[#344054] font-semibold text-[16px]">
                      2.34
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-1">
                    <p className="text-[#667085] font-medium text-[16px]">
                      App Listed?
                    </p>
                    <p className="text-[#344054] font-semibold text-[16px]">
                      Yes
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-1">
                    <p className="text-[#667085] font-medium text-[16px]">
                      For mature audience?
                    </p>
                    <p className="text-[#344054] font-semibold text-[16px]">
                      No
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-1">
                    <p className="text-[#667085] font-medium text-[16px]">
                      Moderated?
                    </p>
                    <p className="text-[#344054] font-semibold text-[16px]">
                      Yes
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-1">
                    <p className="text-[#667085] font-medium text-[16px]">
                      Tags
                    </p>
                    <div className="flex flex-row flex-wrap gap-x-1 gap-y-1">
                      <span className="text-[#363F72] rounded-lg bg-[#F8F9FC] py-[2px] px-2 font-medium text-[12px]">
                        foo
                      </span>
                      <span className="text-[#363F72] rounded-lg bg-[#F8F9FC] py-[2px] px-2 font-medium text-[12px]">
                        bar
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-y-2 w-full">
                  <h3 className="text-[#101828] text-lg font-semibold">
                    Build Inform
                  </h3>
                  <Divider />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-y-4 w-full justify-between items-center">
                  <div className="flex flex-col gap-y-1">
                    <p className="text-[#667085] font-medium text-[16px]">
                      App Type
                    </p>
                    <p className="text-[#2678FD] font-semibold text-[16px]">
                      Android
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-1">
                    <p className="text-[#667085] font-medium text-[16px]">
                      Architecture
                    </p>
                    <p className="text-[#344054] font-semibold text-[16px]">
                      Lorem Ipsum
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-1">
                    <p className="text-[#667085] font-medium text-[16px]">
                      Resolution
                    </p>
                    <p className="text-[#344054] font-semibold text-[16px]">
                      240 x 540
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-1">
                    <p className="text-[#667085] font-medium text-[16px]">
                      Min Version
                    </p>
                    <p className="text-[#344054] font-semibold text-[16px]">
                      0.6.9
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-1">
                    <p className="text-[#667085] font-medium text-[16px]">
                      Max Version
                    </p>
                    <p className="text-[#344054] font-semibold text-[16px]">
                      Yes
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-1">
                    <p className="text-[#667085] font-medium text-[16px]">
                      App File
                    </p>
                    <p className="text-[#2678FD] font-semibold text-[16px]">
                      application.apk
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-1">
                    <p className="text-[#667085] font-medium text-[16px]">
                      Optimized for mobile?
                    </p>
                    <p className="text-[#344054] font-semibold text-[16px]">
                      Yes
                    </p>
                  </div>

                  <div className="flex flex-col gap-y-1">
                    <p className="text-[#667085] font-medium text-[16px]">
                      Meroku Installable?
                    </p>
                    <p className="text-[#344054] font-semibold text-[16px]">
                      Yes
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-y-2 w-full">
                  <h3 className="text-[#101828] text-lg font-semibold">
                    App Screenshots
                  </h3>
                  <Divider />
                </div>

                <div className="flex flex-row flex-wrap gap-x-2 gap-y-2">
                  <Image
                    src="https://picsum.photos/157/323"
                    alt="App Screenshot"
                    width={157}
                    height={323}
                    className="rounded-lg border-4 border-white"
                  />
                  <Image
                    src="https://picsum.photos/157/323"
                    alt="App Screenshot"
                    width={157}
                    height={323}
                    className="rounded-lg border-4 border-white"
                  />
                  <Image
                    src="https://picsum.photos/157/323"
                    alt="App Screenshot"
                    width={157}
                    height={323}
                    className="rounded-lg border-4 border-white"
                  />
                  <Image
                    src="https://picsum.photos/157/323"
                    alt="App Screenshot"
                    width={157}
                    height={323}
                    className="rounded-lg border-4 border-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Spacer />
    </div>
  );
}
