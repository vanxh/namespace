import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig, useSigner } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { Toaster } from "sonner";

import ThirdwebProvider from "./ThirdWebProvider";

const { chains, provider } = configureChains(
  [polygonMumbai], // Add more chains from "wagmi/chains" here
  [publicProvider()] // Add more providers from "wagmi/providers/" here
);

const { connectors } = getDefaultWallets({
  appName: "Meroku",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function AppWithProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ThirdwebProvider wagmiClient={wagmiClient}>
          <Toaster />
          {children}
        </ThirdwebProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
