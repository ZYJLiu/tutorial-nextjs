import { TransactionType, buildTransaction } from "@/utils/BuildTransaction";
import toast, { Toaster } from "react-hot-toast";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { Button } from "@nextui-org/button";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Link } from "@nextui-org/link";
import { useState } from "react";

interface SendTransactionProps {
  type: TransactionType;
}

// Send transaction button used in MDX files
// General idea is to send a devnet transaction to demo code displayed in the right panel
// And display toast notification with link to Solana Explorer
export default function SendTransaction({ type }: SendTransactionProps) {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    if (!publicKey) return;

    setIsLoading(true);

    try {
      let transactionSignature: string;
      if (type === TransactionType.Airdrop) {
        // Request the airdrop
        transactionSignature = await connection.requestAirdrop(
          publicKey,
          5 * LAMPORTS_PER_SOL,
        );

        const { blockhash, lastValidBlockHeight } =
          await connection.getLatestBlockhash();

        // Confirm the airdrop transaction
        await connection.confirmTransaction(
          {
            blockhash,
            lastValidBlockHeight,
            signature: transactionSignature,
          },
          "confirmed",
        );
      } else {
        const transaction = await buildTransaction(type, publicKey);
        // Send transaction
        transactionSignature = await sendTransaction(transaction, connection);
      }

      const notify = () =>
        toast.success(
          <Link
            isExternal
            color="foreground"
            href={`https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`}
          >
            View on Solana Explorer
          </Link>,
          {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          },
        );

      notify();
    } catch (error) {
      const notify = () =>
        toast.error(`Transaction Fail: ${error}`, {
          style: {
            background: "#333",
            color: "#fff",
          },
        });

      notify();
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Button onClick={onClick} isLoading={isLoading} isDisabled={!publicKey}>
        Send Transaction
      </Button>
    </>
  );
}
