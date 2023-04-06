import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { CheckCircleIcon } from "lucide-react";

import useOwnedDomains from "@/lib/hooks/useOwnedDomains";
import NavbarApp from "@/components/Navbar/App";
import Spacer from "@/components/Spacer";
import Spinner from "@/components/Spinner";
import AppEdit from "@/components/AppEdit";

// TODO: refactor to reusable components
export default function EditInfo() {
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

            {/* .app nfts */}
            <AppEdit />

            {/* .dev nfts */}
            {/* <div className="flex flex-col items-center justify-start w-full rounded-lg bg-white shadow-[0_20_20_60_#0000000D] overflow-hidden">
                            <div className="p-4 md:p-8 w-full gap-y-6 flex flex-col">
                                <div className="flex flex-col gap-y-2">
                                    <h3 className="text-[#101828] text-2xl font-semibold">
                                        Dev Details
                                    </h3>
                                    <p className="text-[#475467] text-sm">
                                        Edit your publisher details.
                                    </p>
                                </div>
                            </div>
                        </div> */}
          </div>
        )}
      </div>

      <Spacer />
    </div>
  );
}
