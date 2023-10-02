import {
  Connection,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
  Keypair,
} from "@solana/web3.js";

(async () => {
  // Establish a connection to the Solana devnet cluster
  const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

  // Generate Keypair to act as wallet
  const wallet_1 = new Keypair();

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

  const { blockhash, lastValidBlockHeight } =
    await connection.getLatestBlockhash();

  // Confirm the airdrop transaction
  await connection.confirmTransaction(
    {
      blockhash,
      lastValidBlockHeight,
      signature: transactionSignature,
    },
    "confirmed"
  );

  // Retrieve and log the new balance of each wallet after the transfer
  const postBalance = await connection.getBalance(wallet_1.publicKey);
  console.log("wallet_1 postbalance:", postBalance / LAMPORTS_PER_SOL);
})();
