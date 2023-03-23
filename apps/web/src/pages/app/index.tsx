import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSDK } from "@thirdweb-dev/react";
import { useAccount } from "wagmi";
import { CheckCircleIcon } from "lucide-react";
import { Input, Button } from "ui";

import { NavbarApp } from "@/components/Navbar";
import Spacer from "@/components/Spacer";
import GlobalSearchIcon from "@/public/global-search.svg";
import { toast } from "sonner";

const APP_CONTRACT_ADDRESS = "0x7d6612a6acf6f9b2e799231eca1e00c26cb52e01";
const DEV_CONTRACT_ADDRESS = "0x65dfeEA95A6E2faE38bfD748B6A042BBDdAcC3D4";

export default function Page() {
  const router = useRouter();
  const [search, setSearch] = useState(router.query.q as string);
  const [available, setAvailable] = useState<{
    [key: string]: boolean;
  }>();

  const { address } = useAccount();
  const sdk = useSDK();

  return (
    <div className="h-full flex flex-col items-center justify-center min-h-screen w-[100vw] bg-gray-50">
      <NavbarApp />
      <Spacer />

      <div className="flex flex-col items-center justify-start max-w-[95%] md:max-w-[80%] lg:max-w-[50%] text-left md:text-center gap-y-4 md:gap-y-10 w-full min-h-[90vh]">
        <div className="flex flex-col md:flex-row gap-x-3 gap-y-3 w-full md:w-[70%]rounded-lg">
          <Input
            placeholder={"Search for new domain"}
            className=""
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            onClick={async () => {
              setAvailable(undefined);
              if (!search || !sdk) return;

              const appContract = await sdk.getContract(APP_CONTRACT_ADDRESS);
              const devContract = await sdk.getContract(DEV_CONTRACT_ADDRESS);

              const _available = {} as {
                [key: string]: boolean;
              };

              try {
                const data1 = await appContract.call(
                  "tokenIdForAppName",
                  search.replaceAll(".app", "") + ".app"
                );
                _available[`${search}.app`] = false;
              } catch (e) {
                console.error(e);
                _available[`${search}.app`] = true;
              }

              try {
                const data2 = await devContract.call(
                  "tokenIdForDevName",
                  search.replaceAll(".dev", "") + ".dev"
                );
                _available[`${search}.dev`] = false;
              } catch (e) {
                console.error(e);
                _available[`${search}.dev`] = true;
              }

              setAvailable(_available);
            }}
          >
            Search
          </Button>
        </div>

        {!available && (
          <div className="flex flex-col justify-center items-center gap-y-2 w-full">
            <Image
              src={GlobalSearchIcon}
              alt="Global Search"
              width={120}
              height={120}
            />
            <p className="text-[#909090] text-xs text-center">
              Input using the search bar. You can search for names using
              keywords, phrases, or specific terms.
            </p>
          </div>
        )}

        {available && (
          <div className="flex flex-col w-full gap-y-3 text-left">
            <h3 className="font-medium">Search result for “{search}”</h3>

            {Object.keys(available ?? {}).map((name) => (
              <div
                key={name}
                className="flex flex-row items-center justify-between w-full px-4 py-3 rounded-lg bg-white"
              >
                <div className="flex flex-row gap-x-2 items-center justify-center">
                  <CheckCircleIcon className="text-green-500" />
                  <p>{name}</p>
                </div>

                <p className="text-opacity-30">
                  {available[name] ? "available" : "unavailable"}
                </p>

                <Button
                  className="bg-green-500 hover:bg-green-600"
                  disabled={!available[name]}
                  onClick={() => {
                    toast.promise(
                      async () => {
                        if (!sdk) return;

                        const nftType = name.split(".").pop();

                        if (nftType === "app") {
                          const appContract = await sdk.getContract(
                            APP_CONTRACT_ADDRESS
                          );

                          const data = await appContract.call(
                            "safeMintAppNFT",
                            address,
                            name,
                            name
                          );
                          console.log(data);
                        } else if (nftType === "dev") {
                          const devContract = await sdk.getContract(
                            DEV_CONTRACT_ADDRESS
                          );

                          const data = await devContract.call(
                            "safeMintDevNFT",
                            address,
                            name,
                            name
                          );
                          console.log(data);
                        }
                      },
                      {
                        success: `Successfully claimed domain ${name}`,
                        error: `Failed to claim domain ${name}`,
                        loading: `Claiming domain ${name}...`,
                      }
                    );
                  }}
                >
                  Claim
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Spacer />
    </div>
  );
}
