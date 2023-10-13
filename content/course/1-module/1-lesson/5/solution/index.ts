import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from "@solana/web3.js";

// Establish a connection to the Solana devnet cluster
const connection = new Connection(clusterApiUrl("devnet"));

// Generate a new keypair
const wallet_1 = new Keypair();

// Request the airdrop
const transactionSignature = await connection.requestAirdrop(
  wallet_1.publicKey,
  5 * LAMPORTS_PER_SOL,
);

// Get the most recent blockhash
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
