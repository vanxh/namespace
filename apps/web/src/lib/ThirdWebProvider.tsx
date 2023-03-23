import { ChainId, ThirdwebSDKProvider } from "@thirdweb-dev/react";
import { useSigner } from "wagmi";

export default function ThirdwebProvider({
  wagmiClient,
  children,
}: {
  wagmiClient: any;
  children: React.ReactNode;
}) {
  const { data: signer } = useSigner();

  return (
    <ThirdwebSDKProvider
      activeChain={ChainId.Mumbai}
      signer={signer as any}
      queryClient={wagmiClient.queryClient as any}
    >
      {children}
    </ThirdwebSDKProvider>
  );
}
