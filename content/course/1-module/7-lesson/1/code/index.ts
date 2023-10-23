import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  transfer,
} from "@solana/spl-token";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { getOrCreateKeypair } from "./utils";

// Use existing keypairs or generate new ones if they don't exist
const wallet_1 = getOrCreateKeypair("wallet_1");
const wallet_2 = getOrCreateKeypair("wallet_2");

// Establish a connection to the Solana devnet cluster
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const mint = await createMint(
  connection,
  wallet_1, // payer
  wallet_1.publicKey, // mint authority
  wallet_1.publicKey, // freeze authority
  2, // decimals
);

// Create associated token account for wallet_1
const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  wallet_1, // payer
  mint, // mint address
  wallet_1.publicKey, // token account owner
);

// Create associated token account for wallet_2
const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  wallet_1, // payer
  mint,
  wallet_2.publicKey, // token account owner
);

await mintTo(
  connection,
  wallet_1, // payer
  mint, // mint address
  sourceTokenAccount.address, // destination
  wallet_1.publicKey, // mint authority
  100, // amount
);

const transactionSignature = await transfer(
  connection,
  wallet_1, // payer
  sourceTokenAccount.address, // transfer from
  destinationTokenAccount.address, // transfer to
  wallet_1.publicKey, // source token account owner
  100,
);

console.log(
  "Transaction Signature:",
  `https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`,
);