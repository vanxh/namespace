import { useAccount } from "wagmi";
import { CheckCircleIcon } from "lucide-react";
import { Button } from "ui";

import useOwnedDomains from "@/lib/hooks/useOwnedDomains";
import NavbarApp from "@/components/Navbar/App";
import Spacer from "@/components/Spacer";
import Spinner from "@/components/Spinner";

export default function Owned() {
  const { address } = useAccount();
  const { isLoading, error, appNfts, devNfts } = useOwnedDomains();

  return (
    <div className="h-full flex flex-col items-center justify-center min-h-screen w-[100vw] bg-gray-50">
      <NavbarApp />
      <Spacer />

      <div className="flex flex-col items-center justify-start max-w-[95%] md:max-w-[80%] lg:max-w-[50%] text-left md:text-center gap-y-4 md:gap-y-10 w-full min-h-[90vh]">
        <div className="flex flex-col items-start justify-center w-full gap-y-4">
          <h1 className="font-bold text-4xl md:text-6xl">Registered Domains</h1>

          <h3 className="text-[#475467] text-lg md:text-lg">
            View your minted and claimed{" "}
            <span className="text-blue-500">.dev</span> and{" "}
            <span className="text-blue-500">.app</span> domains
          </h3>
        </div>

        {!address && (
          <div className="flex flex-col justify-center items-center gap-y-2 w-full">
            <p className="text-[#909090] text-xs text-center">
              Connect your wallet to view your domains
            </p>
          </div>
        )}

        {[...devNfts, ...appNfts].length === 0 && isLoading && <Spinner />}

        <div className="flex flex-col w-full gap-y-3 text-left">
          {[...appNfts, ...devNfts].map((name) => (
            <div
              key={name}
              className="flex flex-row items-center justify-between w-full px-4 py-3 rounded-lg bg-white"
            >
              <div className="flex flex-row gap-x-2 items-center justify-center">
                <CheckCircleIcon className="text-green-500" />
                <p>{name}</p>
              </div>

              <Button
                className="bg-green-500 hover:bg-green-600"
                disabled
                onClick={() => {
                  // TODO: Implement
                }}
              >
                View Info
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Spacer />
    </div>
  );
}
