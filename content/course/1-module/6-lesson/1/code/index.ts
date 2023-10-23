import { Connection, clusterApiUrl } from "@solana/web3.js";
import { createAccount, createMint, mintTo } from "@solana/spl-token";
import { getOrCreateKeypair } from "./utils";

// Use existing keypairs or generate new ones if they don't exist
const wallet_1 = getOrCreateKeypair("wallet_1");

// Establish a connection to the Solana devnet cluster
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const mint = await createMint(
  connection,
  wallet_1, // payer
  wallet_1.publicKey, // mint authority
  wallet_1.publicKey, // freeze authority
  2, // decimals
);

const associatedTokenAccount = await createAccount(
  connection,
  wallet_1, // payer
  mint, // mint address
  wallet_1.publicKey, // token account owner
);

const transactionSignature = await mintTo(
  connection,
  wallet_1, // payer
  mint, // mint address
  associatedTokenAccount, // destination
  wallet_1.publicKey, // mint authority
  100, // amount
);

console.log(
  "Transaction Signature:",
  `https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`,
);