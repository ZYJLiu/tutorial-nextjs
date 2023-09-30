import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, SystemProgram, Transaction } from "@solana/web3.js";
import { Button } from "@nextui-org/button";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "@nextui-org/link";

export default function SendTransaction() {
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    if (!publicKey) return;

    setIsLoading(true);

    try {
      // Define the amount to transfer
      const transferAmount = 0.1; // 0.1 SOL

      // Create a transfer instruction for transferring SOL from wallet_1 to wallet_2
      const transferInstruction = SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: publicKey,
        lamports: transferAmount * LAMPORTS_PER_SOL, // Convert transferAmount to lamports
      });

      // Add the transfer instruction to a new transaction
      const transaction = new Transaction().add(transferInstruction);

      // Send transaction
      const transactionSignature = await sendTransaction(
        transaction,
        connection
      );

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
          }
        );

      notify();
    } catch (error) {
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
