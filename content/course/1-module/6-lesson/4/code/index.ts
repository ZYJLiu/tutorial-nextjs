import {
  createAccount,
  createMint,
  createMintToInstruction,
} from "@solana/spl-token";
import {
  Connection,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { getOrCreateKeypair } from "./utils";

// Use existing keypairs or generate new ones if they don't exist
const wallet_1 = getOrCreateKeypair("wallet_1");

// Establish a connection to the Solana devnet cluster
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Create a mint
const mint = await createMint(
  connection,
  wallet_1, // payer
  wallet_1.publicKey, // mint authority
  wallet_1.publicKey, // freeze authority
  2, // decimals
);

// Create associated token account
const associatedTokenAccount = await createAccount(
  connection,
  wallet_1, // payer
  mint, // mint address
  wallet_1.publicKey, // token account owner
);

// Create instruction to mint tokens
const instruction = createMintToInstruction(
  mint, // mint address
  associatedTokenAccount, // destination
  wallet_1.publicKey, // mint authority
  100, // amount
);

// Create a transaction
const transaction = new Transaction().add(instruction);

// Send the transaction
const transactionSignature = await sendAndConfirmTransaction(
  connection,
  transaction,
  [
    wallet_1, // payer
  ],
);

console.log(
  "Transaction Signature:",
  `https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`,
);
