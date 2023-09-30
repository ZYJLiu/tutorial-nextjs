import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getOrCreateKeypair } from "./utils";

(async () => {
  // Establish a connection to the Solana devnet cluster
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // Use existing keypairs or generate new ones if they don't exist
  const wallet_1 = await getOrCreateKeypair("wallet_1");

  // Retrieve and log the new balance of each wallet after the transfer
  const preBalance = await connection.getBalance(wallet_1.publicKey);
  console.log("wallet_1 prebalance:", preBalance / LAMPORTS_PER_SOL);

  // Request the airdrop
  const transactionSignature = await connection.requestAirdrop(
    wallet_1.publicKey,
    2 * LAMPORTS_PER_SOL
  );

  console.log(
    "Transaction Signature:",
    `https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
  );
})();
