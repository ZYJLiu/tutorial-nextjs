"use client";

import "@solana/wallet-adapter-react-ui/styles.css";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import React, { useMemo } from "react";

import { LineHighlightProvider } from "@/context/LineHighlight";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/system";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

export function Provider({ children }: { children: React.ReactNode }) {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [new SolflareWalletAdapter()], [network]);

  return (
    <NextUIProvider>
      <NextThemesProvider defaultTheme="dark">
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <LineHighlightProvider>{children}</LineHighlightProvider>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
